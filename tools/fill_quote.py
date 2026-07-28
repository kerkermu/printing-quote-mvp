"""Fill the official PTRI quote DOCX template while preserving its layout."""

from __future__ import annotations

import argparse
import json
import shutil
from datetime import date
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.shared import Pt


ROOT = Path(__file__).resolve().parents[1]
QUOTE_TEMPLATE = ROOT / "templates" / "quote_template.docx"


def money(value: int | float | str | None) -> str:
    try:
        amount = int(float(value or 0))
    except (TypeError, ValueError):
        amount = 0
    return f"{amount:,}"


def roc_date(value: str | None = None) -> str:
    if value:
        try:
            parsed = date.fromisoformat(value[:10])
        except ValueError:
            parsed = date.today()
    else:
        parsed = date.today()
    return f"{parsed.year - 1911}年{parsed.month}月{parsed.day}日"


def set_run_font(run, size_pt: int = 12) -> None:
    run.font.name = "標楷體"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "標楷體")
    run.font.size = Pt(size_pt)


def set_cell_text(cell, text: str, size_pt: int = 12) -> None:
    paragraph = cell.paragraphs[0] if cell.paragraphs else cell.add_paragraph()
    for extra in cell.paragraphs[1:]:
        cell._tc.remove(extra._p)
    paragraph.clear()
    run = paragraph.add_run(str(text or ""))
    set_run_font(run, size_pt)


def item_names(items: list[dict]) -> str:
    return "、".join(item.get("name", "") for item in items if item.get("name"))


def fee_lines(
    items: list[dict],
    total: int | float | str,
    estimate: dict,
    case_type: str,
    sample_count: int = 1,
) -> str:
    lines = []
    for item in items:
        name = item.get("name", "")
        price = item.get("price", 0)
        if not name:
            continue
        line_total = int(float(price or 0)) * sample_count
        lines.append(f"{name}{money(price)}元/件*{sample_count}種={money(line_total)}元")
    if int(float(estimate.get("reportFee") or 0)) > 0:
        lines.append(f"報告加購費用={money(estimate.get('reportFee'))}元")
    if int(float(estimate.get("urgent") or 0)) > 0:
        lines.append(f"{case_type}加成={money(estimate.get('urgent'))}元")
    lines.append(f"此檢測報告共計新台幣{money(total)}元(含稅)")
    return "\n".join(lines)


def quote_data_from_payload(payload: dict) -> dict:
    customer = payload.get("customer", {})
    sample = payload.get("sample", {})
    estimate = payload.get("estimate", {})
    items = estimate.get("items", [])
    return {
        "case_no": payload.get("caseNo", ""),
        "quote_date": payload.get("createdAt") or date.today().isoformat(),
        "customer": customer,
        "sample": sample,
        "items": items,
        "estimate": estimate,
        "total": estimate.get("total", 0),
    }


def fill_quote(data: dict, template: Path, output: Path) -> Path:
    if not template.exists():
        raise FileNotFoundError(f"Quote template not found: {template}")

    output.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(template, output)

    doc = Document(str(output))
    customer = data.get("customer", {})
    sample = data.get("sample", {})
    items = data.get("items", [])
    estimate = data.get("estimate", {})

    table = doc.tables[0]
    set_cell_text(table.rows[0].cells[1], customer.get("companyName", ""))
    set_cell_text(table.rows[0].cells[3], roc_date(data.get("quote_date")))
    set_cell_text(table.rows[1].cells[1], customer.get("contactName", ""))
    set_cell_text(table.rows[1].cells[3], customer.get("phone", ""))
    set_cell_text(table.rows[2].cells[1], customer.get("address", ""))
    set_cell_text(table.rows[2].cells[3], customer.get("fax", ""))

    sample_name = sample.get("sampleName", "")
    names = item_names(items)
    case_type = sample.get("caseType", "一般件")
    table = doc.tables[1]
    set_cell_text(table.rows[0].cells[1], f"1種樣本，名稱：{sample_name}")
    set_cell_text(table.rows[1].cells[2], names)
    set_cell_text(table.rows[2].cells[3], case_type)

    set_cell_text(
        doc.tables[2].rows[0].cells[0],
        fee_lines(items, data.get("total", 0), estimate, case_type),
        12,
    )

    doc.save(str(output))
    return output


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input_json", type=Path)
    parser.add_argument("--out", type=Path, default=ROOT / "generated_forms" / "quote.docx")
    parser.add_argument("--template", type=Path, default=QUOTE_TEMPLATE)
    args = parser.parse_args()

    raw_data = json.loads(args.input_json.read_text(encoding="utf-8-sig"))
    data = quote_data_from_payload(raw_data) if "estimate" in raw_data else raw_data
    output = fill_quote(data, args.template, args.out)
    print(output)


if __name__ == "__main__":
    main()
