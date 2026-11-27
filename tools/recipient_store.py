import os
import re
import tempfile
from pathlib import Path


USER_ID = re.compile(r"U[0-9a-fA-F]{32}")


def read_snapshot(path):
    try:
        return path.read_bytes()
    except FileNotFoundError:
        return None


def parse_list(raw):
    rows, notes = [], []
    for number, line in enumerate(raw.decode("utf-8-sig").splitlines(), 1):
        line = line.strip()
        enabled = not line.startswith("#")
        value, _, name = line.removeprefix("#").partition("#")
        value = value.strip()
        if USER_ID.fullmatch(value):
            rows.append((enabled, name.strip(), value))
        elif not enabled:
            notes.append(line)
        elif value:
            raise ValueError(f"名單第 {number} 行的 LINE user ID 格式錯誤，請先修正原檔。")
    return rows, notes


def save_list(path, snapshot, rows, notes):
    lines = list(notes)
    seen = set()
    for enabled, name, value in rows:
        if not USER_ID.fullmatch(value):
            raise ValueError("LINE user ID 須為大寫 U 加上 32 個十六進位字元。")
        if value in seen:
            raise ValueError("同一個 LINE user ID 只能保留一列。")
        seen.add(value)
        if len(("x" + name + "x").splitlines()) != 1:
            raise ValueError("姓名或職稱須填在同一行。")
        lines.append(("" if enabled else "# ") + value + ("  # " + name if name else ""))
    if sum(row[0] for row in rows) > 10:
        raise ValueError("每次最多可啟用 10 位收件人。")
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as output:
        temp = Path(output.name)
    try:
        data = ("\n".join(lines) + "\n").encode("utf-8")
        temp.write_bytes(data)
        if read_snapshot(path) != snapshot:
            raise ValueError("名單已由其他人修改，請關閉工具並重新開啟。")
        os.replace(temp, path)
        return data
    finally:
        temp.unlink(missing_ok=True)
