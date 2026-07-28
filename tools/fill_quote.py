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
NUMBER_FONT = "Times New Roman"
TEXT_FONT = "標楷體"
NUMERIC_CHARS = set("0123456789,.-/#()~")


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


def set_run_font(run, size_pt: int = 12, font_name: str = TEXT_FONT) -> None:
    run.font.name = font_name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), font_name)
    run.font.size = Pt(size_pt)


def apply_number_font(run) -> None:
    if not any(char.isdigit() for char in run.text):
        return
    run._element.rPr.rFonts.set(qn("w:ascii"), NUMBER_FONT)
    run._element.rPr.rFonts.set(qn("w:hAnsi"), NUMBER_FONT)
    run._element.rPr.rFonts.set(qn("w:cs"), NUMBER_FONT)


def apply_number_font_to_doc(doc: Document) -> None:
    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            apply_number_font(run)
    for table in doc.tables:
        for row in table.rows:
            for target_cell in row.cells:
                for paragraph in target_cell.paragraphs:
                    for run in paragraph.runs:
                        apply_number_font(run)


def add_mixed_font_text(paragraph, text: str, size_pt: int) -> None:
    current = []
    current_is_number = None

    def flush() -> None:
        nonlocal current
        if not current:
            return
        run = paragraph.add_run("".join(current))
        set_run_font(run, size_pt, NUMBER_FONT if current_is_number else TEXT_FONT)
        current = []

    for char in str(text or ""):
        is_number = char in NUMERIC_CHARS
        if current_is_number is None:
            current_is_number = is_number
        if is_number != current_is_number:
            flush()
            current_is_number = is_number
        current.append(char)
    flush()


def set_cell_text(cell, text: str, size_pt: int = 12) -> None:
    paragraph = cell.paragraphs[0] if cell.paragraphs else cell.add_paragraph()
    for extra in cell.paragraphs[1:]:
        cell._tc.remove(extra._p)
    clear_paragraph_numbering(paragraph)
    paragraph.clear()
    add_mixed_font_text(paragraph, str(text or ""), size_pt)


def clear_paragraph_numbering(paragraph) -> None:
    p_pr = paragraph._p.get_or_add_pPr()
    num_pr = p_pr.numPr
    if num_pr is not None:
        p_pr.remove(num_pr)


def set_cell_lines(cell, lines: list[str], size_pt: int = 12) -> None:
    paragraph = cell.paragraphs[0] if cell.paragraphs else cell.add_paragraph()
    for extra in cell.paragraphs[1:]:
        cell._tc.remove(extra._p)
    clear_paragraph_numbering(paragraph)
    paragraph.clear()
    add_mixed_font_text(paragraph, lines[0] if lines else "", size_pt)
    for line in lines[1:]:
        paragraph = cell.add_paragraph()
        clear_paragraph_numbering(paragraph)
        add_mixed_font_text(paragraph, line, size_pt)


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
    for index, item in enumerate(items, start=1):
        name = item.get("name", "")
        price = item.get("price", 0)
        if not name:
            continue
        line_total = int(float(price or 0)) * sample_count
        lines.append(f"{index}.  {name}{money(price)}元/件*{sample_count}種={money(line_total)}元")
    if int(float(estimate.get("reportFee") or 0)) > 0:
        lines.append(f"報告加購費用={money(estimate.get('reportFee'))}元")
    if int(float(estimate.get("urgent") or 0)) > 0:
        lines.append(f"{case_type}加成={money(estimate.get('urgent'))}元")
    lines.append(f"此檢測報告共計新台幣{money(total)}元(含稅)")
    return lines


def clear_paragraph_properties(paragraph) -> None:
    p_pr = paragraph._p.pPr
    if p_pr is not None:
        paragraph._p.remove(p_pr)


def set_fee_lines(cell, lines: list[str], size_pt: int = 12) -> None:
    if not lines:
        return

    first_paragraph = cell.paragraphs[0] if cell.paragraphs else cell.add_paragraph()

    for extra in cell.paragraphs[1:]:
        cell._tc.remove(extra._p)

    for index, line in enumerate(lines):
        paragraph = first_paragraph if index == 0 else cell.add_paragraph()
        clear_paragraph_properties(paragraph)
        paragraph.clear()
        add_mixed_font_text(paragraph, line, size_pt)


def case_type_text(case_type: str) -> str:
    if "7~14" in case_type:
        return case_type
    if case_type == "一般件":
        return "一般件(7~14個工作天，不含國定假日及例假日)"
    return case_type


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
    set_cell_text(table.rows[0].cells[1], customer.get("companyName", ""), 16)
    set_cell_text(table.rows[0].cells[3], roc_date(data.get("quote_date")), 16)
    set_cell_text(table.rows[1].cells[1], customer.get("contactName", ""), 16)
    set_cell_text(table.rows[1].cells[3], customer.get("phone", ""), 16)
    set_cell_text(table.rows[2].cells[1], customer.get("address", ""), 16)
    set_cell_text(table.rows[2].cells[3], customer.get("fax", ""), 16)

    sample_name = sample.get("sampleName", "")
    names = item_names(items)
    case_type = sample.get("caseType", "一般件")
    table = doc.tables[1]
    set_cell_text(table.rows[0].cells[1], f"1種樣本，名稱：{sample_name}", 18)
    set_cell_text(table.rows[1].cells[2], names, 18)
    set_cell_text(table.rows[2].cells[3], case_type_text(case_type), 18)

    set_fee_lines(
        doc.tables[2].rows[0].cells[0],
        fee_lines(items, data.get("total", 0), estimate, case_type),
        12,
    )

    apply_number_font_to_doc(doc)
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
