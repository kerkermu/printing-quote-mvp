from __future__ import annotations

import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree as ET

import openpyxl


NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
}


def cell_value(value):
    if value is None:
        return None
    if hasattr(value, "isoformat"):
        return value.isoformat()
    return value


def compact_rows(ws, max_rows=80, max_cols=18):
    rows = []
    for row in ws.iter_rows(
        min_row=1,
        max_row=min(ws.max_row, max_rows),
        min_col=1,
        max_col=min(ws.max_column, max_cols),
    ):
        values = [cell_value(cell.value) for cell in row]
        if any(value not in (None, "") for value in values):
            rows.append(
                {
                    "row": row[0].row,
                    "values": values,
                }
            )
    return rows


def formulas(ws, limit=120):
    found = []
    for row in ws.iter_rows():
        for cell in row:
            if isinstance(cell.value, str) and cell.value.startswith("="):
                found.append({"cell": cell.coordinate, "formula": cell.value})
                if len(found) >= limit:
                    return found
    return found


def data_validations(ws, limit=80):
    validations = []
    dvs = getattr(ws.data_validations, "dataValidation", []) or []
    for dv in dvs[:limit]:
        validations.append(
            {
                "ranges": str(dv.sqref),
                "type": dv.type,
                "formula1": dv.formula1,
                "formula2": dv.formula2,
                "allow_blank": dv.allowBlank,
            }
        )
    return validations


def merged_ranges(ws):
    return [str(item) for item in ws.merged_cells.ranges]


def sheet_summary(workbook_path: Path):
    wb_values = openpyxl.load_workbook(workbook_path, data_only=True, keep_vba=True)
    wb_formulas = openpyxl.load_workbook(workbook_path, data_only=False, keep_vba=True)
    summaries = []
    for ws in wb_values.worksheets:
        ws_formula = wb_formulas[ws.title]
        non_empty = 0
        labels = []
        for row in ws.iter_rows():
            for cell in row:
                if cell.value not in (None, ""):
                    non_empty += 1
                    if isinstance(cell.value, str):
                        text = cell.value.strip()
                        if text and len(labels) < 120:
                            labels.append({"cell": cell.coordinate, "text": text})
        summaries.append(
            {
                "title": ws.title,
                "state": ws.sheet_state,
                "dimension": ws.calculate_dimension(),
                "max_row": ws.max_row,
                "max_column": ws.max_column,
                "non_empty_cells": non_empty,
                "merged_ranges": merged_ranges(ws)[:80],
                "data_validations": data_validations(ws),
                "formulas": formulas(ws_formula),
                "labels": labels,
                "sample_rows": compact_rows(ws),
            }
        )
    defined_names = []
    for name, defn in wb_formulas.defined_names.items():
        defined_names.append({"name": name, "attr_text": defn.attr_text})
    return {"sheets": summaries, "defined_names": defined_names}


def rel_targets(zf: zipfile.ZipFile):
    rels = {}
    for name in zf.namelist():
        if not name.endswith(".rels"):
            continue
        try:
            root = ET.fromstring(zf.read(name))
        except ET.ParseError:
            continue
        items = []
        for rel in root:
            items.append(
                {
                    "id": rel.attrib.get("Id"),
                    "type": rel.attrib.get("Type"),
                    "target": rel.attrib.get("Target"),
                }
            )
        rels[name] = items
    return rels


def xml_texts(zf: zipfile.ZipFile, name: str):
    try:
        root = ET.fromstring(zf.read(name))
    except ET.ParseError:
        return []
    texts = []
    for node in root.iter():
        tag = node.tag.rsplit("}", 1)[-1]
        if tag in {"t", "v", "f"} and node.text:
            text = node.text.strip()
            if text:
                texts.append(text)
    return texts


def package_summary(workbook_path: Path):
    with zipfile.ZipFile(workbook_path) as zf:
        names = zf.namelist()
        interesting = [
            name
            for name in names
            if name.startswith(("xl/drawings/", "xl/charts/", "xl/ctrlProps/"))
            or name == "xl/vbaProject.bin"
        ]
        text_payloads = {}
        for name in interesting:
            if name.endswith((".xml", ".vml")):
                text = xml_texts(zf, name)
                if text:
                    text_payloads[name] = text[:80]
        vba_strings = []
        if "xl/vbaProject.bin" in names:
            raw = zf.read("xl/vbaProject.bin")
            ascii_strings = re.findall(rb"[ -~]{5,}", raw)
            utf16_strings = re.findall((rb"(?:[ -~]\x00){5,}"), raw)
            decoded = []
            decoded.extend(item.decode("latin1", errors="ignore") for item in ascii_strings)
            decoded.extend(item.decode("utf-16le", errors="ignore") for item in utf16_strings)
            seen = set()
            for text in decoded:
                clean = text.strip()
                if clean and clean not in seen:
                    seen.add(clean)
                    vba_strings.append(clean)
        ext_counts = Counter(Path(name).suffix.lower() or "<none>" for name in names)
        return {
            "package_file_count": len(names),
            "extension_counts": dict(ext_counts),
            "interesting_files": interesting,
            "relationships": rel_targets(zf),
            "drawing_chart_control_texts": text_payloads,
            "vba_strings": vba_strings[:500],
        }


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: inspect_legacy_xlsm.py INPUT.xlsm OUTPUT.json")
    workbook_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    result = {
        "workbook": str(workbook_path),
        **sheet_summary(workbook_path),
        "package": package_summary(workbook_path),
    }
    output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(output_path)


if __name__ == "__main__":
    main()
