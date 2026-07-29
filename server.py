from __future__ import annotations

import json
import mimetypes
import subprocess
from datetime import date
from email import policy
from email.parser import BytesParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote

from tools.fill_official_application import INK_TEMPLATE, PAPER_TEMPLATE, fill_application
from tools.fill_quote import QUOTE_TEMPLATE, fill_quote, quote_data_from_payload


ROOT = Path(__file__).resolve().parent
GENERATED_DIR = ROOT / "generated_forms"
PDF_EXPORT_SCRIPT = GENERATED_DIR / "_export_word_pdf.ps1"


WORD_TO_PDF_SCRIPT = r"""
param(
  [Parameter(Mandatory=$true)][string]$DocxPath,
  [Parameter(Mandatory=$true)][string]$PdfPath
)

$ErrorActionPreference = "Stop"
$word = $null
$doc = $null
try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  $doc = $word.Documents.Open($DocxPath, $false, $true)
  if (Test-Path -LiteralPath $PdfPath) {
    Remove-Item -LiteralPath $PdfPath -Force
  }
  $doc.ExportAsFixedFormat($PdfPath, 17)
} finally {
  if ($doc -ne $null) {
    $doc.Close($false)
  }
  if ($word -ne $null) {
    $word.Quit()
  }
}
"""


def clean_filename(value: str) -> str:
    keep = []
    for char in value:
        if char.isalnum() or char in ("-", "_", " ", "(", ")", "（", "）", "."):
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
            "description": sample.get("material", ""),
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
        if self.path not in (
            "/api/generate-application",
            "/api/preview-application",
            "/api/generate-quote",
            "/api/preview-quote",
            "/api/submit-documents",
        ):
            self.send_error(404, "Not found")
            return

        try:
            if self.path == "/api/submit-documents":
                self.handle_submission_upload()
                return

            length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(length)
            payload = json.loads(raw_body.decode("utf-8-sig"))
            output = self.generate_quote(payload) if "quote" in self.path else self.generate_application(payload)
            if self.path in ("/api/preview-application", "/api/preview-quote"):
                self.send_pdf(self.convert_docx_to_pdf(output))
            else:
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

    def generate_quote(self, payload: dict) -> Path:
        data = quote_data_from_payload(payload)
        company = data["customer"].get("companyName", "") or "客戶"
        case_no = payload.get("caseNo", "CASE")
        filename = clean_filename(f"{case_no}_{company}_報價單.docx")
        output = GENERATED_DIR / filename
        return fill_quote(data, QUOTE_TEMPLATE, output)

    def convert_docx_to_pdf(self, docx_path: Path) -> Path:
        GENERATED_DIR.mkdir(parents=True, exist_ok=True)
        PDF_EXPORT_SCRIPT.write_text(WORD_TO_PDF_SCRIPT, encoding="utf-8")
        pdf_path = docx_path.with_suffix(".pdf")

        completed = subprocess.run(
            [
                "powershell.exe",
                "-NoProfile",
                "-ExecutionPolicy",
                "Bypass",
                "-File",
                str(PDF_EXPORT_SCRIPT),
                str(docx_path),
                str(pdf_path),
            ],
            capture_output=True,
            text=True,
            timeout=90,
            check=False,
        )
        if completed.returncode != 0 or not pdf_path.exists():
            details = (completed.stderr or completed.stdout or "").strip()
            raise RuntimeError(
                "Unable to create PDF preview. Please make sure Microsoft Word is installed. "
                + details
            )
        return pdf_path

    def handle_submission_upload(self) -> None:
        content_type = self.headers.get("Content-Type", "")
        if "multipart/form-data" not in content_type:
            raise RuntimeError("Submission upload must use multipart/form-data.")

        length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(length)
        message = BytesParser(policy=policy.default).parsebytes(
            f"Content-Type: {content_type}\r\nMIME-Version: 1.0\r\n\r\n".encode("utf-8")
            + raw_body
        )

        case_no = "CASE"
        note = ""
        saved_files = []
        upload_root = GENERATED_DIR / "submissions"
        upload_root.mkdir(parents=True, exist_ok=True)

        for part in message.iter_parts():
            disposition = part.get("Content-Disposition", "")
            field_name = part.get_param("name", header="content-disposition")
            filename = part.get_filename()
            payload = part.get_payload(decode=True) or b""
            if field_name == "caseNo":
                case_no = clean_filename(payload.decode("utf-8", errors="ignore").strip() or "CASE")
            elif field_name == "note":
                note = payload.decode("utf-8", errors="ignore").strip()
            elif field_name == "signedFiles" and filename:
                safe_name = clean_filename(filename)
                case_dir = upload_root / case_no
                case_dir.mkdir(parents=True, exist_ok=True)
                destination = case_dir / safe_name
                counter = 2
                while destination.exists():
                    destination = case_dir / f"{destination.stem}_{counter}{destination.suffix}"
                    counter += 1
                destination.write_bytes(payload)
                saved_files.append(destination.name)

        self.send_json({"ok": True, "caseNo": case_no, "files": saved_files, "note": note})

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

    def send_pdf(self, path: Path) -> None:
        content = path.read_bytes()
        filename = path.name
        encoded_filename = quote(filename)
        self.send_response(200)
        self.send_header("Content-Type", "application/pdf")
        self.send_header("Content-Length", str(len(content)))
        self.send_header(
            "Content-Disposition",
            f"inline; filename*=UTF-8''{encoded_filename}",
        )
        self.end_headers()
        self.wfile.write(content)


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 8765), QuoteMvpHandler)
    print("PTRI quote MVP server: http://127.0.0.1:8765/")
    server.serve_forever()


if __name__ == "__main__":
    main()
