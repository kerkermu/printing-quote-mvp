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

const demoUser = {
  email: "ken.ding@msa.hinet.net",
  companyName: "肯定實業股份有限公司",
  taxId: "86106811",
  contactName: "洪昭治",
  phone: "02-82457355 #200",
  mobile: "0922451707",
  jobTitle: "",
  address: "新北市中和區連城路160號後棟",
  invoiceAddress: "新北市中和區連城路160號後棟",
  fax: "02-82457320",
};

const defaultTestIds = new Set(["paper-weight", "paper-whiteness", "paper-opacity"]);
const casesResetVersion = "20260729-clear-cases-v5";
const caseStatuses = [
  "待報價確認",
  "報價已確認",
  "報價單已寄出",
  "已回傳",
  "已確認",
  "缺件",
  "待付款",
  "已收款",
  "檢測中",
  "報告完成",
  "已結案",
];
const uploadReadyStatuses = new Set(["報價單已寄出", "已回傳", "已確認", "缺件"]);
const paymentStatuses = ["未確認", "未開發票未付款", "未開發票已付款", "已開發票未付款", "已開發票已付款", "確認中"];
const internalSteps = [
  "收到申請書",
  "寄出報價單",
  "廠商回簽報價單",
  "製作申請簽呈",
  "送出申請簽呈",
  "完成申請簽呈",
  "建立檢測細目",
  "寄送測試報告",
];
const statusStepMap = {
  待報價確認: ["收到申請書"],
  報價已確認: ["收到申請書"],
  報價單已寄出: ["收到申請書", "寄出報價單"],
  已回傳: ["收到申請書", "寄出報價單", "廠商回簽報價單"],
  已確認: ["收到申請書", "寄出報價單", "廠商回簽報價單"],
  待付款: ["收到申請書", "寄出報價單", "廠商回簽報價單"],
  已收款: ["收到申請書", "寄出報價單", "廠商回簽報價單"],
  檢測中: ["收到申請書", "寄出報價單", "廠商回簽報價單", "製作申請簽呈", "送出申請簽呈", "完成申請簽呈", "建立檢測細目"],
  報告完成: ["收到申請書", "寄出報價單", "廠商回簽報價單", "製作申請簽呈", "送出申請簽呈", "完成申請簽呈", "建立檢測細目", "寄送測試報告"],
  已結案: ["收到申請書", "寄出報價單", "廠商回簽報價單", "製作申請簽呈", "送出申請簽呈", "完成申請簽呈", "建立檢測細目", "寄送測試報告"],
};

if (localStorage.getItem("ptri_cases_reset_version") !== casesResetVersion) {
  localStorage.setItem("ptri_cases", "[]");
  localStorage.setItem("ptri_cases_reset_version", casesResetVersion);
}

const state = {
  user: JSON.parse(localStorage.getItem("ptri_user") || JSON.stringify(demoUser)),
  cases: JSON.parse(localStorage.getItem("ptri_cases") || "[]"),
  activeCase: null,
};

if (state.user?.email === "customer@example.com" || state.user?.companyName === demoUser.companyName) {
  state.user = { ...demoUser };
  localStorage.setItem("ptri_user", JSON.stringify(state.user));
}

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

function markInternalStep(caseData, stepName, done = true) {
  const internalCase = ensureInternalCase(caseData);
  const step = internalCase.internal.steps.find((item) => item.name === stepName);
  if (!step || step.done === done) return;
  step.done = done;
  step.completedAt = done ? new Date().toISOString() : "";
}

function syncCaseStepsFromStatus(caseData) {
  const steps = statusStepMap[caseData.status] || [];
  steps.forEach((stepName) => markInternalStep(caseData, stepName));
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
    submission: "簽章文件繳交專區",
    admin: "內部後台",
    settings: "帳戶資料",
  };
  $("#viewTitle").textContent = titles[viewName] || "檢測線上報價";

  if (viewName === "cases") renderCases();
  if (viewName === "submission") renderSubmission();
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

function markRequiredFields() {
  const form = $("#quoteForm");
  form.querySelectorAll("[required]").forEach((input) => {
    const label = input.closest("label");
    if (!label || label.querySelector(".required-mark")) return;
    const title = document.createElement("span");
    title.className = "field-label-text";
    const mark = document.createElement("span");
    mark.className = "required-mark";
    mark.textContent = "*";

    let node = label.firstChild;
    while (node && node !== input) {
      const next = node.nextSibling;
      title.appendChild(node);
      node = next;
    }
    title.appendChild(mark);
    label.insertBefore(title, input);
  });
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

  $$('input[name="tests"]').forEach((input) => {
    input.checked = defaultTestIds.has(input.value);
  });
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

function requiredFieldRules() {
  return [
    ["companyName", "廠商名稱"],
    ["taxId", "統一編號"],
    ["contactName", "聯絡人"],
    ["email", "電子郵件"],
    ["phone", "電話"],
    ["address", "公司地址"],
    ["invoiceAddress", "發票地址"],
    ["sampleName", "測試件名稱"],
    ["sampleQty", "測試件數量"],
    ["material", "測試件描述"],
    ["sampleReturn", "剩餘測試件處理"],
    ["reportDelivery", "報告取件方式"],
    ["caseType", "檢測案件類型"],
    ["isFirstApplication", "是否首次申請"],
    ["serviceType", "檢測類型"],
    ["categoryFilter", "檢測類別"],
  ];
}

function clearValidationState(form) {
  $$("[aria-invalid='true']").forEach((input) => input.removeAttribute("aria-invalid"));
  form.querySelector(".form-error-summary")?.remove();
}

function markInvalid(input) {
  if (!input) return;
  input.setAttribute("aria-invalid", "true");
}

function showValidationErrors(form, messages, firstInvalidInput) {
  clearValidationState(form);
  const summary = document.createElement("div");
  summary.className = "form-error-summary";
  summary.innerHTML = `
    <strong>請先補齊必填欄位</strong>
    <ul>${messages.map((message) => `<li>${message}</li>`).join("")}</ul>
  `;
  form.prepend(summary);
  firstInvalidInput?.scrollIntoView({ behavior: "smooth", block: "center" });
  firstInvalidInput?.focus({ preventScroll: true });
}

function validateQuoteForm(form, formData, estimate) {
  const messages = [];
  let firstInvalidInput = null;
  const addError = (message, input) => {
    messages.push(message);
    if (input && !firstInvalidInput) firstInvalidInput = input;
    markInvalid(input);
  };

  requiredFieldRules().forEach(([name, label]) => {
    const input = form.elements[name];
    const value = String(formData[name] || "").trim();
    if (!value) addError(`${label}未填寫`, input);
  });

  const emailInput = form.elements.email;
  if (String(formData.email || "").trim() && !emailInput.checkValidity()) {
    addError("電子郵件格式不正確", emailInput);
  }

  ["extraChineseReports", "englishReports"].forEach((name) => {
    const input = form.elements[name];
    const value = Number(input.value || 0);
    if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value)) {
      addError(`${name === "extraChineseReports" ? "中文報告加購份數" : "英文報告份數"}請填 0 以上整數`, input);
    }
  });

  if (!estimate.items.length) {
    addError("請至少選擇一個檢測項目", $("#testList"));
  }

  const attachments = formData.attachments || [];
  if (formData.isFirstApplication === "yes" && attachments.length === 0) {
    addError("首次申請檢測時，檢附證件至少需提供其中一項", form.querySelector('input[name="attachments"]'));
  }

  if (attachments.includes("其他") && !String(formData.attachmentOther || "").trim()) {
    addError("檢附證件選擇其他時，請填寫其他證件名稱", form.elements.attachmentOther);
  }

  if (messages.length) {
    showValidationErrors(form, messages, firstInvalidInput);
    return false;
  }

  clearValidationState(form);
  return true;
}

function createCase(formData, estimate) {
  const now = new Date();
  const caseNo = `PTRI-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}-${String(state.cases.length + 1).padStart(3, "0")}`;

  return {
    id: crypto.randomUUID(),
    caseNo,
    status: "待報價確認",
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
    },
    estimate,
    internal: {
      confirmed: false,
      quoteApprovedAt: "",
      quoteSentAt: "",
      paymentStatus: "未確認",
      note: "",
      steps: internalSteps.map((name) => ({
        name,
        done: name === "收到申請書",
        completedAt: name === "收到申請書" ? now.toISOString() : "",
      })),
    },
  };
}

async function submitQuote(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = event.submitter || form.querySelector('button[type="submit"]');
  const estimate = calculateEstimate();
  const formData = readForm(form);
  if (!validateQuoteForm(form, formData, estimate)) {
    return;
  }

  const newCase = createCase(formData, estimate);
  state.cases.unshift(newCase);
  state.activeCase = newCase;
  saveState();
  renderCases();
  renderKanban();
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "送出申請中...";
  }

  try {
    await downloadOfficialDocx(newCase, "application");
    alert("申請已送出，報價單將由印研中心同仁確認後再提供。");
    setView("cases");
  } catch (error) {
    alert(error.message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "送出並產生文件";
    }
  }
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
          <button class="ghost-button" type="button" data-submit-case="${item.id}">繳交</button>
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
      .map((item) => buildInternalCaseCard(ensureInternalCase(item)))
      .join("") || `<p class="fine-print">尚無案件。</p>`;
}

function ensureInternalCase(caseData) {
  if (!caseData) return null;
  if (!caseStatuses.includes(caseData.status)) {
    caseData.status = "待報價確認";
  }
  if (!caseData.internal) {
    caseData.internal = {};
  }
  if (!Array.isArray(caseData.internal.steps)) {
    caseData.internal.steps = [];
  }
  caseData.internal.steps = internalSteps.map((name) => {
    const existing = caseData.internal.steps.find((step) => step.name === name);
    return {
      name,
      done: Boolean(existing?.done),
      completedAt: existing?.completedAt || "",
    };
  });
  caseData.internal.confirmed = Boolean(caseData.internal.confirmed);
  caseData.internal.quoteApprovedAt = caseData.internal.quoteApprovedAt || "";
  caseData.internal.quoteSentAt = caseData.internal.quoteSentAt || "";
  if (!paymentStatuses.includes(caseData.internal.paymentStatus)) {
    caseData.internal.paymentStatus = "未確認";
  }
  caseData.internal.note = caseData.internal.note || "";
  if (caseData.submission) {
    caseData.submission.archiveDir = caseData.submission.archiveDir || "";
  }
  return caseData;
}

function internalProgress(caseData) {
  const steps = ensureInternalCase(caseData).internal.steps;
  const done = steps.filter((step) => step.done).length;
  return {
    done,
    total: steps.length,
    percent: steps.length ? Math.round((done / steps.length) * 100) : 0,
  };
}

function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildInternalCaseCard(caseData) {
  const progress = internalProgress(caseData);
  const submission = caseData.submission;
  const files = submission?.files || [];
  const submittedAt = submission?.submittedAt ? formatDateTime(submission.submittedAt) : "尚未回傳";
  const quoteApprovedAt = caseData.internal.quoteApprovedAt ? formatDateTime(caseData.internal.quoteApprovedAt) : "尚未確認";
  const quoteSentAt = caseData.internal.quoteSentAt ? formatDateTime(caseData.internal.quoteSentAt) : "尚未寄出";
  const archiveDir = submission?.archiveDir || "";

  return `
    <article class="internal-card">
      <header class="internal-card-header">
        <div>
          <p class="eyebrow">${caseData.caseNo}</p>
          <h4>${caseData.customer.companyName}</h4>
          <p>${caseData.sample.sampleName}｜${caseData.estimate.items.length} 項｜${money(caseData.estimate.total)}</p>
        </div>
        <span class="status">${caseData.status}</span>
      </header>

      <div class="internal-meta">
        <span>聯絡人：${caseData.customer.contactName || ""}</span>
        <span>電話：${caseData.customer.phone || ""}</span>
        <span>回傳：${submittedAt}</span>
        <span>付款：${caseData.internal.paymentStatus}</span>
        <span>報價確認：${quoteApprovedAt}</span>
        <span>報價寄出：${quoteSentAt}</span>
      </div>

      <div class="internal-actions">
        <button class="ghost-button" type="button" data-download-doc="${caseData.id}" data-doc-type="application">下載申請書</button>
        <button class="ghost-button" type="button" data-download-doc="${caseData.id}" data-doc-type="quote">下載報價單</button>
        <button class="ghost-button" type="button" data-print-memo="${caseData.id}">產生內部簽呈</button>
        <button class="ghost-button" type="button" data-approve-quote="${caseData.id}">標記報價已確認</button>
        <button class="primary-button" type="button" data-send-quote="${caseData.id}">標記已寄出報價單</button>
      </div>

      <div class="internal-progress">
        <div>
          <strong>內部進度</strong>
          <span>${progress.done}/${progress.total} 完成</span>
        </div>
        <div class="progress-track"><span style="width:${progress.percent}%"></span></div>
      </div>

      <div class="internal-files">
        <strong>廠商回傳文件</strong>
        ${
          files.length
            ? files.map((file) => `<span>${file}</span>`).join("")
            : `<span class="muted-inline">尚未回傳簽章文件</span>`
        }
        ${archiveDir ? `<small>歸檔位置：${archiveDir}</small>` : ""}
        ${submission?.note ? `<small>備註：${submission.note}</small>` : ""}
      </div>

      <div class="internal-controls">
        <label>
          案件狀態
          <select data-internal-status="${caseData.id}">
            ${caseStatuses
              .map((status) => `<option value="${status}" ${caseData.status === status ? "selected" : ""}>${status}</option>`)
              .join("")}
          </select>
        </label>
        <label>
          付款狀態
          <select data-internal-payment="${caseData.id}">
            ${paymentStatuses
              .map(
                (status) =>
                  `<option value="${status}" ${caseData.internal.paymentStatus === status ? "selected" : ""}>${status}</option>`
              )
              .join("")}
          </select>
        </label>
      </div>

      <div class="internal-steps">
        ${caseData.internal.steps
          .map(
            (step, index) => `
              <label class="internal-step ${step.done ? "done" : ""}">
                <input
                  type="checkbox"
                  data-internal-step="${caseData.id}"
                  data-step-index="${index}"
                  ${step.done ? "checked" : ""}
                />
                <span>${step.name}</span>
                ${step.completedAt ? `<small>${formatDateTime(step.completedAt)}</small>` : ""}
              </label>
            `
          )
          .join("")}
      </div>

      <label class="internal-note">
        內部備註
        <textarea data-internal-note="${caseData.id}" rows="2" placeholder="例如：待補公司執照影本、已電話確認付款。">${caseData.internal.note}</textarea>
      </label>
    </article>
  `;
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
        <tr><th>測試件描述</th><td colspan="3">${sample.material || ""}</td></tr>
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

function openInternalMemo(caseData) {
  const memoWindow = window.open("", "_blank");
  if (!memoWindow) {
    alert("瀏覽器阻擋了簽呈視窗，請允許此網站開啟彈出視窗。");
    return;
  }
  memoWindow.document.write(`
    <!doctype html>
    <html lang="zh-Hant">
      <head>
        <meta charset="utf-8" />
        <title>${caseData.caseNo} 內部簽呈</title>
        <link rel="stylesheet" href="./styles.css" />
      </head>
      <body class="print-document">
        <main class="document-preview active">
          ${buildDocument(caseData, "memo")}
        </main>
      </body>
    </html>
  `);
  memoWindow.document.close();
}

function renderSubmission() {
  renderSubmissionSelect();
  renderSubmissionStatus();
  syncSubmissionFormState();
}

function renderSubmissionSelect() {
  const select = $("#submissionCaseSelect");
  if (!select) return;
  select.innerHTML =
    state.cases
      .map(
        (item) =>
          `<option value="${item.id}">${item.caseNo}｜${item.sample.sampleName}｜${item.status}</option>`
      )
      .join("") || `<option value="">尚無可繳交案件</option>`;
  if (state.activeCase) select.value = state.activeCase.id;
}

function renderSubmissionStatus() {
  const panel = $("#submissionStatus");
  if (!panel) return;
  const caseData = state.activeCase || state.cases[0];
  if (!caseData) {
    panel.innerHTML = `
      <p class="eyebrow">Submission</p>
      <h3>尚無案件可繳交</h3>
      <p class="fine-print">請先完成線上詢價，系統會自動下載申請書與報價單，再引導到這裡回傳簽章文件。</p>
    `;
    return;
  }

  const files = caseData.submission?.files || [];
  const archiveDir = caseData.submission?.archiveDir || "";
  const canSubmitSignedDocs = Boolean(caseData.internal?.quoteSentAt) || uploadReadyStatuses.has(caseData.status);
  const waitingMessage = canSubmitSignedDocs
    ? "請確認收到的正式申請書與報價單內容，完成簽名蓋章後，在下方上傳掃描檔或拍照檔。"
    : "報價單目前由印研中心同仁確認中，確認並寄出後，這裡會開放簽章文件回傳。";
  panel.innerHTML = `
    <div class="submission-hero">
      <div>
        <p class="eyebrow">Next Step</p>
        <h3>${caseData.caseNo} ${canSubmitSignedDocs ? "簽章文件回傳" : "等待報價確認"}</h3>
        <p>${waitingMessage}</p>
      </div>
      <span class="status">${caseData.status}</span>
    </div>
    <div class="process-list">
      <article>
        <strong>申請已建立</strong>
        <span>客戶送出後先產生申請書，報價單需由內部確認後提供。</span>
      </article>
      <article>
        <strong>報價確認</strong>
        <span>${canSubmitSignedDocs ? "中心已提供報價單，可進行簽章回傳。" : "中心同仁確認金額、急件加成與特殊項目。"}</span>
      </article>
      <article>
        <strong>中心確認</strong>
        <span>同仁確認文件與付款狀態後，案件才會正式開案。</span>
      </article>
    </div>
    ${
      files.length
        ? `<div class="uploaded-list"><strong>已回傳檔案</strong>${files
            .map((file) => `<span>${file}</span>`)
            .join("")}${archiveDir ? `<span>歸檔位置：${archiveDir}</span>` : ""}</div>`
        : ""
    }
  `;
  syncSubmissionFormState();
}

function syncSubmissionFormState() {
  const form = $("#submissionForm");
  if (!form) return;
  const caseData = state.activeCase || state.cases[0];
  const canSubmit = Boolean(
    caseData && (caseData.internal?.quoteSentAt || uploadReadyStatuses.has(caseData.status))
  );
  form.querySelectorAll("input, textarea, button").forEach((element) => {
    element.disabled = !canSubmit;
  });
}

async function downloadOfficialDocx(caseData, docType) {
  const isQuote = docType === "quote";
  const endpoint = isQuote ? "/api/generate-quote" : "/api/generate-application";
  const label = isQuote ? "報價單" : "申請書";

  if (window.location.protocol === "file:") {
    throw new Error(`正式 Word ${label}需要從本機後端開啟。請使用 http://127.0.0.1:8765/ 進入系統。`);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(caseData),
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
  const filename = match ? decodeURIComponent(match[1]) : `${caseData.caseNo}_${label}.docx`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function submitSignedDocuments(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = event.submitter || form.querySelector('button[type="submit"]');
  const caseId = form.elements.caseId.value;
  const caseData = state.cases.find((item) => item.id === caseId);
  const selectedFiles = [...form.elements.signedFiles.files];

  if (!caseData) {
    alert("請先選擇要繳交的案件。");
    return;
  }
  if (!caseData.internal?.quoteSentAt && !uploadReadyStatuses.has(caseData.status)) {
    alert("報價單尚未由印研中心確認並寄出，暫時不能回傳簽章文件。");
    return;
  }
  if (!selectedFiles.length) {
    alert("請至少上傳一個簽章文件。");
    return;
  }

  if (window.location.protocol === "file:") {
    alert("線上回傳需要從本機後端開啟。請使用 http://127.0.0.1:8765/ 進入系統。");
    return;
  }

  const formData = new FormData();
  formData.append("caseNo", caseData.caseNo);
  formData.append("note", form.elements.submissionNote.value || "");
  selectedFiles.forEach((file) => formData.append("signedFiles", file));

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "回傳中...";
  }

  let uploadedFiles = selectedFiles.map((file) => file.name);
  let archiveDir = "";
  try {
    const response = await fetch("/api/submit-documents", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      throw new Error(result.error || "回傳文件失敗。");
    }
    uploadedFiles = result.files?.length ? result.files : uploadedFiles;
    archiveDir = result.archiveDir || "";
  } catch (error) {
    alert(error.message);
    return;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "送出回傳資料";
    }
  }

  caseData.status = "已回傳";
  caseData.submission = {
    files: uploadedFiles,
    archiveDir,
    note: form.elements.submissionNote.value || "",
    submittedAt: new Date().toISOString(),
  };
  markInternalStep(caseData, "廠商回簽報價單");
  state.activeCase = caseData;
  saveState();
  renderCases();
  renderKanban();
  renderSubmission();
  form.reset();
  $("#submissionCaseSelect").value = caseData.id;
  alert("已收到回傳資料，待印研中心同仁確認。");
}

function bindEvents() {
  $("#quoteForm").noValidate = true;

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
    const submitCaseId = event.target.dataset.submitCase;
    if (submitCaseId) {
      const caseData = state.cases.find((item) => item.id === submitCaseId);
      if (caseData) {
        state.activeCase = caseData;
        setView("submission");
      }
      return;
    }

    const downloadCaseId = event.target.dataset.downloadDoc;
    if (downloadCaseId) {
      const caseData = state.cases.find((item) => item.id === downloadCaseId);
      if (caseData) downloadOfficialDocx(caseData, event.target.dataset.docType || "application");
      return;
    }

    const memoCaseId = event.target.dataset.printMemo;
    if (memoCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === memoCaseId));
      if (caseData) {
        markInternalStep(caseData, "製作申請簽呈");
        saveState();
        renderKanban();
        openInternalMemo(caseData);
      }
      return;
    }

    const approveCaseId = event.target.dataset.approveQuote;
    if (approveCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === approveCaseId));
      if (!caseData) return;
      caseData.internal.quoteApprovedAt = new Date().toISOString();
      caseData.status = "報價已確認";
      syncCaseStepsFromStatus(caseData);
      saveState();
      renderCases();
      renderKanban();
      renderSubmission();
      return;
    }

    const sendQuoteCaseId = event.target.dataset.sendQuote;
    if (sendQuoteCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === sendQuoteCaseId));
      if (!caseData) return;
      caseData.internal.quoteApprovedAt = caseData.internal.quoteApprovedAt || new Date().toISOString();
      caseData.internal.quoteSentAt = new Date().toISOString();
      caseData.status = "報價單已寄出";
      syncCaseStepsFromStatus(caseData);
      saveState();
      renderCases();
      renderKanban();
      renderSubmission();
    }
  });

  document.body.addEventListener("change", (event) => {
    const stepCaseId = event.target.dataset.internalStep;
    if (stepCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === stepCaseId));
      if (!caseData) return;
      const step = caseData.internal.steps[Number(event.target.dataset.stepIndex)];
      step.done = event.target.checked;
      step.completedAt = step.done ? new Date().toISOString() : "";
      saveState();
      renderKanban();
      return;
    }

    const statusCaseId = event.target.dataset.internalStatus;
    if (statusCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === statusCaseId));
      if (!caseData) return;
      caseData.status = event.target.value;
      syncCaseStepsFromStatus(caseData);
      saveState();
      renderCases();
      renderKanban();
      renderSubmission();
      return;
    }

    const paymentCaseId = event.target.dataset.internalPayment;
    if (paymentCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === paymentCaseId));
      if (!caseData) return;
      caseData.internal.paymentStatus = event.target.value;
      saveState();
      renderKanban();
    }
  });

  document.body.addEventListener("input", (event) => {
    const noteCaseId = event.target.dataset.internalNote;
    if (!noteCaseId) return;
    const caseData = ensureInternalCase(state.cases.find((item) => item.id === noteCaseId));
    if (!caseData) return;
    caseData.internal.note = event.target.value;
    saveState();
  });

  $("#submissionForm").addEventListener("submit", submitSignedDocuments);
  $("#submissionCaseSelect").addEventListener("change", (event) => {
    state.activeCase = state.cases.find((item) => item.id === event.target.value) || null;
    renderSubmissionStatus();
  });

  $("#resetDemoBtn").addEventListener("click", () => {
    if (!confirm("確定要清除 demo 資料？")) return;
    localStorage.removeItem("ptri_user");
    localStorage.removeItem("ptri_cases");
    state.user = { ...demoUser };
    state.cases = [];
    syncAccountUi();
    setView("quote");
  });
}

function init() {
  renderCategoryFilter();
  renderTests();
  markRequiredFields();
  bindEvents();
  syncAccountUi();
  calculateEstimate();
  setView(state.user ? "quote" : "login");
}

init();
