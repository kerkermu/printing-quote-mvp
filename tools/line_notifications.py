from __future__ import annotations

import json
import logging
import os
import re
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from threading import Lock
from time import monotonic, sleep
from unicodedata import category
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


TAIWAN_TIMEZONE = timezone(timedelta(hours=8))


class LineNotifications:
    def __init__(self) -> None:
        self.token = os.environ.get("PTRI_LINE_CHANNEL_ACCESS_TOKEN", "").strip()
        self.recipients = list(dict.fromkeys(
            value.strip() for value in os.environ.get("PTRI_LINE_USER_IDS", "").split(",")
            if value.strip()
        ))
        if bool(self.token) != bool(self.recipients) or len(self.recipients) > 10 or any(
            not re.fullmatch(r"U[0-9a-fA-F]{32}", value) for value in self.recipients
        ):
            raise ValueError("Invalid LINE token or recipient configuration.")
        self._timestamps = deque()
        self._lock = Lock()
        self._worker = ThreadPoolExecutor(max_workers=1, thread_name_prefix="line-notify")

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
            self._worker.submit(self._send, submission_id, message)

    def _send(self, submission_id: str, message: str) -> None:
        request = Request(
            "https://api.line.me/v2/bot/message/multicast",
            data=json.dumps({
                "to": self.recipients,
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
