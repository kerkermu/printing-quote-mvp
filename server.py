from __future__ import annotations

import json
import mimetypes
import os
import subprocess
from datetime import date
from email import policy
from email.parser import BytesParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock
from urllib.parse import quote
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from uuid import UUID

from tools.fill_official_application import INK_TEMPLATE, PAPER_TEMPLATE, fill_application
from tools.fill_quote import QUOTE_TEMPLATE, fill_quote, quote_data_from_payload
from tools.fill_memo import MEMO_TEMPLATE, fill_memo, memo_data_from_payload
from tools.line_notifications import LineNotifications


ROOT = Path(__file__).resolve().parent
GENERATED_DIR = ROOT / "generated_forms"
ONLINE_INTAKE_DIR = GENERATED_DIR / "online_intake"
ONLINE_INTAKE_LOCK = Lock()
PDF_EXPORT_SCRIPT = GENERATED_DIR / "_export_word_pdf.ps1"
DETAIL_SYNC_SCRIPT = ROOT / "tools" / "sync_detail.ps1"
DETAIL_WORKBOOK = Path(
    os.environ.get(
        "PTRI_DETAIL_WORKBOOK",
        str(GENERATED_DIR / "115檢測細目_Demo.xlsx"),
    )
)
RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
RECAPTCHA_SECRET_KEY = os.environ.get("RECAPTCHA_SECRET_KEY", "").strip()


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
    line_notifications: LineNotifications | None = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "same-origin")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        super().end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self.send_json({"ok": True})
            return
        super().do_GET()

    def send_head(self):
        target = Path(self.translate_path(self.path)).resolve()
        if target.is_relative_to(ONLINE_INTAKE_DIR.resolve()):
            self.send_error(404, "Not found")
            return None
        return super().send_head()

    def do_POST(self) -> None:
        if self.path not in (
            "/api/submit-application",
            "/api/generate-application",
            "/api/preview-application",
            "/api/generate-quote",
            "/api/generate-memo",
            "/api/preview-quote",
            "/api/submit-documents",
            "/api/verify-recaptcha",
            "/api/sync-detail",
        ):
            self.send_error(404, "Not found")
            return

        try:
            if self.path == "/api/submit-application":
                self.handle_application_submission()
                return
            if self.path == "/api/verify-recaptcha":
                self.handle_recaptcha_verification()
                return
            if self.path == "/api/submit-documents":
                self.handle_submission_upload()
                return

            if self.path == "/api/sync-detail":
                self.handle_detail_sync()
                return

            length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(length)
            payload = json.loads(raw_body.decode("utf-8-sig"))
            if "memo" in self.path:
                output = self.generate_memo(payload)
            elif "quote" in self.path:
                output = self.generate_quote(payload)
            else:
                output = self.generate_application(payload)
            if self.path in ("/api/preview-application", "/api/preview-quote"):
                self.send_pdf(self.convert_docx_to_pdf(output))
            else:
                self.send_docx(output)
        except Exception as exc:  # noqa: BLE001 - surface controlled error to MVP UI
            self.send_json({"ok": False, "error": str(exc)}, status=500)

    def handle_application_submission(self) -> None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 65536:
                raise ValueError("Invalid payload size")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            submission_id = UUID(payload["id"])
            company = payload["customer"]["companyName"].strip()
            case_type = payload["sample"]["caseType"]
            case_no = payload["caseNo"]
            if (
                submission_id.version != 4
                or payload["source"] != "online"
                or payload["serviceType"] not in ("paper", "ink")
                or case_type not in ("一般件", "急件", "特急件")
                or not 0 < len(company) <= 150
                or not isinstance(case_no, str) or not 0 < len(case_no) <= 40
                or not payload["estimate"]["items"]
                or not all(payload["sample"].get(key) for key in ("sampleName", "sampleQty", "material"))
            ):
                raise ValueError("Invalid application")
        except (ValueError, KeyError, TypeError, AttributeError):
            self.send_json({"ok": False, "error": "申請資料缺漏或格式有誤。"}, status=400)
            return

        reference = str(submission_id)
        output = ONLINE_INTAKE_DIR / reference / "申請書.docx"
        with ONLINE_INTAKE_LOCK:
            if not output.exists():
                pending = output.with_name("pending.docx")
                template_data = case_payload_to_template_data(payload)
                fill_application(template_data, PAPER_TEMPLATE, INK_TEMPLATE, pending)
                pending.replace(output)
                if self.line_notifications is not None:
                    self.line_notifications.queue(
                        reference,
                        company=company,
                        service_type=template_data["service_type"],
                        case_type=case_type,
                        item_count=len(template_data["selected_item_ids"]),
                    )
        download_name = clean_filename(f"{case_no}_{company}_申請書.docx")
        self.send_docx(output, filename=download_name)

    def handle_recaptcha_verification(self) -> None:
        if not RECAPTCHA_SECRET_KEY:
            self.send_json(
                {"ok": False, "error": "系統尚未設定註冊安全驗證，請聯絡管理人員。"},
                status=503,
            )
            return

        length = int(self.headers.get("Content-Length", "0"))
        payload = json.loads(self.rfile.read(length).decode("utf-8-sig"))
        token = str(payload.get("token", "")).strip()
        if not token:
            self.send_json({"ok": False, "error": "缺少安全驗證 Token。"}, status=400)
            return

        verification_body = urlencode(
            {
                "secret": RECAPTCHA_SECRET_KEY,
                "response": token,
                "remoteip": self.client_address[0],
            }
        ).encode("utf-8")
        request = Request(
            RECAPTCHA_VERIFY_URL,
            data=verification_body,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            method="POST",
        )
        with urlopen(request, timeout=10) as response:
            result = json.loads(response.read().decode("utf-8"))
        if not result.get("success"):
            self.send_json(
                {"ok": False, "error": "安全驗證失敗，請重新驗證。"},
                status=400,
            )
            return
        self.send_json({"ok": True})

    def handle_detail_sync(self) -> None:
        length = int(self.headers.get("Content-Length", "0"))
        payload = json.loads(self.rfile.read(length).decode("utf-8-sig"))
        if not payload.get("caseNo"):
            self.send_json({"ok": False, "error": "案件缺少案件編號。"}, status=400)
            return

        GENERATED_DIR.mkdir(parents=True, exist_ok=True)
        payload_path = GENERATED_DIR / "_detail_sync_payload.json"
        payload_path.write_text(
            json.dumps(payload, ensure_ascii=False), encoding="utf-8"
        )
        completed = subprocess.run(
            [
                "powershell.exe",
                "-NoProfile",
                "-ExecutionPolicy",
                "Bypass",
                "-File",
                str(DETAIL_SYNC_SCRIPT),
                str(payload_path),
                str(DETAIL_WORKBOOK),
            ],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=120,
            check=False,
        )
        if completed.returncode != 0:
            details = (completed.stderr or completed.stdout or "同步失敗。 ").strip()
            raise RuntimeError(details)
        result = json.loads(completed.stdout.strip().splitlines()[-1])
        self.send_json(result)

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

    def generate_memo(self, payload: dict) -> Path:
        data = memo_data_from_payload(payload)
        company = data.get("company_name") or "客戶"
        created_at = str(data.get("created_at") or date.today().isoformat())[:10].replace("-", "")
        filename = clean_filename(f"檢測申請簽呈_{company}_{created_at}.docx")
        output = GENERATED_DIR / filename
        return fill_memo(data, MEMO_TEMPLATE, output)

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

        archive_dir = f"generated_forms/submissions/{case_no}"
        self.send_json(
            {
                "ok": True,
                "caseNo": case_no,
                "files": saved_files,
                "note": note,
                "archiveDir": archive_dir,
            }
        )

    def send_json(self, data: dict, status: int = 200) -> None:
        encoded = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def send_docx(self, path: Path, filename: str | None = None) -> None:
        content = path.read_bytes()
        encoded_filename = quote(filename or path.name)
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
    QuoteMvpHandler.line_notifications = LineNotifications()
    server = ThreadingHTTPServer(("127.0.0.1", 8765), QuoteMvpHandler)
    print("PTRI quote MVP server: http://127.0.0.1:8765/")
    server.serve_forever()


if __name__ == "__main__":
    main()
