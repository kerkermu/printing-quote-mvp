const categories = [
  { id: "all", name: "全部檢測項目" },
  { id: "paper", name: "紙張適性檢測" },
  { id: "offset-ink", name: "平版油墨基本特性" },
  { id: "printed-ink", name: "印刷成品印墨適性" },
  { id: "fountain", name: "平版印刷水槽液" },
  { id: "other", name: "其他服務" },
];

const testItems = [
  ["paper-weight", "paper", "基重", "紙張適性檢測", 600, "元 / 每件"],
  ["paper-thickness", "paper", "厚度", "紙張適性檢測", 600, "元 / 每件"],
  ["paper-moisture", "paper", "水分", "紙張適性檢測", 800, "元 / 每件"],
  ["paper-whiteness", "paper", "白度", "紙張適性檢測", 900, "元 / 每件"],
  ["paper-gloss", "paper", "光澤度", "紙張適性檢測", 900, "元 / 每件"],
  ["paper-color", "paper", "色度", "紙張適性檢測", 900, "元 / 每件"],
  ["paper-folding", "paper", "耐折度", "紙張適性檢測", 1000, "元 / 每件"],
  ["paper-roughness", "paper", "粗糙度", "紙張適性檢測", 1000, "元 / 每件"],
  ["paper-air", "paper", "透氣度", "紙張適性檢測", 1000, "元 / 每件"],
  ["paper-burst", "paper", "破裂強度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-stiffness", "paper", "挺度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-opacity", "paper", "不透明度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-smoothness", "paper", "平滑度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-water-resistance", "paper", "抗水度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-tear", "paper", "撕裂強度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-tensile", "paper", "抗張強度", "紙張適性檢測", 1100, "元 / 每件"],
  ["paper-wax-pick", "paper", "表面強度蠟棒", "紙張適性檢測", 1300, "元 / 每件"],
  ["paper-igt", "paper", "表面強度 IGT", "紙張適性檢測", 1300, "元 / 每件"],
  ["paper-curl", "paper", "捲曲度", "紙張適性檢測", 1500, "元 / 每件"],
  ["paper-absorbency", "paper", "吸水性", "紙張適性檢測", 1500, "元 / 每件"],
  ["paper-ink-absorbency", "paper", "吸墨性", "紙張適性檢測", 1500, "元 / 每件"],
  ["paper-internal-bond", "paper", "層間強度", "紙張適性檢測", 1500, "元 / 每件"],

  ["ink-particle-general", "offset-ink", "粒度（一般油墨）", "平版油墨基本特性", 300, "元 / 色"],
  ["ink-particle-special", "offset-ink", "粒度（特殊油墨）", "平版油墨基本特性", 350, "元 / 色"],
  ["ink-viscosity-general", "offset-ink", "粘度（一般油墨）", "平版油墨基本特性", 600, "元 / 色"],
  ["ink-viscosity-special", "offset-ink", "粘度（特殊油墨）", "平版油墨基本特性", 650, "元 / 色"],
  ["ink-emulsification-general", "offset-ink", "乳化率（一般油墨）", "平版油墨基本特性", 400, "元 / 色"],
  ["ink-emulsification-special", "offset-ink", "乳化率（特殊油墨）", "平版油墨基本特性", 500, "元 / 色"],
  ["ink-ph-general", "offset-ink", "溶出 pH 值（一般油墨）", "平版油墨基本特性", 400, "元 / 色"],
  ["ink-ph-special", "offset-ink", "溶出 pH 值（特殊油墨）", "平版油墨基本特性", 500, "元 / 色"],
  ["ink-color-strength-general", "offset-ink", "色強度（一般油墨）", "平版油墨基本特性", 300, "元 / 色"],
  ["ink-color-strength-special", "offset-ink", "色強度（特殊油墨）", "平版油墨基本特性", 350, "元 / 色"],
  ["ink-split-general", "offset-ink", "抗分裂力（一般油墨）", "平版油墨基本特性", 400, "元 / 色"],
  ["ink-split-special", "offset-ink", "抗分裂力（特殊油墨）", "平版油墨基本特性", 500, "元 / 色"],

  ["printed-heat-general", "printed-ink", "耐高溫（一般油墨）", "印刷成品印墨適性", 200, "元 / 色"],
  ["printed-heat-special", "printed-ink", "耐高溫（特殊油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-humidity-general", "printed-ink", "耐高濕（一般油墨）", "印刷成品印墨適性", 200, "元 / 色"],
  ["printed-humidity-special", "printed-ink", "耐高濕（特殊油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-pressure-general", "printed-ink", "耐高壓（一般油墨）", "印刷成品印墨適性", 200, "元 / 色"],
  ["printed-pressure-special", "printed-ink", "耐高壓（特殊油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-light-general", "printed-ink", "耐光性（一般油墨）", "印刷成品印墨適性", 60, "元 / HR"],
  ["printed-light-special", "printed-ink", "耐光性（特殊油墨）", "印刷成品印墨適性", 65, "元 / HR"],
  ["printed-weather-general", "printed-ink", "耐候性（一般油墨）", "印刷成品印墨適性", 150, "元 / HR"],
  ["printed-weather-special", "printed-ink", "耐候性（特殊油墨）", "印刷成品印墨適性", 160, "元 / HR"],
  ["printed-chemical-general", "printed-ink", "耐化學藥品（一般油墨）", "印刷成品印墨適性", 500, "元 / 色"],
  ["printed-chemical-special", "printed-ink", "耐化學藥品（特殊油墨）", "印刷成品印墨適性", 550, "元 / 色"],
  ["printed-density-general", "printed-ink", "濃度測試（一般油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-density-special", "printed-ink", "濃度測試（特殊油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-color-general", "printed-ink", "色度測試（一般油墨）", "印刷成品印墨適性", 900, "元 / 色"],
  ["printed-color-special", "printed-ink", "色度測試（特殊油墨）", "印刷成品印墨適性", 900, "元 / 色"],
  ["printed-oil-general", "printed-ink", "耐油性（一般油墨）", "印刷成品印墨適性", 500, "元 / 色"],
  ["printed-oil-special", "printed-ink", "耐油性（特殊油墨）", "印刷成品印墨適性", 550, "元 / 色"],
  ["printed-film-general", "printed-ink", "膜厚測試（一般油墨）", "印刷成品印墨適性", 200, "元 / 色"],
  ["printed-film-special", "printed-ink", "膜厚測試（特殊油墨）", "印刷成品印墨適性", 300, "元 / 色"],
  ["printed-adhesion-general", "printed-ink", "密著性測試（一般油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-adhesion-special", "printed-ink", "密著性測試（特殊油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-hardness-general", "printed-ink", "墨膜硬度（一般油墨）", "印刷成品印墨適性", 250, "元 / 色"],
  ["printed-hardness-special", "printed-ink", "墨膜硬度（特殊油墨）", "印刷成品印墨適性", 250, "元 / 色"],

  ["fountain-ph", "fountain", "pH 值", "平版印刷水槽液檢測", 500, "元 / 每件"],
  ["fountain-hardness", "fountain", "硬度", "平版印刷水槽液檢測", 500, "元 / 每件"],
  ["fountain-conductivity", "fountain", "電導度", "平版印刷水槽液檢測", 500, "元 / 每件"],
  ["fountain-alcohol", "fountain", "酒精（異丙醇）濃度", "平版印刷水槽液檢測", 500, "元 / 每件"],

  ["other-drying", "other", "平板油墨乾燥時間檢驗", "其他服務", 600, "元 / 色"],
  ["other-gamut", "other", "平板油墨六角形、圖形色域圖繪製", "其他服務", 1500, "元 / 張"],
  ["other-igt-general", "other", "IGT 展色（一般墨）", "其他服務", 350, "元 / 條"],
  ["other-igt-special", "other", "IGT 展色（特殊墨）", "其他服務", 450, "元 / 條"],
  ["other-uv-drying", "other", "UV 油墨乾燥", "其他服務", 100, "元 / 條"],
  ["other-profile", "other", "印表機或印刷機 PROFILE 建立", "其他服務", 3000, "元 / 次"],
  ["other-rub", "other", "印刷品耐磨擦特性檢驗", "其他服務", 600, "元 / 張"],
  ["other-gloss", "other", "印刷品光澤度測試", "其他服務", 900, "元 / 次"],
  ["other-cross-cut", "other", "百格測試", "其他服務", 600, "元 / 次"],
  ["other-opacity", "other", "油墨遮蔽率測試", "其他服務", 600, "元 / 色"],
  ["other-surface-tension", "other", "表面張力測試", "其他服務", 300, "元 / 張"],
  ["other-display-calibration", "other", "螢幕量測校正", "其他服務", 2000, "元 / 次"],
  ["other-display-calibration-onsite", "other", "螢幕量測校正（赴廠）", "其他服務", 3000, "元 / 次"],
].map(([id, category, name, method, price, unit]) => ({
  id,
  category,
  name,
  method,
  price,
  unit,
  days: 14,
}));

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

function renderCategoryFilter() {
  $("#categoryFilter").innerHTML = categories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
}

function renderTests() {
  const category = $("#categoryFilter")?.value || "all";
  const visibleItems =
    category === "all" ? testItems : testItems.filter((item) => item.category === category);

  $("#testList").innerHTML = visibleItems
    .map(
      (item) => `
      <label class="test-item">
        <input type="checkbox" name="tests" value="${item.id}" />
        <span>
          <h4>${item.name}</h4>
          <p>${item.method}｜${item.unit}｜一般件約 ${item.days} 工作天</p>
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
  const rawSubtotal = items.reduce((sum, item) => sum + item.price, 0);
  const minimumAdjustment = rawSubtotal > 0 && rawSubtotal < 2500 ? 2500 - rawSubtotal : 0;
  const subtotal = rawSubtotal + minimumAdjustment;
  const urgent = $("#quoteForm").elements.urgent.checked ? Math.round(subtotal * 0.5) : 0;
  const tax = Math.round((subtotal + urgent) * 0.05);
  const total = subtotal + urgent + tax;

  $("#subtotalText").textContent =
    minimumAdjustment > 0 ? `${money(subtotal)}（含最低計費）` : money(subtotal);
  $("#urgentText").textContent = money(urgent);
  $("#taxText").textContent = money(tax);
  $("#totalText").textContent = money(total);

  return { rawSubtotal, minimumAdjustment, subtotal, urgent, tax, total, items };
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
        <td>${money(item.price)} / ${item.unit.replace("元 / ", "")}</td>
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
  $("#categoryFilter").addEventListener("change", () => {
    renderTests();
    calculateEstimate();
  });

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
  renderCategoryFilter();
  renderTests();
  bindEvents();
  syncAccountUi();
  calculateEstimate();
  setView(state.user ? "quote" : "login");
}

init();
