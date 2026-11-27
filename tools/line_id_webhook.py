"""Reply to a signed LINE direct-message event with the sender's own ID."""

import base64
import hmac
import json
import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .recipient_store import USER_ID


def handle_id_query(body: bytes, signature: str, secret: str, token: str) -> int:
    if not secret or not token:
        return 503
    expected = base64.b64encode(hmac.digest(secret.encode(), body, "sha256"))
    if not hmac.compare_digest(expected, signature.encode()):
        return 403
    try:
        payload = json.loads(body)
    except (ValueError, RecursionError):
        return 400
    if not isinstance(payload, dict) or not isinstance(payload.get("events"), list):
        return 400

    status = 200
    for event in payload["events"]:
        if not isinstance(event, dict) or event.get("type") != "message" or event.get("mode") == "standby":
            continue
        source = event.get("source")
        message = event.get("message")
        if not isinstance(source, dict) or source.get("type") != "user":
            continue
        if not isinstance(message, dict) or message.get("type") != "text":
            continue
        text = message.get("text")
        if not isinstance(text, str) or text.strip().casefold() != "查詢我的id":
            continue
        reply_token = event.get("replyToken")
        user_id = source.get("userId")
        if not isinstance(reply_token, str) or not reply_token:
            continue
        reply = user_id if isinstance(user_id, str) and USER_ID.fullmatch(user_id) else (
            "LINE 尚未提供你的使用者 ID，請聯絡承辦。"
        )
        request = Request(
            "https://api.line.me/v2/bot/message/reply",
            data=json.dumps({"replyToken": reply_token, "messages": [{"type": "text", "text": reply}]}).encode(),
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {token}"},
            method="POST",
        )
        try:
            with urlopen(request, timeout=5):
                pass
        except HTTPError as exc:
            with exc:
                logging.warning("LINE ID reply returned HTTP %d", exc.code)
                if exc.code != 400 or not (event.get("deliveryContext") or {}).get("isRedelivery"):
                    status = 502
        except (URLError, OSError):
            logging.warning("LINE ID reply service unavailable")
            status = 502
    return status
