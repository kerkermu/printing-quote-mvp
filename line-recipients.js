const resetLineEditor = (() => {
  const unlock = document.querySelector("#lineUnlock");
  const editor = document.querySelector("#lineEditor");
  const fields = document.querySelector("#lineFields");
  const rows = document.querySelector("#lineRows");
  const status = document.querySelector("#lineStatus");
  let password = "";
  let revision = "";
  let generation = 0;

  function addRow([enabled, name, id]) {
    const row = document.createElement("div");
    row.className = "line-recipient-row";
    row.innerHTML = `<label><input type="checkbox" /> 通知</label>
      <label>姓名／職稱<input type="text" autocomplete="off" /></label>
      <label>LINE user ID<input type="text" required pattern="U[0-9a-fA-F]{32}" autocomplete="off" /></label>
      <button class="ghost-button" type="button">移除</button>`;
    const inputs = row.querySelectorAll("input");
    inputs[0].checked = enabled;
    inputs[1].value = name;
    inputs[2].value = id;
    row.querySelector("button").onclick = () => row.remove();
    rows.append(row);
    return inputs[1];
  }

  async function request(body) {
    if (location.protocol === "file:") throw new Error("請從 RPA 後端網址開啟系統。");
    const response = await fetch("/api/admin/line-recipients", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("無法連線至收件名單服務，請確認已啟動新版 RPA 後端。");
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "無法處理收件名單。");
    return data;
  }

  unlock.onsubmit = async (event) => {
    event.preventDefault();
    const attempt = ++generation;
    const key = unlock.elements.password.value;
    try {
      const data = await request({action: "load", password: key});
      if (attempt !== generation) return;
      password = key;
      revision = data.revision;
      unlock.reset();
      unlock.hidden = true;
      editor.hidden = false;
      rows.replaceChildren();
      data.rows.forEach(addRow);
      status.textContent = data.notificationsEnabled ? "可同時啟用最多 10 人。" : "主機尚未啟用 LINE 發送，仍可編輯名單。";
    } catch (error) {
      if (attempt === generation) status.textContent = error.message;
    }
  };
  document.querySelector("#lineAdd").onclick = () => addRow([true, "", ""]).focus();
  editor.onsubmit = async (event) => {
    event.preventDefault();
    const attempt = generation;
    const entries = Array.from(rows.children, (row) => {
      const [enabled, name, id] = row.querySelectorAll("input");
      return [enabled.checked, name.value.trim(), id.value.trim()];
    });
    if (!entries.some(([enabled]) => enabled) && !confirm("儲存後將暫停所有新申請通知。確定儲存？")) return;
    fields.disabled = true;
    try {
      const data = await request({action: "save", password, revision, rows: entries});
      if (attempt !== generation) return;
      revision = data.revision;
      status.textContent = data.notificationsEnabled ? "已儲存，下一筆新申請會使用此名單。" : "已儲存。主機尚未啟用 LINE 發送。";
    } catch (error) {
      if (attempt === generation) status.textContent = error.message;
    } finally {
      if (attempt === generation) fields.disabled = false;
    }
  };
  return () => {
    generation++;
    password = "";
    revision = "";
    unlock.reset();
    rows.replaceChildren();
    unlock.hidden = false;
    editor.hidden = true;
    fields.disabled = false;
    status.textContent = "";
  };
})();
