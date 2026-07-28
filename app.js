const testItems = [
  {
    id: "paper-weight",
    name: "基重測定",
    method: "CNS / ISO 紙張基本物性",
    price: 800,
    days: 3,
  },
  {
    id: "paper-thickness",
    name: "厚度測定",
    method: "CNS / ISO 紙張厚度量測",
    price: 900,
    days: 3,
  },
  {
    id: "surface",
    name: "表面粗糙度",
    method: "PPS / Bendtsen method",
    price: 1800,
    days: 5,
  },
  {
    id: "ink-absorption",
    name: "油墨吸收性",
    method: "印刷適性實驗方法",
    price: 2500,
    days: 7,
  },
  {
    id: "rub",
    name: "耐磨擦試驗",
    method: "乾/濕摩擦測試",
    price: 1600,
    days: 5,
  },
  {
    id: "color-density",
    name: "印刷濃度與色差",
    method: "ISO 13655 / 色差量測",
    price: 2200,
    days: 5,
  },
];

const state = {
  user: JSON.parse(localStorage.getItem("ptri_user") || "null"),
  cases: JSON.parse(localStorage.getItem("ptri_cases") || "[]"),
  selectedDoc: "application",
  activeCase: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (value) =>
  new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(value);

function saveState() {
  localStorage.setItem("ptri_user", JSON.stringify(state.user));
  localStorage.setItem("ptri_cases", JSON.stringify(state.cases));
}

function setView(viewName) {
  if (!state.user && viewName !== "login") {
    viewName = "login";
  }

  $$(".view").forEach((view) => view.classList.remove("active"));
  $$(".nav-item").forEach((item) => item.classList.remove("active"));

  const view = $(`#${viewName}View`);
  if (view) view.classList.add("active");

  const nav = $(`.nav-item[data-view="${viewName}"]`);
  if (nav) nav.classList.add("active");

  const titles = {
    login: "客戶登入",
    quote: "印刷適性實驗室線上申請與報價",
    cases: "我的案件",
    admin: "內部後台",
    settings: "帳戶資料",
  };
  $("#viewTitle").textContent = titles[viewName] || "檢測線上報價";

  if (viewName === "cases") renderCases();
  if (viewName === "admin") renderKanban();
  if (viewName === "settings") fillProfileForm();
}

function syncAccountUi() {
  $("#currentCompany").textContent = state.user?.companyName || "尚未登入";
  $("#currentEmail").textContent = state.user?.email || "請先建立 demo 帳號";
  if (state.user) fillQuoteCustomer();
}

function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function fillForm(form, data) {
  Object.entries(data).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input) input.value = value;
  });
}

function fillQuoteCustomer() {
  const form = $("#quoteForm");
  fillForm(form, {
    companyName: state.user.companyName,
    taxId: state.user.taxId,
    contactName: state.user.contactName,
    email: state.user.email,
    address: state.user.address,
  });
}

function fillProfileForm() {
  if (state.user) fillForm($("#profileForm"), state.user);
}

function renderTests() {
  $("#testList").innerHTML = testItems
    .map(
      (item, index) => `
      <label class="test-item">
        <input type="checkbox" name="tests" value="${item.id}" ${index < 3 ? "checked" : ""} />
        <span>
          <h4>${item.name}</h4>
          <p>${item.method}｜預估 ${item.days} 工作天</p>
        </span>
        <span class="price">${money(item.price)}</span>
      </label>
    `
    )
    .join("");
}

function getSelectedItems() {
  const selected = $$('input[name="tests"]:checked').map((input) => input.value);
  return testItems.filter((item) => selected.includes(item.id));
}

function calculateEstimate() {
  const items = getSelectedItems();
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const urgent = $("#quoteForm").elements.urgent.checked ? Math.round(subtotal * 0.3) : 0;
  const tax = Math.round((subtotal + urgent) * 0.05);
  const total = subtotal + urgent + tax;

  $("#subtotalText").textContent = money(subtotal);
  $("#urgentText").textContent = money(urgent);
  $("#taxText").textContent = money(tax);
  $("#totalText").textContent = money(total);

  return { subtotal, urgent, tax, total, items };
}

function createCase(formData, estimate) {
  const now = new Date();
  const caseNo = `PTRI-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}-${String(state.cases.length + 1).padStart(3, "0")}`;

  return {
    id: crypto.randomUUID(),
    caseNo,
    status: "待確認",
    createdAt: now.toISOString(),
    customer: {
      companyName: formData.companyName,
      taxId: formData.taxId,
      contactName: formData.contactName,
      email: formData.email,
      address: formData.address,
    },
    sample: {
      sampleName: formData.sampleName,
      sampleQty: formData.sampleQty,
      material: formData.material,
      reportLang: formData.reportLang,
      notes: formData.notes,
    },
    estimate,
  };
}

function submitQuote(event) {
  event.preventDefault();
  const estimate = calculateEstimate();
  if (estimate.items.length === 0) {
    alert("請至少選擇一個檢測項目。");
    return;
  }

  const newCase = createCase(readForm(event.currentTarget), estimate);
  state.cases.unshift(newCase);
  state.activeCase = newCase;
  saveState();
  renderCases();
  renderKanban();
  openDocuments(newCase);
}

function renderCases() {
  const list = $("#caseList");
  if (!state.cases.length) {
    list.innerHTML = `<p class="fine-print">目前尚無案件，請先建立一筆詢價。</p>`;
    return;
  }

  list.innerHTML = state.cases
    .map(
      (item) => `
      <article class="case-card">
        <div>
          <h4>${item.caseNo}｜${item.sample.sampleName}</h4>
          <p>${item.customer.companyName}｜${new Date(item.createdAt).toLocaleDateString("zh-TW")}｜${
        item.estimate.items.length
      } 個檢測項目｜${money(item.estimate.total)}</p>
        </div>
        <div>
          <span class="status">${item.status}</span>
          <button class="ghost-button" type="button" data-open-case="${item.id}">文件</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderKanban() {
  const kanban = $("#kanban");
  const cases = state.cases.length ? state.cases : [];
  kanban.innerHTML =
    cases
      .map(
        (item) => `
        <article class="case-card">
          <div>
            <h4>${item.caseNo}</h4>
            <p>${item.customer.companyName}｜${item.sample.sampleName}</p>
            <p>應產生：申請書、報價單、內部簽呈</p>
          </div>
          <div>
            <span class="status">${item.status}</span>
            <button class="ghost-button" type="button" data-open-case="${item.id}">查看</button>
          </div>
        </article>
      `
      )
      .join("") || `<p class="fine-print">尚無案件。</p>`;
}

function itemRows(caseData) {
  return caseData.estimate.items
    .map(
      (item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.method}</td>
        <td>${item.days} 工作天</td>
        <td>${money(item.price)}</td>
      </tr>
    `
    )
    .join("");
}

function buildDocument(caseData, type) {
  const date = new Date(caseData.createdAt).toLocaleDateString("zh-TW");
  const { customer, sample, estimate } = caseData;

  if (type === "application") {
    return `
      <h2>紙張適性檢測申請書</h2>
      <table class="doc-table">
        <tr><th>申請編號</th><td>${caseData.caseNo}</td><th>申請日期</th><td>${date}</td></tr>
        <tr><th>公司名稱</th><td>${customer.companyName}</td><th>統一編號</th><td>${customer.taxId}</td></tr>
        <tr><th>聯絡人</th><td>${customer.contactName}</td><th>Email</th><td>${customer.email}</td></tr>
        <tr><th>公司地址</th><td colspan="3">${customer.address}</td></tr>
        <tr><th>樣品名稱</th><td>${sample.sampleName}</td><th>樣品數量</th><td>${sample.sampleQty}</td></tr>
        <tr><th>材質/規格</th><td>${sample.material}</td><th>報告語言</th><td>${sample.reportLang}</td></tr>
        <tr><th>備註</th><td colspan="3">${sample.notes || "無"}</td></tr>
      </table>
      <table class="doc-table">
        <thead><tr><th>項次</th><th>檢測項目</th><th>標準方法</th><th>工作天</th><th>單價</th></tr></thead>
        <tbody>${itemRows(caseData)}</tbody>
      </table>
      <p>本申請書由系統依客戶填寫資料產生，實際檢測條件仍以印研中心確認後為準。</p>
      <div class="signature-row">
        <div class="signature-box">申請單位簽章：</div>
        <div class="signature-box">印研中心承辦：</div>
      </div>
    `;
  }

  if (type === "quote") {
    return `
      <h2>印研中心檢測報價單</h2>
      <table class="doc-table">
        <tr><th>報價編號</th><td>${caseData.caseNo}</td><th>報價日期</th><td>${date}</td></tr>
        <tr><th>客戶名稱</th><td>${customer.companyName}</td><th>聯絡人</th><td>${customer.contactName}</td></tr>
        <tr><th>Email</th><td>${customer.email}</td><th>報告語言</th><td>${sample.reportLang}</td></tr>
      </table>
      <table class="doc-table">
        <thead><tr><th>項次</th><th>檢測項目</th><th>檢測方法</th><th>工作天</th><th>金額</th></tr></thead>
        <tbody>${itemRows(caseData)}</tbody>
        <tfoot>
          <tr><th colspan="4">小計</th><td>${money(estimate.subtotal)}</td></tr>
          <tr><th colspan="4">急件加成</th><td>${money(estimate.urgent)}</td></tr>
          <tr><th colspan="4">營業稅 5%</th><td>${money(estimate.tax)}</td></tr>
          <tr><th colspan="4">總計</th><td><strong>${money(estimate.total)}</strong></td></tr>
        </tfoot>
      </table>
      <p>本報價單為系統預估版本，正式報價以印研中心確認後之文件為準。</p>
      <div class="signature-row">
        <div class="signature-box">客戶簽名/蓋章：</div>
        <div class="signature-box">印研中心核章：</div>
      </div>
    `;
  }

  return `
    <h2>檢測報告簽呈</h2>
    <table class="doc-table">
      <tr><th>案件編號</th><td>${caseData.caseNo}</td><th>簽呈日期</th><td>${date}</td></tr>
      <tr><th>受測廠商</th><td>${customer.companyName}</td><th>統一編號</th><td>${customer.taxId}</td></tr>
      <tr><th>樣品名稱</th><td>${sample.sampleName}</td><th>預估金額</th><td>${money(estimate.total)}</td></tr>
      <tr><th>承辦建議</th><td colspan="3">同意受理本案，待客戶回簽申請書與報價單後開案。</td></tr>
    </table>
    <table class="doc-table">
      <thead><tr><th>項次</th><th>檢測項目</th><th>方法</th><th>工作天</th><th>金額</th></tr></thead>
      <tbody>${itemRows(caseData)}</tbody>
    </table>
    <div class="signature-row">
      <div class="signature-box">承辦人：</div>
      <div class="signature-box">主管核示：</div>
    </div>
  `;
}

function openDocuments(caseData) {
  state.activeCase = caseData;
  state.selectedDoc = "application";
  $("#dialogTitle").textContent = `${caseData.caseNo} 文件預覽`;
  renderDocumentPreview();
  $("#documentDialog").showModal();
}

function renderDocumentPreview() {
  $$(".doc-tab").forEach((tab) =>
    tab.classList.toggle("active", tab.dataset.doc === state.selectedDoc)
  );
  $("#documentPreview").innerHTML = buildDocument(state.activeCase, state.selectedDoc);
}

function downloadCurrentHtml() {
  const content = `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>${state.activeCase.caseNo}</title><style>${document
    .querySelector("style")
    ?.textContent || ""}</style><body>${$("#documentPreview").outerHTML}</body></html>`;
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${state.activeCase.caseNo}_${state.selectedDoc}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.user = readForm(event.currentTarget);
    saveState();
    syncAccountUi();
    setView("quote");
  });

  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.user = readForm(event.currentTarget);
    saveState();
    syncAccountUi();
    alert("帳戶資料已更新。");
  });

  $("#quoteForm").addEventListener("input", calculateEstimate);
  $("#quoteForm").addEventListener("change", calculateEstimate);
  $("#quoteForm").addEventListener("submit", submitQuote);

  document.body.addEventListener("click", (event) => {
    const openCaseId = event.target.dataset.openCase;
    if (openCaseId) {
      const caseData = state.cases.find((item) => item.id === openCaseId);
      if (caseData) openDocuments(caseData);
    }
  });

  $$(".doc-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.selectedDoc = tab.dataset.doc;
      renderDocumentPreview();
    });
  });

  $("#closeDialogBtn").addEventListener("click", () => $("#documentDialog").close());
  $("#printDocBtn").addEventListener("click", () => window.print());
  $("#downloadHtmlBtn").addEventListener("click", downloadCurrentHtml);

  $("#resetDemoBtn").addEventListener("click", () => {
    if (!confirm("確定要清除 demo 資料？")) return;
    localStorage.removeItem("ptri_user");
    localStorage.removeItem("ptri_cases");
    state.user = null;
    state.cases = [];
    syncAccountUi();
    setView("login");
  });
}

function init() {
  renderTests();
  bindEvents();
  syncAccountUi();
  calculateEstimate();
  setView(state.user ? "quote" : "login");
}

init();
