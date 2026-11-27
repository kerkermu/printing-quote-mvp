"""Loopback origin for a tunnel that exposes only the LINE ID webhook."""

from http.client import HTTPConnection, HTTPException
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


class WebhookProxy(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/webhook/line-id":
            self.send_error(404)
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            size = 0
        if not 0 < size <= 2 * 1024 * 1024:
            self.send_error(413 if size > 0 else 400)
            return
        signature = self.headers.get("X-Line-Signature")
        if not signature:
            self.send_error(403)
            return
        self.connection.settimeout(10)
        connection = HTTPConnection("127.0.0.1", 8765, timeout=15)
        try:
            body = self.rfile.read(size)
            connection.request("POST", "/webhook/line-id", body=body, headers={
                "Content-Type": "application/json", "X-Line-Signature": signature,
            })
            with connection.getresponse() as response:
                status = response.status
        except (OSError, HTTPException):
            status = 502
        finally:
            connection.close()
        self.send_response(status)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8766), WebhookProxy).serve_forever()
