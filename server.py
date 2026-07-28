from __future__ import annotations

import json
import mimetypes
from datetime import date
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote

from tools.fill_official_application import INK_TEMPLATE, PAPER_TEMPLATE, fill_application


ROOT = Path(__file__).resolve().parent
GENERATED_DIR = ROOT / "generated_forms"


def clean_filename(value: str) -> str:
    keep = []
    for char in value:
        if char.isalnum() or char in ("-", "_", " ", "(", ")", "（", "）"):
            keep.append(char)
        else:
            keep.append("_")
    return "".join(keep).strip() or "application"


def case_payload_to_template_data(payload: dict) -> dict:
    customer = payload.get("customer", {})
    sample = payload.get("sample", {})
    estimate = payload.get("estimate", {})
    items = estimate.get("items", [])

    return {
        "application_date": date.today().isoformat(),
        "total_with_tax": estimate.get("total", ""),
        "service_type": payload.get("serviceType", ""),
        "customer": {
            "company_name": customer.get("companyName", ""),
            "tax_id": customer.get("taxId", ""),
            "invoice_address": customer.get("invoiceAddress") or customer.get("address", ""),
            "address": customer.get("address", ""),
            "contact_name": customer.get("contactName", ""),
            "job_title": customer.get("jobTitle", ""),
            "email": customer.get("email", ""),
            "phone": customer.get("phone", ""),
            "fax": customer.get("fax", ""),
            "mobile": customer.get("mobile", ""),
        },
        "sample": {
            "name": sample.get("sampleName", ""),
            "quantity": sample.get("sampleQty", ""),
            "description": sample.get("material") or sample.get("notes", ""),
            "report_language": sample.get("reportLang", "中文"),
            "extra_chinese_reports": sample.get("extraChineseReports", 0),
            "english_reports": sample.get("englishReports", 0),
            "sample_return": sample.get("sampleReturn", ""),
            "report_delivery": sample.get("reportDelivery", ""),
            "case_type": sample.get("caseType", "一般件"),
            "is_first_application": sample.get("isFirstApplication", "no"),
            "attachments": sample.get("attachments", []),
            "attachment_other": sample.get("attachmentOther", ""),
        },
        "selected_item_ids": [item.get("id") for item in items if item.get("id")],
    }


class QuoteMvpHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self.send_json({"ok": True})
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path != "/api/generate-application":
            self.send_error(404, "Not found")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(length)
            payload = json.loads(raw_body.decode("utf-8"))
            output = self.generate_application(payload)
            self.send_docx(output)
        except Exception as exc:  # noqa: BLE001 - surface controlled error to MVP UI
            self.send_json({"ok": False, "error": str(exc)}, status=500)

    def generate_application(self, payload: dict) -> Path:
        data = case_payload_to_template_data(payload)
        company = data["customer"]["company_name"] or "客戶"
        case_no = payload.get("caseNo", "CASE")
        filename = clean_filename(f"{case_no}_{company}_申請書.docx")
        output = GENERATED_DIR / filename
        return fill_application(data, PAPER_TEMPLATE, INK_TEMPLATE, output)

    def send_json(self, data: dict, status: int = 200) -> None:
        encoded = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def send_docx(self, path: Path) -> None:
        content = path.read_bytes()
        filename = path.name
        encoded_filename = quote(filename)
        self.send_response(200)
        self.send_header(
            "Content-Type",
            mimetypes.types_map.get(".docx")
            or "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )
        self.send_header("Content-Length", str(len(content)))
        self.send_header(
            "Content-Disposition",
            f"attachment; filename*=UTF-8''{encoded_filename}",
        )
        self.end_headers()
        self.wfile.write(content)


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 8765), QuoteMvpHandler)
    print("PTRI quote MVP server: http://127.0.0.1:8765/")
    server.serve_forever()


if __name__ == "__main__":
    main()
