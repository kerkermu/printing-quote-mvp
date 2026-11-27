"""Fill the official vertical PTRI internal memo template."""

from __future__ import annotations

import copy
import shutil
from datetime import date
from pathlib import Path

from docx import Document


ROOT = Path(__file__).resolve().parents[1]
MEMO_TEMPLATE = ROOT / "templates" / "memo_template.docx"

FINANCIAL_DIGITS = "零壹貳參肆伍陸柒捌玖"
COMMON_DIGITS = "〇一二三四五六七八九"


def group_to_financial(value: int) -> str:
    units = ("仟", "佰", "拾", "")
    digits = [value // 1000, value // 100 % 10, value // 10 % 10, value % 10]
    result = []
    pending_zero = False
    for digit, unit in zip(digits, units):
        if digit:
            if pending_zero and result:
                result.append("零")
            result.append(FINANCIAL_DIGITS[digit] + unit)
            pending_zero = False
        elif result:
            pending_zero = True
    return "".join(result)


def financial_amount(value: int | float | str | None) -> str:
    amount = max(0, int(float(value or 0)))
    if amount == 0:
        return "零"
    high, low = divmod(amount, 10000)
    result = ""
    if high:
        result = group_to_financial(high) + "萬"
    if low:
        if high and low < 1000:
            result += "零"
        result += group_to_financial(low)
    return result


def common_number(value: int) -> str:
    if value < 10:
        return COMMON_DIGITS[value]
    if value < 20:
        return "十" + (COMMON_DIGITS[value % 10] if value % 10 else "")
    tens, ones = divmod(value, 10)
    return COMMON_DIGITS[tens] + "十" + (COMMON_DIGITS[ones] if ones else "")


def roc_date_text(value: str | None) -> str:
    try:
        parsed = date.fromisoformat(str(value or "")[:10])
    except ValueError:
        parsed = date.today()
    roc_year = str(parsed.year - 1911)
    year_text = "".join(COMMON_DIGITS[int(char)] for char in roc_year)
    return (
        "        中  華  民  國　　"
        f"{year_text}　　年　　{common_number(parsed.month)}　　月　　"
        f"{common_number(parsed.day)}　　日"
    )


def replace_paragraph_text(paragraph, text: str) -> None:
    template_run = paragraph.runs[0] if paragraph.runs else None
    paragraph.clear()
    run = paragraph.add_run(text)
    if template_run is not None and template_run._r.rPr is not None:
        old_r_pr = run._r.rPr
        if old_r_pr is not None:
            run._r.remove(old_r_pr)
        run._r.insert(0, copy.deepcopy(template_run._r.rPr))


def memo_data_from_payload(payload: dict) -> dict:
    estimate = payload.get("estimate", {})
    internal = payload.get("internal", {})
    return {
        "created_at": payload.get("createdAt"),
        "company_name": payload.get("customer", {}).get("companyName", ""),
        "tax_id": payload.get("customer", {}).get("taxId", ""),
        "case_type": payload.get("sample", {}).get("caseType", "一般件"),
        "sample_count": 1,
        "items": estimate.get("items", []),
        "total": internal.get("finalAmount", estimate.get("total", 0)),
    }


def fill_memo(data: dict, template: Path, output: Path) -> Path:
    if not template.exists():
        raise FileNotFoundError(f"Memo template not found: {template}")

    output.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(template, output)
    doc = Document(str(output))

    items = data.get("items", [])
    item_names = "、".join(item.get("name", "") for item in items if item.get("name"))
    body = (
        f"    呈閱{data.get('company_name', '')}測試申請書一份(如附件)，"
        f"共{data.get('sample_count', 1)}樣，{data.get('case_type', '一般件')}，"
        f"檢測項目共{len(items)}項，為{item_names}，"
        f"檢測費用共計新台幣{financial_amount(data.get('total'))}元整(含稅)，"
        f"統編：{data.get('tax_id', '')}，奉核可後，即進行檢測工作。"
    )
    replace_paragraph_text(doc.paragraphs[2], body)
    replace_paragraph_text(doc.paragraphs[12], roc_date_text(data.get("created_at")))
    doc.save(str(output))
    return output
