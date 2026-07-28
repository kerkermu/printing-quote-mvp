const categories = [
  { id: "paper", serviceType: "paper", name: "紙張適性檢測" },
  { id: "offset-ink", serviceType: "ink", name: "平版油墨基本特性" },
  { id: "printed-ink", serviceType: "ink", name: "印刷成品印墨適性" },
  { id: "fountain", serviceType: "ink", name: "平版印刷水槽液" },
  { id: "other", serviceType: "ink", name: "其他服務" },
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
  previewPdfUrl: null,
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
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.attachments = formData.getAll("attachments");
  return data;
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
    invoiceAddress: state.user.invoiceAddress || state.user.address,
    phone: state.user.phone || "",
    fax: state.user.fax || "",
    mobile: state.user.mobile || "",
    jobTitle: state.user.jobTitle || "",
  });
}

function fillProfileForm() {
  if (state.user) fillForm($("#profileForm"), state.user);
}

function renderCategoryFilter() {
  const serviceType = $("#serviceType")?.value || "paper";
  const availableCategories = categories.filter((category) => category.serviceType === serviceType);
  $("#categoryFilter").innerHTML = availableCategories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
}

function renderTests() {
  const category = $("#categoryFilter")?.value || "all";
  const serviceType = $("#serviceType")?.value || "paper";
  const allowedCategories = categories
    .filter((item) => item.serviceType === serviceType)
    .map((item) => item.id);
  const visibleItems = testItems.filter(
    (item) => allowedCategories.includes(item.category) && item.category === category
  );

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
  const extraChineseReports = Number($("#quoteForm").elements.extraChineseReports.value || 0);
  const englishReports = Number($("#quoteForm").elements.englishReports.value || 0);
  const reportFee = extraChineseReports * 100 + englishReports * 200;
  const urgentBase = subtotal + reportFee;
  const caseType = $("#quoteForm").elements.caseType.value || "一般件";
  const rushMultiplier = caseType === "急件" ? 1.5 : caseType === "特急件" ? 2 : 1;
  const rushFee = Math.round(urgentBase * (rushMultiplier - 1));
  const tax = 0;
  const total = subtotal + reportFee + rushFee;

  $("#subtotalText").textContent =
    minimumAdjustment > 0 ? `${money(subtotal)}（含最低計費）` : money(subtotal);
  $("#reportFeeText").textContent = money(reportFee);
  $("#urgentText").textContent = rushFee ? `${money(rushFee)}（${caseType}）` : money(0);
  $("#taxText").textContent = "單價已含稅";
  $("#totalText").textContent = money(total);

  return {
    rawSubtotal,
    minimumAdjustment,
    subtotal,
    extraChineseReports,
    englishReports,
    reportFee,
    urgent: rushFee,
    caseType,
    rushMultiplier,
    tax,
    total,
    items,
  };
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
    serviceType: formData.serviceType,
    createdAt: now.toISOString(),
    customer: {
      companyName: formData.companyName,
      taxId: formData.taxId,
      contactName: formData.contactName,
      email: formData.email,
      address: formData.address,
      invoiceAddress: formData.invoiceAddress,
      phone: formData.phone || state.user?.phone || "",
      fax: formData.fax || state.user?.fax || "",
      mobile: formData.mobile || state.user?.mobile || "",
      jobTitle: formData.jobTitle || state.user?.jobTitle || "",
    },
    sample: {
      sampleName: formData.sampleName,
      sampleQty: formData.sampleQty,
      material: formData.material,
      reportLang: Number(formData.englishReports || 0) > 0 ? "中英文" : "中文",
      extraChineseReports: Number(formData.extraChineseReports || 0),
      englishReports: Number(formData.englishReports || 0),
      sampleReturn: formData.sampleReturn,
      reportDelivery: formData.reportDelivery,
      caseType: formData.caseType,
      isFirstApplication: formData.isFirstApplication,
      attachments: formData.attachments || [],
      attachmentOther: formData.attachmentOther || "",
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
  const formData = readForm(event.currentTarget);
  if (formData.isFirstApplication === "yes" && formData.attachments.length === 0) {
    alert("首次申請檢測廠商須至少勾選一項檢附證件。");
    return;
  }

  const newCase = createCase(formData, estimate);
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

function checkedBox(isChecked, label) {
  return `${isChecked ? "■" : "□"} ${label}`;
}

function hasSelected(caseData, itemId) {
  return caseData.estimate.items.some((item) => item.id === itemId);
}

function selectedCategory(caseData) {
  if (caseData.serviceType) return caseData.serviceType;
  const selected = new Set(caseData.estimate.items.map((item) => item.category));
  return selected.size === 1 && selected.has("paper") ? "paper" : "ink";
}

function selectedItemsByCategory(caseData, category) {
  return caseData.estimate.items.filter((item) => item.category === category);
}

function officialItemList(caseData, category) {
  const items = selectedItemsByCategory(caseData, category);
  if (!items.length) return "□ 無";
  return items.map((item) => `■ ${item.name}`).join("<br>");
}

function buildOfficialApplication(caseData) {
  const date = new Date(caseData.createdAt).toLocaleDateString("zh-TW");
  const { customer, sample, estimate } = caseData;
  const formType = selectedCategory(caseData);
  const title = formType === "paper" ? "紙張檢測申請書" : "印刷品及油墨檢測申請書";
  const templateName =
    formType === "paper" ? "紙張適性檢測申請書_11406.docx" : "印刷品及油墨適性檢測申請書_11406.docx";
  const reportLang = sample.reportLang || "中文";
  const chineseReportCount = 1 + Number(sample.extraChineseReports || 0);
  const englishReportCount = Number(sample.englishReports || 0);
  const isPaper = formType === "paper";

  const paperRows = `
    <tr>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-weight"), "1. 基重")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-folding"), "7. 耐折度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-smoothness"), "13. 平滑度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-curl"), "19. 捲曲度")}</td>
    </tr>
    <tr>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-thickness"), "2. 厚度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-roughness"), "8. 粗糙度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-water-resistance"), "14. 抗水度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-absorbency"), "20. 吸水性")}</td>
    </tr>
    <tr>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-moisture"), "3. 水分")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-air"), "9. 透氣度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-tear"), "15. 撕裂強度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-ink-absorbency"), "21. 吸墨性")}</td>
    </tr>
    <tr>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-whiteness"), "4. 白度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-burst"), "10. 破裂強度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-tensile"), "16. 抗張強度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-internal-bond"), "22. 層間強度")}</td>
    </tr>
    <tr>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-gloss"), "5. 光澤度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-stiffness"), "11. 挺度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-wax-pick"), "17. 表面強度蠟棒")}</td>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-color"), "6. 色度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-opacity"), "12. 不透明度")}</td>
      <td colspan="2">${checkedBox(hasSelected(caseData, "paper-igt"), "18. 表面強度 IGT")}</td>
      <td colspan="2"></td>
    </tr>
  `;

  const inkRows = `
    <tr>
      <th colspan="2">（一）平板油墨檢測</th>
      <th colspan="2">（二）印刷成品之印墨適性檢測</th>
      <th colspan="2">（三）水槽液檢測</th>
      <th colspan="2">其他服務</th>
    </tr>
    <tr>
      <td colspan="2">${officialItemList(caseData, "offset-ink")}</td>
      <td colspan="2">${officialItemList(caseData, "printed-ink")}</td>
      <td colspan="2">${officialItemList(caseData, "fountain")}</td>
      <td colspan="2">${officialItemList(caseData, "other")}</td>
    </tr>
  `;

  return `
    <section class="official-output-notice">
      <div class="notice-main">
        <p class="eyebrow">Official Word Template</p>
        <h2>${title}</h2>
        <p>
          正式送給客戶簽名蓋章的申請書，會使用原始 Word 模板
          <strong>${templateName}</strong>
          套入資料產生，版面、表格、字型與頁面設定不會由網頁重新排版。
        </p>
      </div>
      <div class="template-card">
        <span>套用模板</span>
        <strong>${templateName}</strong>
      </div>
    </section>

    <section class="official-data-review">
      <h3>將帶入正式申請書的資料</h3>
      <table class="doc-table">
        <tr><th>廠商名稱</th><td>${customer.companyName}</td><th>申請日期</th><td>${date}</td></tr>
        <tr><th>發票地址</th><td>${customer.invoiceAddress || customer.address}</td><th>統一編號</th><td>${customer.taxId}</td></tr>
        <tr><th>公司地址</th><td>${customer.address}</td><th>聯絡人</th><td>${customer.contactName}</td></tr>
        <tr><th>電子郵件</th><td>${customer.email}</td><th>職稱</th><td>${customer.jobTitle || ""}</td></tr>
        <tr><th>電話</th><td>${customer.phone || ""}</td><th>傳真</th><td>${customer.fax || ""}</td></tr>
        <tr><th>行動電話</th><td>${customer.mobile || ""}</td><th></th><td></td></tr>
        <tr><th>測試件名稱</th><td>${sample.sampleName}</td><th>測試件數量</th><td>${sample.sampleQty}</td></tr>
        <tr><th>測試件描述</th><td colspan="3">${sample.material || sample.notes || ""}</td></tr>
        <tr><th>剩餘測試件處理</th><td>${sample.sampleReturn || ""}</td><th>報告取件方式</th><td>${sample.reportDelivery || ""}</td></tr>
        <tr><th>案件類型</th><td>${sample.caseType || "一般件"}</td><th>首次申請</th><td>${sample.isFirstApplication === "yes" ? "是" : "否"}</td></tr>
        <tr><th>檢附證件</th><td colspan="3">${[
          ...(sample.attachments || []),
          sample.attachmentOther ? `其他：${sample.attachmentOther}` : "",
        ]
          .filter(Boolean)
          .join("、") || "非首次申請免附"}</td></tr>
        <tr><th>報告份數</th><td>中文 ${chineseReportCount} 份，英文 ${englishReportCount} 份</td><th>含稅總額</th><td>${money(estimate.total)}</td></tr>
      </table>
    </section>

    <section class="official-selection-review">
      <h3>將於官方模板中勾選的項目</h3>
      <table class="doc-table">
        ${
          isPaper
            ? `<tr><th colspan="4">紙張檢測申請項目</th></tr>${paperRows}`
            : inkRows
        }
      </table>
      <p class="fine-print">
        這裡只顯示將帶入模板的資料與勾選結果，避免客戶誤認網頁預覽就是正式申請書。正式文件請以下載產生的 Word / PDF 為準。
      </p>
    </section>
  `;
}

function buildDocument(caseData, type) {
  const date = new Date(caseData.createdAt).toLocaleDateString("zh-TW");
  const { customer, sample, estimate } = caseData;

  if (type === "application") {
    return buildOfficialApplication(caseData);
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
          <tr><th colspan="4">檢測費用小計（含稅）</th><td>${money(estimate.subtotal)}</td></tr>
          <tr><th colspan="4">報告加購</th><td>${money(estimate.reportFee || 0)}</td></tr>
          <tr><th colspan="4">急件加成</th><td>${money(estimate.urgent)}</td></tr>
          <tr><th colspan="4">含稅總計</th><td><strong>${money(estimate.total)}</strong></td></tr>
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
  $("#downloadOfficialDocxBtn").textContent =
    state.selectedDoc === "quote" ? "下載正式報價單 Word" : "下載正式申請書 Word";
  if (state.selectedDoc === "application" || state.selectedDoc === "quote") {
    renderOfficialPdfPreview(state.selectedDoc);
    return;
  }
  releasePreviewPdfUrl();
  $("#documentPreview").innerHTML = buildDocument(state.activeCase, state.selectedDoc);
}

function releasePreviewPdfUrl() {
  if (!state.previewPdfUrl) return;
  URL.revokeObjectURL(state.previewPdfUrl);
  state.previewPdfUrl = null;
}

async function renderOfficialPdfPreview(docType) {
  const preview = $("#documentPreview");
  releasePreviewPdfUrl();
  const isQuote = docType === "quote";
  const label = isQuote ? "正式報價單" : "正式申請書";
  const endpoint = isQuote ? "/api/preview-quote" : "/api/preview-application";

  if (window.location.protocol === "file:") {
    preview.innerHTML = buildDocument(state.activeCase, docType);
    return;
  }

  preview.innerHTML = `
    <div class="pdf-loading">
      <strong>正在產生${label}預覽</strong>
      <span>系統會先套用官方 Word 模板，再轉成 PDF 顯示。</span>
    </div>
  `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.activeCase),
    });

    if (!response.ok) {
      let message = `無法產生${label}預覽。`;
      try {
        const error = await response.json();
        message = error.error || message;
      } catch {
        // Keep generic message when the response is not JSON.
      }
      throw new Error(message);
    }

    const blob = await response.blob();
    state.previewPdfUrl = URL.createObjectURL(blob);
    preview.innerHTML = `
      <iframe
        class="pdf-preview-frame"
        title="${label} PDF 預覽"
        src="${state.previewPdfUrl}"
      ></iframe>
    `;
  } catch (error) {
    preview.innerHTML = `
      <div class="pdf-error">
        <strong>${label}預覽暫時無法顯示</strong>
        <span>${error.message}</span>
        <span>仍可使用下方按鈕下載${label} Word。</span>
      </div>
      ${buildDocument(state.activeCase, docType)}
    `;
  }
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

async function downloadOfficialDocx() {
  if (!state.activeCase) return;
  const isQuote = state.selectedDoc === "quote";
  const endpoint = isQuote ? "/api/generate-quote" : "/api/generate-application";
  const label = isQuote ? "報價單" : "申請書";
  if (window.location.protocol === "file:") {
    alert(`正式 Word ${label}需要從本機後端開啟。請使用 http://127.0.0.1:8765/ 進入系統。`);
    return;
  }

  const button = $("#downloadOfficialDocxBtn");
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "產生中...";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.activeCase),
    });

    if (!response.ok) {
      let message = `產生正式${label}失敗。`;
      try {
        const error = await response.json();
        message = error.error || message;
      } catch {
        // Keep generic message when the response is not JSON.
      }
      throw new Error(message);
    }

    const blob = await response.blob();
    const disposition = response.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename\*=UTF-8''(.+)$/);
    const filename = match
      ? decodeURIComponent(match[1])
      : `${state.activeCase.caseNo}_${label}.docx`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
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
  $("#serviceType").addEventListener("change", () => {
    renderCategoryFilter();
    renderTests();
    calculateEstimate();
  });
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

  $("#closeDialogBtn").addEventListener("click", () => {
    releasePreviewPdfUrl();
    $("#documentDialog").close();
  });
  $("#printDocBtn").addEventListener("click", () => window.print());
  $("#downloadHtmlBtn").addEventListener("click", downloadCurrentHtml);
  $("#downloadOfficialDocxBtn").addEventListener("click", downloadOfficialDocx);

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
