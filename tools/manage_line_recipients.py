"""Windows desktop editor for the RPA notification recipient list."""

import os
import tkinter as tk
from tkinter import messagebox, ttk

from line_notifications import recipient_file_path
from recipient_store import USER_ID, parse_list, read_snapshot, save_list


class Editor:
    def __init__(self, root):
        self.root = root
        self.path = recipient_file_path()
        self.snapshot = read_snapshot(self.path)
        raw = self.snapshot
        if raw is None:
            legacy = os.environ.get("PTRI_LINE_USER_IDS", "")
            raw = "\n".join(legacy.split(",")).encode("utf-8")
        self.rows, self.notes = parse_list(raw)
        root.title("印研中心 · LINE 收件人管理")
        root.geometry("760x460")
        root.minsize(650, 400)
        panel = ttk.Frame(root, padding=16)
        panel.pack(fill="both", expand=True)
        ttk.Label(panel, text="新申請通知收件人", font=("Microsoft JhengHei UI", 15, "bold")).pack(anchor="w")
        ttk.Label(panel, text=str(self.path), wraplength=630).pack(anchor="w", pady=(3, 12))
        self.table = ttk.Treeview(panel, columns=("enabled", "name", "id"), show="headings",
                                  selectmode="browse", height=7)
        for key, title, width in (("enabled", "通知", 60), ("name", "姓名／職稱", 155),
                                  ("id", "LINE user ID", 330)):
            self.table.heading(key, text=title)
            self.table.column(key, width=width, stretch=key != "enabled")
        self.table.pack(fill="both", expand=True)
        self.table.bind("<Button-1>", self.toggle)
        self.table.bind("<space>", self.toggle_selected)
        bar = ttk.Frame(panel)
        bar.pack(fill="x", pady=10)
        for label, command in (("新增", lambda: self.edit(None)), ("編輯", self.edit_selected),
                               ("移除", self.remove)):
            ttk.Button(bar, text=label, command=command).pack(side="left", padx=(0, 5))
        ttk.Button(bar, text="儲存名單", command=self.save).pack(side="right")
        self.status = tk.StringVar(value="點選「通知」欄可切換收件狀態，修改後請按「儲存名單」。")
        ttk.Label(panel, textvariable=self.status, wraplength=630).pack(anchor="w")
        self.dirty = False
        self.refresh()
        root.protocol("WM_DELETE_WINDOW", self.close)

    def refresh(self):
        self.table.delete(*self.table.get_children())
        for i, (on, name, value) in enumerate(self.rows):
            self.table.insert("", "end", iid=str(i), values=("☑" if on else "☐", name, value))

    def changed(self):
        self.dirty = True
        self.refresh()
        self.status.set("名單已修改，請按「儲存名單」套用。")

    def flip(self, item):
        i = int(item)
        on, name, value = self.rows[i]
        self.rows[i] = (not on, name, value)
        self.changed()
        self.table.selection_set(item)
        self.table.focus(item)

    def toggle(self, event):
        item = self.table.identify_row(event.y)
        if item and self.table.identify_column(event.x) == "#1":
            self.flip(item)
            return "break"

    def toggle_selected(self, event):
        if self.table.selection():
            self.flip(self.table.selection()[0])
        return "break"

    def edit_selected(self):
        if self.table.selection():
            self.edit(int(self.table.selection()[0]))

    def remove(self):
        if self.table.selection():
            del self.rows[int(self.table.selection()[0])]
            self.changed()

    def edit(self, index):
        on, name, value = self.rows[index] if index is not None else (True, "", "")
        dialog = tk.Toplevel(self.root)
        dialog.title("編輯收件人" if index is not None else "新增收件人")
        dialog.transient(self.root)
        form = ttk.Frame(dialog, padding=16)
        form.pack()
        entries = []
        for label, initial in (("姓名／職稱", name), ("LINE user ID", value)):
            ttk.Label(form, text=label).pack(anchor="w")
            entry = ttk.Entry(form, width=44)
            entry.insert(0, initial)
            entry.pack(pady=(2, 8))
            entries.append(entry)

        def accept():
            name, value = (entry.get().strip() for entry in entries)
            if not USER_ID.fullmatch(value):
                messagebox.showerror("請確認 ID", "請填入大寫 U 加上 32 個十六進位字元。", parent=dialog)
                return
            if any(i != index and row[2] == value for i, row in enumerate(self.rows)):
                messagebox.showerror("重複收件人", "名單已有這個 ID。", parent=dialog)
                return
            if index is None:
                self.rows.append((on, name, value))
            else:
                self.rows[index] = (on, name, value)
            self.changed()
            dialog.destroy()

        ttk.Button(form, text="確定", command=accept).pack(anchor="e")
        dialog.bind("<Return>", lambda event: accept())
        dialog.bind("<Escape>", lambda event: dialog.destroy())
        dialog.grab_set()
        entries[0].focus_set()

    def save(self):
        if not any(row[0] for row in self.rows) and not messagebox.askyesno(
                "暫停通知", "目前無啟用的收件人。要儲存並暫停新申請通知嗎？"):
            return
        try:
            first_save = self.snapshot is None
            self.snapshot = save_list(self.path, self.snapshot, self.rows, self.notes)
        except (ValueError, OSError) as exc:
            messagebox.showerror("無法儲存", str(exc))
            return
        self.dirty = False
        self.status.set("已儲存。第一次啟用名單後請重新啟動 RPA。" if first_save else "已儲存收件名單。")

    def close(self):
        if not self.dirty or messagebox.askyesno("尚未儲存", "要放棄未儲存的修改並關閉嗎？"):
            self.root.destroy()


if __name__ == "__main__":
    root = tk.Tk()
    try:
        Editor(root)
    except (OSError, ValueError) as exc:
        root.withdraw()
        messagebox.showerror("無法開啟收件名單", str(exc), parent=root)
        root.destroy()
    else:
        root.mainloop()
