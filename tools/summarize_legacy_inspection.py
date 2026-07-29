from __future__ import annotations

import json
import re
import sys
from pathlib import Path


def clean(text: object) -> str:
    value = "" if text is None else str(text)
    value = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", " ", value)
    value = value.replace("\n", " / ")
    return value[:160]


def main() -> None:
    path = Path(sys.argv[1])
    data = json.loads(path.read_text(encoding="utf-8"))
    print("WORKBOOK:", clean(data["workbook"]))
    print("SHEETS")
    for sheet in data["sheets"]:
        print(
            f"- {clean(sheet['title'])}: {sheet['state']} {sheet['dimension']} "
            f"cells={sheet['non_empty_cells']} formulas={len(sheet['formulas'])} "
            f"validations={len(sheet['data_validations'])}"
        )
    print()
    print("LABELS")
    for sheet in data["sheets"]:
        print(f"### {clean(sheet['title'])}")
        for item in sheet["labels"][:70]:
            print(f"{item['cell']}: {clean(item['text'])}")
    print()
    print("FORMULAS")
    for sheet in data["sheets"]:
        print(f"### {clean(sheet['title'])}")
        for item in sheet["formulas"][:90]:
            print(f"{item['cell']}: {clean(item['formula'])}")
    print()
    print("VALIDATIONS")
    for sheet in data["sheets"]:
        print(f"### {clean(sheet['title'])}")
        for item in sheet["data_validations"]:
            print(
                f"{clean(item['ranges'])}: {clean(item['type'])} "
                f"{clean(item['formula1'])} {clean(item['formula2'])}"
            )
    print()
    print("DRAWING TEXTS")
    for name, texts in data["package"]["drawing_chart_control_texts"].items():
        print(f"### {name}")
        for text in texts[:50]:
            print(clean(text))
    print()
    print("VBA KEY STRINGS")
    key_terms = [
        "docx",
        "xlsx",
        "Word.Application",
        "minimum",
        "2,500",
        "Too many",
        "No test item",
        "Date format",
        "Report",
        "Error",
        "Save",
        "selected",
        "FileDialog",
        "Range",
        "C2:C11",
        "C15:C26",
        "F5:F26",
        "N5:N16",
        "V5:V26",
    ]
    strings = data["package"]["vba_strings"]
    for term in key_terms:
        matches = [clean(s) for s in strings if term.lower() in s.lower()]
        if matches:
            print(f"### {term}")
            for match in matches[:30]:
                print(match)


if __name__ == "__main__":
    main()
