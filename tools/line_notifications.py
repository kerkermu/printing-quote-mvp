from __future__ import annotations

import json
import logging
import os
import re
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from pathlib import Path
from threading import Lock
from time import monotonic, sleep
from unicodedata import category
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


TAIWAN_TIMEZONE = timezone(timedelta(hours=8))


def recipient_file_path() -> Path:
    configured = os.environ.get("PTRI_LINE_RECIPIENTS_FILE", "").strip()
    base = Path(os.environ.get("LOCALAPPDATA") or Path.home())
    path = Path(configured) if configured else base / "PTRI" / "line-recipients.txt"
    if not path.is_absolute() or path.resolve().is_relative_to(Path(__file__).resolve().parents[1]):
        raise ValueError("收件名單必須位於網站目錄外，且須使用絕對路徑。")
    return path


class LineNotifications:
    def __init__(self) -> None:
        self.token = os.environ.get("PTRI_LINE_CHANNEL_ACCESS_TOKEN", "").strip()
        filename = os.environ.get("PTRI_LINE_RECIPIENTS_FILE", "").strip()
        self.recipient_file = None
        if filename or self.token:
            path = recipient_file_path()
            if filename or path.is_file():
                self.recipient_file = path
        self.recipients = []
        if self.recipient_file is None:
            self.recipients = self._validate(os.environ.get("PTRI_LINE_USER_IDS", "").split(","))
        has_targets = bool(self.recipient_file or self.recipients)
        query_only = self.token and os.environ.get("PTRI_LINE_CHANNEL_SECRET", "").strip() and not has_targets
        if bool(self.token) != has_targets and not query_only:
            raise ValueError("Invalid LINE token or recipient configuration.")
        self._timestamps = deque()
        self._lock = Lock()
        self._worker = ThreadPoolExecutor(max_workers=1, thread_name_prefix="line-notify")

    @staticmethod
    def _validate(values: list[str]) -> list[str]:
        recipients = list(dict.fromkeys(value.strip() for value in values if value.strip()))
        if len(recipients) > 10 or any(
            not re.fullmatch(r"U[0-9a-fA-F]{32}", value) for value in recipients
        ):
            raise ValueError("Invalid LINE recipient list.")
        return recipients

    def queue(
        self,
        submission_id: str,
        *,
        company: str,
        service_type: str,
        case_type: str,
        item_count: int,
    ) -> None:
        if not self.token:
            return
        recipients = self.recipients
        if self.recipient_file is not None:
            try:
                lines = self.recipient_file.read_text(encoding="utf-8-sig").splitlines()
                recipients = self._validate([line.partition("#")[0] for line in lines])
            except (OSError, ValueError):
                logging.warning("LINE recipient file unreadable or invalid for %s", submission_id)
                return
            if not recipients:
                return
        elif not recipients:
            return
        company_name = " ".join(
            "".join(char for char in company if category(char) != "Cf").split()
        )[:80]
        service = "紙張適性檢測" if service_type == "paper" else "印刷品及油墨適性檢測"
        received_at = datetime.now(TAIWAN_TIMEZONE).strftime("%Y/%m/%d %H:%M")
        message = (
            "【印研中心】收到新的線上檢測申請\n"
            f"廠商名稱：{company_name}\n"
            f"檢測類別：{service}\n"
            f"案件類型：{case_type}\n"
            f"勾選項目：{item_count} 項\n"
            f"收件時間：{received_at}（台灣時間）\n"
            f"申請書查找碼：{submission_id[:12]}\n"
            "請在收件主機依查找碼找到對應的 Word 申請書。"
        )
        with self._lock:
            now = monotonic()
            while self._timestamps and self._timestamps[0] <= now - 86400:
                self._timestamps.popleft()
            if len(self._timestamps) >= 30:
                logging.warning("LINE daily notification limit reached for %s", submission_id)
                return
            self._timestamps.append(now)
            self._worker.submit(self._send, submission_id, message, recipients)

    def _send(self, submission_id: str, message: str, recipients: list[str]) -> None:
        request = Request(
            "https://api.line.me/v2/bot/message/multicast",
            data=json.dumps({
                "to": recipients,
                "messages": [{"type": "text", "text": message}],
            }).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json",
                "X-Line-Retry-Key": submission_id,
            },
            method="POST",
        )
        for attempt in range(3):
            if attempt:
                sleep(2 ** attempt)
            try:
                with urlopen(request, timeout=5):
                    return
            except HTTPError as exc:
                with exc:
                    if exc.code == 409 and exc.headers.get("x-line-accepted-request-id"):
                        return
                    if exc.code < 500:
                        logging.warning("LINE rejected %s (HTTP %s)", submission_id, exc.code)
                        return
            except (URLError, OSError):
                continue
        logging.warning("LINE notification failed for %s after retries", submission_id)
