from __future__ import annotations

import json
import sys
from pathlib import Path

import openpyxl


GROUPS = [
    ("A.紙張適性檢測", "F", "G", "H", "I", "J", "K", "L", 5, 26),
    ("B.平板油墨基本特性", "N", "O", "P", "Q", "R", "S", "T", 5, 16),
    ("C.印刷成品之印墨適性", "V", "W", "X", "Y", "Z", "AA", "AC", 5, 26),
    ("D.平板印刷水槽液", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", 5, 8),
    ("E.其他服務", "AM", "AN", "AO", "AP", "AQ", "AR", "AT", 5, 30),
]


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract_legacy_items.py INPUT.xlsm OUTPUT.json")
    workbook_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    wb_values = openpyxl.load_workbook(workbook_path, data_only=True, keep_vba=True)
    wb_formulas = openpyxl.load_workbook(workbook_path, data_only=False, keep_vba=True)
    ws = wb_values["檢測項目"]
    wsf = wb_formulas["檢測項目"]
    items = []
    for group, check_col, no_col, name_col, price_col, sample_col, ink_col, subtotal_col, start, end in GROUPS:
        for row in range(start, end + 1):
            no = ws[f"{no_col}{row}"].value
            name = ws[f"{name_col}{row}"].value
            price = ws[f"{price_col}{row}"].value
            if not no and not name and price in (None, ""):
                continue
            items.append(
                {
                    "group": group,
                    "row": row,
                    "check_cell": f"{check_col}{row}",
                    "checked_value": ws[f"{check_col}{row}"].value,
                    "no": no,
                    "name": name,
                    "price": price,
                    "sample_count_formula": wsf[f"{sample_col}{row}"].value,
                    "ink_count_formula": wsf[f"{ink_col}{row}"].value,
                    "subtotal_formula": wsf[f"{subtotal_col}{row}"].value,
                    "subtotal_value": ws[f"{subtotal_col}{row}"].value,
                }
            )
    output_path.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(output_path)
    for item in items:
        print(
            f"{item['group']} {item['no']} {item['name']} "
            f"price={item['price']} subtotal={item['subtotal_formula']}"
        )


if __name__ == "__main__":
    main()
