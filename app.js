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
  email: "demo@example.invalid", companyName: "墨森紙品（示範）", taxId: "00000000",
  contactName: "林小樣", phone: "02-0000-0000", mobile: "", jobTitle: "品管專員",
  address: "示範市樣品路 10 號", invoiceAddress: "示範市樣品路 10 號", fax: ""
};

const demoMember = {
  ...demoUser,
  id: "demo-member",
  cName: demoUser.contactName,
  englishName: "",
  extension: "200",
  password: "PtriDemo2026",
};

const demoStaff = {
  email: "staff@ptri.org.tw",
  password: "PtriStaff2026",
  companyName: "印研中心檢測承辦",
  contactName: "檢測承辦同仁",
  role: "staff",
};

const defaultTestIds = new Set(["paper-weight", "paper-whiteness", "paper-opacity"]);
const casesResetVersion = "20260729-clear-cases-v5";
const caseStatuses = [
  "待報價確認",
  "報價已確認",
  "報價單已寄出",
  "文件待確認",
  "已回傳",
  "已確認",
  "缺件",
  "退回更正",
  "取消申請中",
  "已取消",
  "待付款",
  "已收款",
  "檢測中",
  "報告完成",
  "已結案",
];
const uploadReadyStatuses = new Set(["報價單已寄出", "文件待確認", "已回傳", "已確認", "缺件"]);
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
  文件待確認: ["收到申請書", "寄出報價單", "廠商回簽報價單"],
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
  user: JSON.parse(localStorage.getItem("ptri_user") || "null"),
  members: JSON.parse(localStorage.getItem("ptri_members") || "null") || [demoMember],
  cases: JSON.parse(localStorage.getItem("ptri_cases") || "[]"),
  drafts: JSON.parse(localStorage.getItem("ptri_drafts") || "[]"),
  activeCase: null,
  activeDraftId: null,
  role: localStorage.getItem("ptri_role") || "guest",
  isSubmittingQuote: false,
  pendingQuoteSubmission: null,
};

if (state.user?.email === "customer@example.com" || state.user?.companyName === demoUser.companyName) {
  state.user = { ...demoUser };
  localStorage.setItem("ptri_user", JSON.stringify(state.user));
}
if (state.user && state.role === "guest") {
  state.role = state.user.email === demoStaff.email ? "staff" : "vendor";
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
  localStorage.setItem("ptri_members", JSON.stringify(state.members));
  localStorage.setItem("ptri_cases", JSON.stringify(state.cases));
  localStorage.setItem("ptri_drafts", JSON.stringify(state.drafts));
  localStorage.setItem("ptri_role", state.role);
}

function memberToUser(member) {
  const phone = member.extension && !String(member.phone || "").includes("#") ? `${member.phone} #${member.extension}` : member.phone;
  return {
    email: member.email,
    companyName: member.companyName,
    taxId: member.taxId,
    contactName: member.cName || member.contactName || "",
    phone,
    mobile: member.mobile || "",
    jobTitle: member.jobTitle || "",
    address: member.address || "",
    invoiceAddress: member.invoiceAddress || member.address || "",
    fax: member.fax || "",
  };
}

function loginMember(member) {
  state.user = memberToUser(member);
  state.role = "vendor";
  saveState();
  syncAccountUi();
  syncRoleUi();
  setView("cases");
}

function findMemberByEmail(email) {
  return state.members.find((member) => member.email.toLowerCase() === String(email).trim().toLowerCase());
}

function isValidMemberPassword(password) {
  const value = String(password || "");
  const commonPasswords = new Set(["password1", "password123", "12345678", "qwerty123", "abc12345"]);
  return /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/.test(value) && !commonPasswords.has(value.toLowerCase());
}

const passwordHashIterations = 210000;
const registrationAttemptKey = "ptri_registration_attempts";
const privacyNoticeVersion = "2026-10-27-v1";

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function derivePasswordHash(password, salt, iterations = passwordHashIterations) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    keyMaterial,
    256
  );
  return bytesToBase64(new Uint8Array(bits));
}

async function createPasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    passwordHash: await derivePasswordHash(password, salt),
    passwordSalt: bytesToBase64(salt),
    passwordIterations: passwordHashIterations,
  };
}

async function verifyMemberPassword(member, password) {
  if (member.passwordHash && member.passwordSalt) {
    const candidate = await derivePasswordHash(
      password,
      base64ToBytes(member.passwordSalt),
      member.passwordIterations || passwordHashIterations
    );
    return candidate === member.passwordHash;
  }
  return member.password === password;
}

async function verifyRecaptchaToken(token) {
  const response = await fetch("/api/verify-recaptcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) {
    throw new Error(result.error || "安全驗證失敗。");
  }
}

function registrationIsTemporarilyLocked() {
  const record = JSON.parse(localStorage.getItem(registrationAttemptKey) || "null");
  if (!record) return false;
  if (Date.now() - record.startedAt > 10 * 60 * 1000) {
    localStorage.removeItem(registrationAttemptKey);
    return false;
  }
  return record.count >= 5;
}

function recordRegistrationFailure() {
  const now = Date.now();
  const current = JSON.parse(localStorage.getItem(registrationAttemptKey) || "null");
  const record = !current || now - current.startedAt > 10 * 60 * 1000
    ? { count: 1, startedAt: now }
    : { ...current, count: current.count + 1 };
  localStorage.setItem(registrationAttemptKey, JSON.stringify(record));
}

function updatePasswordStrength(password) {
  const indicator = $("#passwordStrength");
  if (!indicator) return;
  const value = String(password || "");
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  if (!value) {
    indicator.textContent = "尚未輸入密碼";
    delete indicator.dataset.level;
  } else if (score <= 2) {
    indicator.textContent = "密碼強度：弱（建議加入大小寫、數字及符號）";
    indicator.dataset.level = "weak";
  } else if (score <= 4) {
    indicator.textContent = "密碼強度：中等";
    indicator.dataset.level = "medium";
  } else {
    indicator.textContent = "密碼強度：良好";
    indicator.dataset.level = "strong";
  }
}

function isInternalMode() {
  return state.role === "staff";
}

function syncRoleUi() {
  document.body.dataset.mode = isInternalMode() ? "internal" : "vendor";
  document.body.dataset.role = state.role;
  $("#staffEntryBtn").hidden = state.role === "staff";
}

function currentViewName() {
  const activeView = $(".view.active");
  return activeView?.id?.replace(/View$/, "") || "quote";
}

function markInternalStep(caseData, stepName, done = true) {
  const internalCase = ensureInternalCase(caseData);
  const step = internalCase.internal.steps.find((item) => item.name === stepName);
  if (!step || step.done === done) return;
  step.done = done;
  step.completedAt = done ? new Date().toISOString() : "";
}

function completedStepAt(caseData, stepName) {
  return ensureInternalCase(caseData).internal.steps.find((item) => item.name === stepName)?.completedAt || "";
}

async function syncCaseToDetail(caseData, button) {
  const internalCase = ensureInternalCase(caseData);
  if (!internalCase.internal.quoteApprovedAt) {
    alert("請先完成報價確認，再同步檢測細目。");
    return;
  }
  const previousSync = internalCase.internal.detailSync;
  const confirmMessage = previousSync?.syncedAt
    ? `此案件先前標記為已同步至第 ${previousSync.row} 列。\n要重新核對並嘗試同步嗎？後端會阻擋重複寫入。`
    : `確定要將 ${caseData.caseNo} 同步到 115檢測細目.xlsx 嗎？\n系統會先自動建立備份。`;
  if (!confirm(confirmMessage)) return;

  const originalText = button?.textContent || "同步檢測細目";
  if (button) {
    button.disabled = true;
    button.textContent = "同步中...";
  }
  const completedMemoAt = completedStepAt(caseData, "完成申請簽呈");
  const payload = {
    syncKey: caseData.id,
    caseNo: caseData.caseNo,
    serviceType: caseData.serviceType,
    companyName: caseData.customer?.companyName || "",
    syncDate: completedMemoAt || internalCase.internal.quoteApprovedAt || new Date().toISOString(),
    itemNames: caseData.estimate?.items?.map((item) => item.name) || [],
    amount: Number(internalCase.internal.finalAmount ?? caseData.estimate?.total ?? 0),
    caseType: caseData.sample?.caseType || "一般件",
  };

  try {
    const response = await fetch("/api/sync-detail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || "同步失敗。");
    internalCase.internal.detailSync = {
      syncedAt: new Date().toISOString(),
      row: result.row,
      serialNumber: result.serialNumber,
      testNumber: result.testNumber,
    };
    markInternalStep(caseData, "建立檢測細目");
    saveState();
    renderKanban();
    if (currentViewName() === "caseDetail") renderCaseDetail();
    alert(`同步完成：流水號 ${result.serialNumber}、測試件編號 ${result.testNumber}，已寫入第 ${result.row} 列。`);
  } catch (error) {
    alert(`同步失敗：${error.message}`);
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function syncCaseStepsFromStatus(caseData) {
  const steps = statusStepMap[caseData.status] || [];
  steps.forEach((stepName) => markInternalStep(caseData, stepName));
}

function setView(viewName) {
  const guestViews = new Set(["login", "staffLogin"]);
  const staffViews = new Set(["admin", "staffIntake", "caseDetail", "lineRecipients"]);
  const vendorViews = new Set(["quote", "cases", "caseDetail", "submission", "settings"]);
  if (!state.user && !guestViews.has(viewName)) {
    viewName = "login";
  } else if (state.user && isInternalMode() && !staffViews.has(viewName)) {
    viewName = "admin";
  } else if (state.user && !isInternalMode() && !vendorViews.has(viewName)) {
    viewName = "cases";
  }

  if (currentViewName() === "quote" && viewName !== "quote" && draftSaveTimer !== null) {
    clearTimeout(draftSaveTimer);
    draftSaveTimer = null;
    saveCurrentDraft();
  }
  if (viewName !== "lineRecipients") resetLineEditor();
  $$(".view").forEach((view) => view.classList.remove("active"));
  $$(".nav-item").forEach((item) => item.classList.remove("active"));

  const view = $(`#${viewName}View`);
  if (view) view.classList.add("active");
  document.body.dataset.view = viewName;

  const nav = $(`.nav-item[data-view="${viewName}"]`);
  if (nav) nav.classList.add("active");

  const titles = {
    login: "客戶登入",
    staffLogin: "內部同仁登入",
    quote: "印刷適性實驗室線上申請與報價",
    cases: "我的案件",
    caseDetail: "案件明細",
    submission: "簽章文件繳交專區",
    admin: "內部後台",
    lineRecipients: "LINE 通知收件人",
    staffIntake: "同仁代建案件",
    settings: "帳戶資料",
  };
  $("#viewTitle").textContent = titles[viewName] || "檢測線上報價";

  if (viewName === "cases") renderCases();
  if (viewName === "caseDetail") renderCaseDetail();
  if (viewName === "submission") renderSubmission();
  if (viewName === "admin") renderKanban();
  if (viewName === "staffIntake") renderStaffIntake();
  if (viewName === "settings") fillProfileForm();
}

function syncAccountUi() {
  document.body.classList.toggle("is-authenticated", Boolean(state.user));
  $("#currentRoleLabel").textContent = isInternalMode() ? "內部同仁" : state.user ? "廠商會員" : "目前登入";
  $("#currentCompany").textContent = state.user?.companyName || "尚未登入";
  $("#currentEmail").textContent = state.user?.email || "請先建立 demo 帳號";
  if (state.user && !isInternalMode()) fillQuoteCustomer();
}

function readForm(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.tests = formData.getAll("tests");
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

function markRequiredFields(form) {
  if (!form) return;
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
  const category = $("#categoryFilter")?.value || "paper";
  const serviceType = $("#serviceType")?.value || "paper";
  const allowedCategories = categories
    .filter((item) => item.serviceType === serviceType)
    .map((item) => item.id);
  const visibleItems = testItems.filter((item) => allowedCategories.includes(item.category));

  $("#testList").innerHTML = visibleItems
    .map(
      (item) => `
      <label class="test-item" data-category="${item.category}" ${item.category === category ? "" : "hidden"}>
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
  $("#quoteCount").textContent = `已選 ${items.length} 項`;
  $("#openEstimate").firstChild.textContent = `已選 ${items.length} 項 · 查看明細 ↑ `;
  $("#openEstimate strong").textContent = money(total);
  $("#estimateItems").innerHTML = items.map(item =>
    `<li><span>${item.name}</span><span>${money(item.price)}</span></li>`
  ).join("");

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
    ["serviceType", "檢測類型"],
    ["categoryFilter", "檢測類別"],
  ];
}

function clearValidationState(form) {
  form.querySelectorAll("[aria-invalid='true']").forEach((input) => input.removeAttribute("aria-invalid"));
  form.querySelector(".form-error-summary")?.remove();
}

function markInvalid(input) {
  if (!input) return;
  input.setAttribute("aria-invalid", "true");
}

function showValidationErrors(form, messages, firstInvalidInput) {
  const section = firstInvalidInput?.closest(".quote-section");
  if (section) showQuoteSection(section.id);
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
  clearValidationState(form);
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

  if (messages.length) {
    showValidationErrors(form, messages, firstInvalidInput);
    return false;
  }

  clearValidationState(form);
  return true;
}

function nextCaseNumber(now = new Date()) {
  const rocYear = now.getFullYear() - 1911;
  const prefix = `${rocYear}-`;
  const lastNumber = state.cases.reduce((max, item) => {
    if (!String(item.caseNo || "").startsWith(prefix)) return max;
    const value = Number(String(item.caseNo).slice(prefix.length));
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);
  return `${prefix}${String(lastNumber + 1).padStart(3, "0")}`;
}

function createCase(formData, estimate, options = {}) {
  const now = new Date();
  const caseNo = nextCaseNumber(now);
  const source = options.source || "online";
  const paperOriginalReceived = Boolean(options.paperOriginalReceived);

  return {
    id: crypto.randomUUID(),
    caseNo,
    status: "待報價確認",
    source,
    ownerEmail: options.ownerEmail ?? (source === "online" ? state.user?.email || "" : ""),
    paperOriginalReceived,
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
      isFirstApplication: "no",
      attachments: [],
      attachmentOther: "",
    },
    estimate,
    internal: {
      confirmed: false,
      quoteApprovedAt: "",
      quoteSentAt: "",
      quoteVersions: [],
      finalAmount: estimate.total,
      adjustmentNote: "",
      paymentStatus: "未確認",
      note: options.intakeNote || "",
      steps: internalSteps.map((name) => ({
        name,
        done: name === "收到申請書",
        completedAt: name === "收到申請書" ? now.toISOString() : "",
      })),
    },
  };
}

function showQuoteSection(id) {
  $$(".quote-section").forEach(section => section.hidden = section.id !== id);
  $$(".application-tabs button").forEach(button =>
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-controls") === id))
  );
}

function reviewQuote(event) {
  event.preventDefault();
  if (state.isSubmittingQuote) return;
  const form = event.currentTarget;
  const estimate = calculateEstimate();
  if ($("#estimateSheet").open) $("#estimateSheet").close();
  const data = readForm(form);
  if (!validateQuoteForm(form, data, estimate)) return;
  $("#reviewDetails").textContent = [data.companyName, data.sampleName, data.caseType,
    estimate.items.map(item => item.name).join("、"), `預估含稅總額 ${money(estimate.total)}`].join("\n");
  $("#quoteReview").showModal();
}

async function submitQuote() {
  if (state.isSubmittingQuote) return;
  $("#quoteReview").close();
  const form = $("#quoteForm");
  const submitButton = form.querySelector('button[type="submit"]');
  const estimate = calculateEstimate();
  const formData = readForm(form);
  if (!validateQuoteForm(form, formData, estimate)) {
    return;
  }

  const submissionKey = JSON.stringify([state.user?.email, state.activeDraftId, formData, estimate]);
  if (state.pendingQuoteSubmission?.key !== submissionKey) {
    state.pendingQuoteSubmission = { key: submissionKey, caseData: createCase(formData, estimate) };
  }
  const newCase = state.pendingQuoteSubmission.caseData;
  state.isSubmittingQuote = true;
  const submittedDraftId = state.activeDraftId;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "送出申請中...";
  }

  try {
    await downloadOfficialDocx(newCase, "application", { submit: true });
    clearTimeout(draftSaveTimer);
    draftSaveTimer = null;
    state.cases.unshift(newCase);
    if (submittedDraftId) {
      state.drafts = state.drafts.filter((draft) => draft.id !== submittedDraftId);
      if (state.activeDraftId === submittedDraftId) state.activeDraftId = null;
    }
    state.activeCase = newCase;
    saveState();
    state.pendingQuoteSubmission = null;
    renderCases();
    renderKanban();
    alert("申請已送出，報價單將由印研中心同仁確認後再提供。");
    setView("cases");
  } catch (error) {
    alert(error.message);
  } finally {
    state.isSubmittingQuote = false;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "確認申請內容";
    }
  }
}

const draftLifetimeMs = 30 * 24 * 60 * 60 * 1000;
let draftSaveTimer = null;
const sourceLabels = {
  online: "會員線上申請",
  phone: "同仁電話代建",
  paper: "紙本現場收件",
};
const vendorProgressSteps = [
  "申請已送出",
  "報價確認中",
  "待下載簽章",
  "文件確認中",
  "檢測進行中",
  "報告已完成",
];

function purgeExpiredDrafts() {
  const now = Date.now();
  const remaining = state.drafts.filter((draft) => now - new Date(draft.updatedAt).getTime() < draftLifetimeMs);
  if (remaining.length !== state.drafts.length) {
    state.drafts = remaining;
    saveState();
  }
}

function belongsToCurrentVendor(caseData) {
  if (isInternalMode()) return true;
  const currentEmail = String(state.user?.email || "").toLowerCase();
  return [caseData.ownerEmail, caseData.customer?.email]
    .filter(Boolean)
    .some((email) => String(email).toLowerCase() === currentEmail);
}

function vendorCases() {
  return state.cases.filter(belongsToCurrentVendor);
}

function currentVendorStage(caseData) {
  if (["報告完成", "已結案"].includes(caseData.status)) return 5;
  if (["檢測中", "已收款", "待付款", "已確認"].includes(caseData.status)) return 4;
  if (["已回傳", "文件待確認", "缺件"].includes(caseData.status)) return 3;
  if (["報價單已寄出", "退回更正"].includes(caseData.status)) return 2;
  if (["待報價確認", "報價已確認"].includes(caseData.status)) return 1;
  return 0;
}

function renderVendorProgress(caseData) {
  const current = currentVendorStage(caseData);
  return `
    <ol class="case-progress" aria-label="案件進度">
      ${vendorProgressSteps
        .map(
          (label, index) => `
            <li class="${index < current ? "done" : index === current ? "current" : ""}">
              <span>${index + 1}</span>
              <strong>${label}</strong>
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}

function quoteDraftData() {
  const form = $("#quoteForm");
  const data = readForm(form);
  data.tests = [...form.querySelectorAll('input[name="tests"]:checked')].map((input) => input.value);
  return data;
}

function saveCurrentDraft() {
  if (!state.user || isInternalMode() || state.isSubmittingQuote || currentViewName() !== "quote") return;
  const now = new Date().toISOString();
  let draft = state.drafts.find((item) => item.id === state.activeDraftId);
  if (!draft) {
    draft = {
      id: crypto.randomUUID(),
      ownerEmail: state.user.email,
      createdAt: now,
    };
    state.activeDraftId = draft.id;
    state.drafts.unshift(draft);
  }
  draft.updatedAt = now;
  draft.data = quoteDraftData();
  saveState();
  $("#draftSaveStatus").textContent = `草稿已自動儲存 ${formatDateTime(now)}`;
}

function scheduleDraftSave() {
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(() => {
    draftSaveTimer = null;
    saveCurrentDraft();
  }, 450);
}

function startNewApplication() {
  const form = $("#quoteForm");
  clearValidationState(form);
  showQuoteSection("quoteTests");
  state.activeDraftId = null;
  form.reset();
  $("#serviceType").value = "paper";
  renderCategoryFilter();
  renderTests();
  fillQuoteCustomer();
  calculateEstimate();
  $("#draftSaveStatus").textContent = "填寫後將自動儲存草稿";
  setView("quote");
}

function openDraft(draftId) {
  const draft = state.drafts.find((item) => item.id === draftId);
  if (!draft) return;
  const form = $("#quoteForm");
  clearValidationState(form);
  showQuoteSection("quoteTests");
  const data = draft.data || {};
  state.activeDraftId = draft.id;
  form.reset();
  $("#serviceType").value = data.serviceType || "paper";
  renderCategoryFilter();
  if (data.categoryFilter) $("#categoryFilter").value = data.categoryFilter;
  renderTests();
  fillForm(form, data);
  const selectedTests = new Set(data.tests || []);
  form.querySelectorAll('input[name="tests"]').forEach((input) => {
    input.checked = selectedTests.has(input.value);
  });
  if (form.elements.sameInvoiceAddress) {
    form.elements.sameInvoiceAddress.checked = data.sameInvoiceAddress === "on";
  }
  calculateEstimate();
  $("#draftSaveStatus").textContent = `草稿最後更新 ${formatDateTime(draft.updatedAt)}`;
  setView("quote");
}

function renderDrafts() {
  const list = $("#draftList");
  if (!list) return;
  purgeExpiredDrafts();
  const ownerEmail = String(state.user?.email || "").toLowerCase();
  const drafts = state.drafts.filter((draft) => String(draft.ownerEmail || "").toLowerCase() === ownerEmail);
  list.innerHTML =
    drafts
      .map((draft) => {
        const data = draft.data || {};
        const type = data.serviceType === "ink" ? "印刷品及油墨" : "紙張";
        return `
          <article class="case-card draft-card">
            <div>
              <p class="eyebrow">${type}檢測草稿</p>
              <h4>${data.sampleName || "尚未填寫樣本名稱"}</h4>
              <p>最後更新：${formatDateTime(draft.updatedAt)}｜草稿保留 30 天</p>
            </div>
            <div class="case-card-actions">
              <button class="primary-button" type="button" data-open-draft="${draft.id}">繼續填寫</button>
              <button class="ghost-button danger-button" type="button" data-delete-draft="${draft.id}">刪除</button>
            </div>
          </article>
        `;
      })
      .join("") || `<div class="empty-state"><strong>目前沒有草稿</strong><span>開始填寫申請後，系統會自動儲存。</span></div>`;
}

function renderCases() {
  const list = $("#caseList");
  const cases = vendorCases();
  list.innerHTML = cases
    .map(
      (item) => `
      <article class="case-card">
        <div>
          <h4>${item.caseNo}｜${item.sample.sampleName}</h4>
          <p>${sourceLabels[item.source || "online"]}｜${new Date(item.createdAt).toLocaleDateString("zh-TW")}｜${
        item.estimate.items.length
      } 個檢測項目｜${money(item.estimate.total)}</p>
        </div>
        <div class="case-card-actions">
          <span class="status">${item.status}</span>
          <button class="ghost-button" type="button" data-view-case="${item.id}">查看明細</button>
          ${
            item.internal?.quoteSentAt || uploadReadyStatuses.has(item.status)
              ? `<button class="primary-button" type="button" data-submit-case="${item.id}">繳交文件</button>`
              : ""
          }
        </div>
      </article>
    `
    )
    .join("") || `<div class="empty-state"><strong>目前沒有正式案件</strong><span>建立第一筆檢測申請後，可在這裡查看處理進度。</span></div>`;
  renderDrafts();
}

function renderCaseDetail() {
  const panel = $("#caseDetail");
  const caseData = ensureInternalCase(state.activeCase || state.cases[0]);
  if (!panel) return;
  if (!caseData) {
    panel.innerHTML = `
      <div class="section-heading">
        <div>
          <p class="eyebrow">Case Detail</p>
          <h3>尚無案件資料</h3>
        </div>
        <button class="ghost-button" type="button" data-back-cases>返回案件列表</button>
      </div>
      <p class="fine-print">請先建立一筆檢測詢價案件。</p>
    `;
    return;
  }

  const { customer, sample, estimate } = caseData;
  const submission = caseData.submission;
  const files = submission?.files || [];
  const submissionVersions = submission?.versions || (submission ? [submission] : []);
  const progress = internalProgress(caseData);
  const canUpload = Boolean(caseData.internal.quoteSentAt) || uploadReadyStatuses.has(caseData.status);
  panel.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${caseData.caseNo}</p>
        <h3>${customer.companyName}｜${sample.sampleName}</h3>
      </div>
      <div class="detail-actions">
        <span class="status">${caseData.status}</span>
        <span class="source-badge">${sourceLabels[caseData.source || "online"]}</span>
        <button class="ghost-button" type="button" data-back-cases>返回案件列表</button>
      </div>
    </div>

    <div class="detail-grid">
      <section class="detail-block full-row progress-block">
        <h4>案件進度</h4>
        ${renderVendorProgress(caseData)}
      </section>

      <section class="detail-block full-row document-actions">
        <h4>文件與案件操作</h4>
        <div>
          <button class="ghost-button" type="button" data-download-doc="${caseData.id}" data-doc-type="application">下載申請書</button>
          ${caseData.internal.quoteSentAt ? `<button class="ghost-button" type="button" data-download-doc="${caseData.id}" data-doc-type="quote">下載報價單</button>` : ""}
          ${canUpload ? `<button class="primary-button" type="button" data-submit-case="${caseData.id}">前往繳交文件</button>` : ""}
          ${
            !isInternalMode() && !["已取消", "已結案"].includes(caseData.status)
              ? `<button class="ghost-button" type="button" data-request-correction="${caseData.id}">申請更正</button>
                 <button class="ghost-button danger-button" type="button" data-request-cancel="${caseData.id}">申請取消</button>`
              : ""
          }
        </div>
        ${caseData.requests?.correction ? `<p class="fine-print">更正申請：${caseData.requests.correction.reason}（${formatDateTime(caseData.requests.correction.requestedAt)}）</p>` : ""}
        ${caseData.requests?.cancel ? `<p class="fine-print">取消申請：${caseData.requests.cancel.reason}（${formatDateTime(caseData.requests.cancel.requestedAt)}）</p>` : ""}
      </section>

      <section class="detail-block">
        <h4>客戶資料</h4>
        <dl>
          <div><dt>公司名稱</dt><dd>${customer.companyName || ""}</dd></div>
          <div><dt>統一編號</dt><dd>${customer.taxId || ""}</dd></div>
          <div><dt>聯絡人</dt><dd>${customer.contactName || ""}</dd></div>
          <div><dt>Email</dt><dd>${customer.email || ""}</dd></div>
          <div><dt>電話</dt><dd>${customer.phone || ""}</dd></div>
          <div><dt>傳真</dt><dd>${customer.fax || ""}</dd></div>
          <div><dt>公司地址</dt><dd>${customer.address || ""}</dd></div>
          <div><dt>發票地址</dt><dd>${customer.invoiceAddress || ""}</dd></div>
        </dl>
      </section>

      <section class="detail-block">
        <h4>樣品與回傳</h4>
        <dl>
          <div><dt>測試件名稱</dt><dd>${sample.sampleName || ""}</dd></div>
          <div><dt>測試件數量</dt><dd>${sample.sampleQty || ""}</dd></div>
          <div><dt>狀態描述</dt><dd>${sample.material || ""}</dd></div>
          <div><dt>剩餘測試件處理</dt><dd>${sample.sampleReturn || ""}</dd></div>
          <div><dt>報告取件方式</dt><dd>${sample.reportDelivery || ""}</dd></div>
          <div><dt>案件類型</dt><dd>${sample.caseType || ""}</dd></div>
          <div><dt>中文加購</dt><dd>${sample.extraChineseReports || 0} 份</dd></div>
          <div><dt>英文報告</dt><dd>${sample.englishReports || 0} 份</dd></div>
        </dl>
      </section>

      <section class="detail-block full-row">
        <h4>檢測項目與費用</h4>
        <div class="detail-items">
          ${estimate.items
            .map(
              (item, index) => `
                <div>
                  <strong>${index + 1}. ${item.name}</strong>
                  <span>${item.method}｜${money(item.price)} / ${item.unit.replace("元 / ", "")}</span>
                </div>
              `
            )
            .join("")}
        </div>
        <dl class="detail-totals">
          <div><dt>檢測費用</dt><dd>${money(estimate.subtotal || 0)}</dd></div>
          <div><dt>報告加購</dt><dd>${money(estimate.reportFee || 0)}</dd></div>
          <div><dt>急件加成</dt><dd>${money(estimate.urgent || 0)}</dd></div>
          <div><dt>含稅總額</dt><dd>${money(estimate.total || 0)}</dd></div>
        </dl>
      </section>

      <section class="detail-block">
        <h4>文件狀態</h4>
        <dl>
          <div><dt>申請日期</dt><dd>${new Date(caseData.createdAt).toLocaleDateString("zh-TW")}</dd></div>
          <div><dt>案件來源</dt><dd>${sourceLabels[caseData.source || "online"]}</dd></div>
          <div><dt>會員綁定</dt><dd>${caseData.ownerEmail || "尚未綁定會員"}</dd></div>
          <div><dt>紙本正本</dt><dd>${caseData.paperOriginalReceived ? "已收到" : "未標記"}</dd></div>
          <div><dt>報價確認</dt><dd>${caseData.internal.quoteApprovedAt ? formatDateTime(caseData.internal.quoteApprovedAt) : "尚未確認"}</dd></div>
          <div><dt>報價寄出</dt><dd>${caseData.internal.quoteSentAt ? formatDateTime(caseData.internal.quoteSentAt) : "尚未寄出"}</dd></div>
          <div><dt>回傳時間</dt><dd>${submission?.submittedAt ? formatDateTime(submission.submittedAt) : "尚未回傳"}</dd></div>
          <div><dt>歸檔位置</dt><dd>${submission?.archiveDir || "尚未歸檔"}</dd></div>
        </dl>
        <div class="uploaded-list compact">
          <strong>回傳檔案版本</strong>
          ${
            submissionVersions.length
              ? submissionVersions
                  .slice()
                  .reverse()
                  .map(
                    (version) =>
                      `<span>V${version.version || 1}｜${(version.files || []).join("、")}｜${formatDateTime(version.submittedAt)}</span>`
                  )
                  .join("")
              : `<span>尚未回傳</span>`
          }
        </div>
      </section>

      ${
        isInternalMode()
          ? `<section class="detail-block internal-only">
              <h4>內部處理</h4>
              <dl>
                <div><dt>付款狀態</dt><dd>${caseData.internal.paymentStatus}</dd></div>
                <div><dt>內部進度</dt><dd>${progress.done}/${progress.total} 完成</dd></div>
                <div><dt>內部備註</dt><dd>${caseData.internal.note || "尚無備註"}</dd></div>
              </dl>
              <div class="detail-items">
                ${caseData.internal.steps
                  .map((step) => `<div><strong>${step.done ? "已完成" : "待處理"}｜${step.name}</strong><span>${step.completedAt ? formatDateTime(step.completedAt) : ""}</span></div>`)
                  .join("")}
              </div>
            </section>`
          : ""
      }
    </div>
  `;
}

function renderKanban() {
  const kanban = $("#kanban");
  const cases = state.cases.length ? state.cases : [];
  const statusFilter = $("#staffCaseStatusFilter");
  if (statusFilter && statusFilter.options.length === 1) {
    statusFilter.insertAdjacentHTML(
      "beforeend",
      caseStatuses.map((status) => `<option value="${status}">${status}</option>`).join("")
    );
  }
  const query = String($("#staffCaseSearch")?.value || "").trim().toLowerCase();
  const selectedStatus = statusFilter?.value || "";
  const filteredCases = cases.filter((item) => {
    const searchable = [item.caseNo, item.customer?.companyName, item.customer?.contactName, item.sample?.sampleName]
      .join(" ")
      .toLowerCase();
    return (!query || searchable.includes(query)) && (!selectedStatus || item.status === selectedStatus);
  });
  renderStaffSummary(cases);
  if ($("#staffCaseCount")) $("#staffCaseCount").textContent = `顯示 ${filteredCases.length} / ${cases.length} 件`;
  kanban.innerHTML =
    filteredCases
      .map((item) => buildInternalCaseCard(ensureInternalCase(item)))
      .join("") || `<div class="empty-state"><strong>沒有符合條件的案件</strong><span>請調整搜尋文字或案件狀態。</span></div>`;
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
  caseData.internal.quoteVersions = Array.isArray(caseData.internal.quoteVersions)
    ? caseData.internal.quoteVersions
    : [];
  caseData.internal.finalAmount = Number(caseData.internal.finalAmount ?? caseData.estimate?.total ?? 0);
  caseData.internal.adjustmentNote = caseData.internal.adjustmentNote || "";
  if (!paymentStatuses.includes(caseData.internal.paymentStatus)) {
    caseData.internal.paymentStatus = "未確認";
  }
  caseData.internal.note = caseData.internal.note || "";
  caseData.internal.detailSync = caseData.internal.detailSync || null;
  if (caseData.submission) {
    caseData.submission.archiveDir = caseData.submission.archiveDir || "";
    if (!Array.isArray(caseData.submission.versions)) {
      caseData.submission.versions = [
        {
          version: 1,
          files: caseData.submission.files || [],
          archiveDir: caseData.submission.archiveDir || "",
          note: caseData.submission.note || "",
          submittedAt: caseData.submission.submittedAt || "",
        },
      ];
    }
  }
  caseData.source = caseData.source || "online";
  if (!("ownerEmail" in caseData)) {
    caseData.ownerEmail = caseData.source === "online" ? caseData.customer?.email || "" : "";
  }
  caseData.paperOriginalReceived = Boolean(caseData.paperOriginalReceived);
  return caseData;
}

function renderStaffSummary(cases) {
  const panel = $("#staffSummary");
  if (!panel) return;
  const counts = [
    ["待確認報價", cases.filter((item) => item.status === "待報價確認").length],
    ["待確認文件", cases.filter((item) => ["已回傳", "文件待確認", "缺件"].includes(item.status)).length],
    ["檢測進行中", cases.filter((item) => item.status === "檢測中").length],
    ["待發布報告", cases.filter((item) => item.status === "報告完成" && !item.report?.publishedAt).length],
  ];
  panel.innerHTML = counts
    .map(
      ([label, count]) => `
        <article>
          <span>${label}</span>
          <strong>${count}</strong>
        </article>
      `
    )
    .join("");
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
        <div class="internal-card-title">
          <p class="eyebrow">${caseData.caseNo}｜${sourceLabels[caseData.source || "online"]}</p>
          <h4>${caseData.customer.companyName}</h4>
          <p>${caseData.sample.sampleName}｜${caseData.estimate.items.length} 項檢測</p>
        </div>
        <div class="internal-card-state">
          <strong>${money(caseData.internal.finalAmount)}</strong>
          <span class="status">${caseData.status}</span>
        </div>
      </header>

      <div class="internal-overview">
        <div><span>聯絡人</span><strong>${caseData.customer.contactName || "未填寫"}</strong></div>
        <div><span>電話</span><strong>${caseData.customer.phone || "未填寫"}</strong></div>
        <div><span>文件回傳</span><strong>${submittedAt}</strong></div>
        <div><span>付款</span><strong>${caseData.internal.paymentStatus}</strong></div>
      </div>

      <div class="internal-progress compact-progress">
        <div>
          <strong>內部進度</strong>
          <span>${progress.done}/${progress.total} 完成</span>
        </div>
        <div class="progress-track"><span style="width:${progress.percent}%"></span></div>
      </div>

      <div class="internal-primary-actions">
        <button class="ghost-button" type="button" data-view-case="${caseData.id}">查看完整資料</button>
        <button class="primary-button" type="button" data-send-quote="${caseData.id}">寄出報價單</button>
      </div>

      ${
        caseData.requests?.correction || caseData.requests?.cancel
          ? `<div class="request-review">
              ${caseData.requests.correction ? `<span>更正申請：${caseData.requests.correction.reason}</span><button class="ghost-button" type="button" data-return-correction="${caseData.id}">退回廠商更正</button>` : ""}
              ${caseData.requests.cancel ? `<span>取消申請：${caseData.requests.cancel.reason}</span><button class="ghost-button danger-button" type="button" data-confirm-cancel="${caseData.id}">確認取消</button>` : ""}
            </div>`
          : ""
      }

      <details class="case-workspace">
        <summary><span>案件處理與文件</span><small>報價 ${quoteApprovedAt}｜寄出 ${quoteSentAt}</small></summary>
        <div class="case-workspace-body">
          <section class="workspace-section">
            <h5>報價確認</h5>
            <div class="quote-review">
              <label>原始試算<input value="${caseData.estimate.total}" disabled /></label>
              <label>最終確認金額<input type="number" min="0" step="1" value="${caseData.internal.finalAmount}" data-final-amount="${caseData.id}" /></label>
              <label class="full-row">金額調整備註<textarea rows="2" data-adjustment-note="${caseData.id}" placeholder="金額有調整時必填。">${caseData.internal.adjustmentNote}</textarea></label>
              <p class="fine-print full-row">${caseData.internal.quoteVersions.length ? `目前版本：V${caseData.internal.quoteVersions.length}；重新確認會保留舊版。` : "尚未建立正式報價版本。"}</p>
            </div>
            <div class="workspace-actions">
              <button class="ghost-button" type="button" data-approve-quote="${caseData.id}">確認報價</button>
              <button class="primary-button" type="button" data-send-quote="${caseData.id}">寄出報價單</button>
            </div>
          </section>

          <section class="workspace-section">
            <h5>文件與系統作業</h5>
            <div class="workspace-actions">
              <button class="ghost-button" type="button" data-download-doc="${caseData.id}" data-doc-type="application">下載申請書</button>
              <button class="ghost-button" type="button" data-download-doc="${caseData.id}" data-doc-type="quote">下載報價單</button>
              <button class="ghost-button" type="button" data-print-memo="${caseData.id}">下載正式簽呈</button>
              <button class="ghost-button" type="button" data-sync-detail="${caseData.id}">${caseData.internal.detailSync?.syncedAt ? `已同步｜${caseData.internal.detailSync.testNumber}` : "同步檢測細目"}</button>
            </div>
            <div class="internal-files">
              <strong>廠商回傳文件</strong>
              ${files.length ? files.map((file) => `<span>${file}</span>`).join("") : `<span class="muted-inline">尚未回傳簽章文件</span>`}
              ${archiveDir ? `<small>歸檔位置：${archiveDir}</small>` : ""}
              ${submission?.note ? `<small>備註：${submission.note}</small>` : ""}
            </div>
          </section>

          <section class="workspace-section">
            <h5>案件管理</h5>
            <div class="internal-controls">
              <label>案件狀態<select data-internal-status="${caseData.id}">${caseStatuses.map((status) => `<option value="${status}" ${caseData.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
              <label>付款狀態<select data-internal-payment="${caseData.id}">${paymentStatuses.map((status) => `<option value="${status}" ${caseData.internal.paymentStatus === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
            </div>
            <div class="internal-steps">
              ${caseData.internal.steps.map((step, index) => `<label class="internal-step ${step.done ? "done" : ""}"><input type="checkbox" data-internal-step="${caseData.id}" data-step-index="${index}" ${step.done ? "checked" : ""} /><span>${step.name}</span>${step.completedAt ? `<small>${formatDateTime(step.completedAt)}</small>` : ""}</label>`).join("")}
            </div>
            <label class="internal-note">內部備註<textarea data-internal-note="${caseData.id}" rows="2" placeholder="僅供內部查看的案件備註。">${caseData.internal.note}</textarea></label>
          </section>

          <section class="workspace-section">
            <h5>會員綁定</h5>
            <div class="member-link-row">
              <label>手動綁定會員<select data-member-link-select="${caseData.id}"><option value="">未綁定會員</option>${state.members.map((member) => `<option value="${member.email}" ${caseData.ownerEmail === member.email ? "selected" : ""}>${member.companyName}｜${member.cName || member.contactName}｜${member.email}</option>`).join("")}</select></label>
              <button class="ghost-button" type="button" data-link-member="${caseData.id}">儲存綁定</button>
              ${!caseData.ownerEmail && caseData.customer.email ? `<button class="ghost-button" type="button" data-invite-member="${caseData.id}">邀請註冊</button>` : ""}
              ${caseData.invitation?.sentAt ? `<span class="muted-inline">已於 ${formatDateTime(caseData.invitation.sentAt)} 建立註冊邀請</span>` : ""}
            </div>
          </section>
        </div>
      </details>
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

function renderStaffCategoryFilter() {
  const serviceType = $("#staffServiceType")?.value || "paper";
  const select = $("#staffCategoryFilter");
  if (!select) return;
  select.innerHTML = categories
    .filter((category) => category.serviceType === serviceType)
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
}

function renderStaffTests() {
  const container = $("#staffTestList");
  if (!container) return;
  const category = $("#staffCategoryFilter")?.value || "paper";
  const items = testItems.filter((item) => item.category === category);
  container.innerHTML = items
    .map(
      (item) => `
        <label class="staff-test-item">
          <input type="checkbox" name="staffTests" value="${item.id}" />
          <span>${item.name}</span>
          <strong>${money(item.price)}</strong>
        </label>
      `
    )
    .join("");
}

function estimateFromItems(items, caseType = "一般件") {
  const rawSubtotal = items.reduce((sum, item) => sum + item.price, 0);
  const minimumAdjustment = rawSubtotal > 0 && rawSubtotal < 2500 ? 2500 - rawSubtotal : 0;
  const subtotal = rawSubtotal + minimumAdjustment;
  const rushMultiplier = caseType === "急件" ? 1.5 : caseType === "特急件" ? 2 : 1;
  const urgent = Math.round(subtotal * (rushMultiplier - 1));
  return {
    rawSubtotal,
    minimumAdjustment,
    subtotal,
    extraChineseReports: 0,
    englishReports: 0,
    reportFee: 0,
    urgent,
    caseType,
    rushMultiplier,
    tax: 0,
    total: subtotal + urgent,
    items,
  };
}

function calculateStaffEstimate() {
  const form = $("#staffIntakeForm");
  if (!form) return estimateFromItems([]);
  const selected = [...form.querySelectorAll('input[name="staffTests"]:checked')].map((input) => input.value);
  const items = testItems.filter((item) => selected.includes(item.id));
  const estimate = estimateFromItems(items, form.elements.caseType.value);
  $("#staffEstimateTotal").textContent = money(estimate.total);
  return estimate;
}

function renderStaffMemberSelect() {
  const select = $("#staffMemberSelect");
  if (!select) return;
  select.innerHTML =
    `<option value="">暫不綁定會員</option>` +
    state.members
      .map((member) => `<option value="${member.email}">${member.companyName}｜${member.cName || member.contactName}｜${member.email}</option>`)
      .join("");
}

function renderStaffIntake() {
  renderStaffMemberSelect();
  renderStaffCategoryFilter();
  renderStaffTests();
  calculateStaffEstimate();
}

function fillStaffIntakeFromMember(email) {
  const member = findMemberByEmail(email);
  const form = $("#staffIntakeForm");
  if (!member || !form) return;
  const user = memberToUser(member);
  fillForm(form, {
    companyName: user.companyName,
    taxId: user.taxId,
    contactName: user.contactName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    invoiceAddress: user.invoiceAddress,
  });
}

function submitStaffIntake(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = readForm(form);
  const estimate = calculateStaffEstimate();
  if (!estimate.items.length) {
    alert("請至少選擇一個檢測項目。");
    return;
  }
  const formData = {
    ...data,
    sampleReturn: "不取回",
    reportDelivery: "郵寄",
    extraChineseReports: 0,
    englishReports: 0,
    fax: "",
    mobile: "",
    jobTitle: "",
  };
  const newCase = createCase(formData, estimate, {
    source: data.source,
    ownerEmail: data.linkedMemberEmail || "",
    paperOriginalReceived: data.paperOriginalReceived === "on",
    intakeNote: data.intakeNote || "",
  });
  state.cases.unshift(newCase);
  state.activeCase = newCase;
  saveState();
  form.reset();
  renderKanban();
  setView("admin");
  alert(`已建立案件 ${newCase.caseNo}。`);
}

function renderSubmission() {
  renderSubmissionSelect();
  renderSubmissionStatus();
  syncSubmissionFormState();
}

function renderSubmissionSelect() {
  const select = $("#submissionCaseSelect");
  if (!select) return;
  const cases = vendorCases();
  select.innerHTML =
    cases
      .map(
        (item) =>
          `<option value="${item.id}">${item.caseNo}｜${item.sample.sampleName}｜${item.status}</option>`
      )
      .join("") || `<option value="">尚無可繳交案件</option>`;
  if (state.activeCase && cases.some((item) => item.id === state.activeCase.id)) select.value = state.activeCase.id;
}

function renderSubmissionStatus() {
  const panel = $("#submissionStatus");
  if (!panel) return;
  const cases = vendorCases();
  const caseData = state.activeCase && cases.some((item) => item.id === state.activeCase.id) ? state.activeCase : cases[0];
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
    ? "請確認收到的正式申請書與報價單內容，完成簽名蓋章後，分別上傳 PDF 或 Word 檔。"
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
  const cases = vendorCases();
  const caseData = state.activeCase && cases.some((item) => item.id === state.activeCase.id) ? state.activeCase : cases[0];
  const canSubmit = Boolean(
    caseData && (caseData.internal?.quoteSentAt || uploadReadyStatuses.has(caseData.status))
  );
  form.querySelectorAll("input, textarea, button").forEach((element) => {
    element.disabled = !canSubmit;
  });
}

async function downloadOfficialDocx(caseData, docType, { submit = false } = {}) {
  const isQuote = docType === "quote";
  const isMemo = docType === "memo";
  const endpoint = isMemo
    ? "/api/generate-memo"
    : isQuote
      ? "/api/generate-quote"
      : submit ? "/api/submit-application" : "/api/generate-application";
  const label = isMemo ? "內部簽呈" : isQuote ? "報價單" : "申請書";

  if (window.location.protocol === "file:") {
    throw new Error(`正式 Word ${label}需要從本機後端開啟。請使用 http://127.0.0.1:8765/ 進入系統。`);
  }

  const payload =
    isQuote && Number.isFinite(Number(caseData.internal?.finalAmount))
      ? {
          ...caseData,
          estimate: {
            ...caseData.estimate,
            total: Number(caseData.internal.finalAmount),
          },
        }
      : caseData;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
  const applicationFile = form.elements.signedApplication.files[0];
  const quoteFile = form.elements.signedQuote.files[0];
  const selectedFiles = [applicationFile, quoteFile].filter(Boolean);

  if (!caseData) {
    alert("請先選擇要繳交的案件。");
    return;
  }
  if (!caseData.internal?.quoteSentAt && !uploadReadyStatuses.has(caseData.status)) {
    alert("報價單尚未由印研中心確認並寄出，暫時不能回傳簽章文件。");
    return;
  }
  if (!applicationFile || !quoteFile) {
    alert("請分別上傳已簽章申請書與報價單。");
    return;
  }
  const allowedExtensions = new Set(["pdf", "doc", "docx"]);
  const invalidFile = selectedFiles.find((file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    return !allowedExtensions.has(extension) || file.size > 20 * 1024 * 1024;
  });
  if (invalidFile) {
    alert(`${invalidFile.name} 格式不符或超過 20 MB。`);
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

  const previousVersions = caseData.submission?.versions || [];
  const currentVersion = {
    version: previousVersions.length + 1,
    files: uploadedFiles,
    archiveDir,
    note: form.elements.submissionNote.value || "",
    submittedAt: new Date().toISOString(),
  };
  caseData.status = "文件待確認";
  caseData.submission = {
    ...currentVersion,
    versions: [...previousVersions, currentVersion],
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

async function submitMemberLogin(event) {
  event.preventDefault();
  const data = readForm(event.currentTarget);
  const member = findMemberByEmail(data.email);
  if (!member || !(await verifyMemberPassword(member, data.password))) {
    alert("帳號或密碼不正確。");
    return;
  }
  loginMember(member);
}

async function submitMemberRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = readForm(form);
  if (registrationIsTemporarilyLocked()) {
    alert("註冊嘗試次數過多，請 10 分鐘後再試。 ");
    return;
  }
  if (String(data.website || "").trim()) {
    recordRegistrationFailure();
    window.grecaptcha?.reset();
    alert("驗證失敗，請重新操作。");
    return;
  }
  const recaptchaToken = String(data["g-recaptcha-response"] || "").trim();
  if (!recaptchaToken) {
    recordRegistrationFailure();
    alert("請先完成安全驗證。");
    return;
  }
  try {
    await verifyRecaptchaToken(recaptchaToken);
  } catch (error) {
    recordRegistrationFailure();
    window.grecaptcha?.reset();
    alert(error.message);
    return;
  }
  data.email = String(data.email || "").trim().toLowerCase();
  if (findMemberByEmail(data.email)) {
    alert("此 Email 已註冊，請改用登入。");
    return;
  }
  if (!isValidMemberPassword(data.password)) {
    alert("密碼至少 8 個字元，並需同時包含英文字母與數字。");
    return;
  }
  if (data.password !== data.confirmPassword) {
    alert("兩次輸入的密碼不一致。");
    return;
  }
  if (!data.privacyConfirm) {
    alert("請先勾選資料使用同意。");
    return;
  }
  if (!String(data.phone || "").trim() && !String(data.mobile || "").trim()) {
    alert("市內電話與行動電話請至少填寫一項。");
    return;
  }

  const passwordRecord = await createPasswordRecord(data.password);

  const member = {
    id: crypto.randomUUID(),
    cName: String(data.cName || "").trim(),
    englishName: String(data.englishName || "").trim(),
    email: data.email,
    ...passwordRecord,
    companyName: String(data.companyName || "").trim(),
    taxId: String(data.taxId || "").trim(),
    phone: String(data.phone || "").trim(),
    extension: String(data.extension || "").trim(),
    mobile: String(data.mobile || "").trim(),
    jobTitle: "",
    address: String(data.address || "").trim(),
    invoiceAddress: String(data.invoiceAddress || data.address || "").trim(),
    fax: "",
    emailVerified: true,
    privacyConsent: {
      version: privacyNoticeVersion,
      consentedAt: new Date().toISOString(),
    },
  };
  state.members.push(member);
  localStorage.removeItem(registrationAttemptKey);
  form.reset();
  updatePasswordStrength("");
  window.grecaptcha?.reset();
  alert("Demo 已模擬完成 Email 驗證，現在登入會員系統。");
  loginMember(member);
}

function submitStaffLogin(event) {
  event.preventDefault();
  const data = readForm(event.currentTarget);
  if (String(data.email).toLowerCase() !== demoStaff.email || data.password !== demoStaff.password) {
    alert("內部帳號或密碼不正確。");
    return;
  }
  state.user = { ...demoStaff };
  state.role = "staff";
  saveState();
  syncAccountUi();
  syncRoleUi();
  setView("admin");
}

function bindEvents() {
  $("#quoteForm").noValidate = true;

  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.view === "quote" && currentViewName() !== "quote") startNewApplication();
      else setView(button.dataset.view);
    });
  });

  $("#memberLoginForm").addEventListener("submit", submitMemberLogin);
  $("#registerForm").onsubmit = (event) => { event.preventDefault(); alert("公開展示請使用「使用展示帳號」體驗。"); };
  $("#staffLoginForm").addEventListener("submit", submitStaffLogin);
  $("#useDemoMemberBtn").addEventListener("click", () => loginMember(demoMember));
  $("#staffEntryBtn").addEventListener("click", () => {
    state.user = null;
    state.role = "guest";
    saveState();
    syncAccountUi();
    syncRoleUi();
    setView("staffLogin");
  });
  $("#logoutBtn").addEventListener("click", () => {
    if (draftSaveTimer !== null) saveCurrentDraft();
    state.user = null;
    state.role = "guest";
    localStorage.removeItem("ptri_user");
    localStorage.setItem("ptri_role", "guest");
    syncAccountUi();
    syncRoleUi();
    setView("login");
  });

  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.user = readForm(event.currentTarget);
    const member = findMemberByEmail(state.user.email);
    if (member) {
      Object.assign(member, {
        companyName: state.user.companyName,
        taxId: state.user.taxId,
        cName: state.user.contactName,
        phone: state.user.phone,
        mobile: state.user.mobile,
        jobTitle: state.user.jobTitle,
        address: state.user.address,
        invoiceAddress: state.user.invoiceAddress,
        fax: state.user.fax,
      });
    }
    saveState();
    syncAccountUi();
    alert("帳戶資料已更新。");
  });

  $("#quoteForm").addEventListener("input", () => {
    calculateEstimate();
    scheduleDraftSave();
  });
  $("#quoteForm").addEventListener("change", () => {
    calculateEstimate();
    scheduleDraftSave();
  });
  $("#quoteForm").addEventListener("submit", reviewQuote);
  $("#confirmQuote").onclick = () => { $("#quoteReview").close(); alert("展示完成。此頁未建立正式案件。"); };
  $("#editQuote").onclick = () => $("#quoteReview").close();
  $$(".application-tabs button").forEach(button => {
    button.onclick = () => showQuoteSection(button.getAttribute("aria-controls"));
  });
  const sheet = $("#estimateSheet");
  $("#openEstimate").onclick = () => {
    sheet.append($("#quoteEstimate"));
    sheet.showModal();
  };
  $("#closeEstimate").onclick = () => sheet.close();
  sheet.addEventListener("close", () => $("#estimateDock").append($("#quoteEstimate")));
  matchMedia("(max-width: 760px)").addEventListener("change", () => {
    if (sheet.open) sheet.close();
  });
  $("#serviceType").addEventListener("change", () => {
    renderCategoryFilter();
    renderTests();
    calculateEstimate();
  });
  $("#categoryFilter").addEventListener("change", () => {
    $$("#testList [data-category]").forEach(row => {
      row.hidden = row.dataset.category !== $("#categoryFilter").value;
    });
    calculateEstimate();
  });
  $("#newApplicationBtn").addEventListener("click", startNewApplication);
  $("#staffIntakeForm").addEventListener("submit", submitStaffIntake);
  $("#staffCaseSearch")?.addEventListener("input", renderKanban);
  $("#staffCaseStatusFilter")?.addEventListener("change", renderKanban);
  $("#staffServiceType").addEventListener("change", () => {
    renderStaffCategoryFilter();
    renderStaffTests();
    calculateStaffEstimate();
  });
  $("#staffCategoryFilter").addEventListener("change", () => {
    renderStaffTests();
    calculateStaffEstimate();
  });
  $("#staffIntakeForm").addEventListener("change", (event) => {
    if (event.target.name === "linkedMemberEmail") fillStaffIntakeFromMember(event.target.value);
    if (event.target.name === "source") {
      event.currentTarget.elements.paperOriginalReceived.checked = event.target.value === "paper";
    }
    calculateStaffEstimate();
  });

  const registerForm = $("#registerForm");
  const syncInvoiceAddress = () => {
    if (!registerForm.elements.sameInvoiceAddress.checked) return;
    registerForm.elements.invoiceAddress.value = registerForm.elements.address.value;
    registerForm.elements.invoiceAddress.readOnly = true;
  };
  registerForm.elements.sameInvoiceAddress.addEventListener("change", () => {
    registerForm.elements.invoiceAddress.readOnly = registerForm.elements.sameInvoiceAddress.checked;
    syncInvoiceAddress();
  });
  registerForm.elements.address.addEventListener("input", syncInvoiceAddress);
  registerForm.elements.password.addEventListener("input", (event) => {
    updatePasswordStrength(event.target.value);
  });
  registerForm.elements.showRegistrationPassword.addEventListener("change", (event) => {
    const type = event.target.checked ? "text" : "password";
    registerForm.elements.password.type = type;
    registerForm.elements.confirmPassword.type = type;
  });

  const privacyDialog = $("#privacyNoticeDialog");
  $("#openPrivacyNoticeBtn").addEventListener("click", () => privacyDialog.showModal());
  $("#closePrivacyNoticeBtn").addEventListener("click", () => privacyDialog.close());
  $("#dismissPrivacyNoticeBtn").addEventListener("click", () => privacyDialog.close());
  $("#acceptPrivacyNoticeBtn").addEventListener("click", () => {
    registerForm.elements.privacyConfirm.checked = true;
    privacyDialog.close();
  });
  privacyDialog.addEventListener("click", (event) => {
    if (event.target === privacyDialog) privacyDialog.close();
  });

  document.body.addEventListener("click", async (event) => {
    if (event.target.dataset.goVendorLogin !== undefined) {
      setView("login");
      return;
    }

    const directView = event.target.dataset.view;
    if (directView && !event.target.classList.contains("nav-item")) {
      setView(directView);
      return;
    }

    const caseTab = event.target.dataset.caseTab;
    if (caseTab) {
      $$("[data-case-tab]").forEach((tab) => tab.classList.toggle("active", tab.dataset.caseTab === caseTab));
      $$("[data-case-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.casePanel === caseTab));
      return;
    }

    const openDraftId = event.target.dataset.openDraft;
    if (openDraftId) {
      openDraft(openDraftId);
      return;
    }

    const deleteDraftId = event.target.dataset.deleteDraft;
    if (deleteDraftId) {
      if (!confirm("確定要刪除這份草稿？")) return;
      state.drafts = state.drafts.filter((draft) => draft.id !== deleteDraftId);
      if (state.activeDraftId === deleteDraftId) state.activeDraftId = null;
      saveState();
      renderDrafts();
      return;
    }

    const viewCaseId = event.target.dataset.viewCase;
    if (viewCaseId) {
      const caseData = state.cases.find((item) => item.id === viewCaseId);
      if (caseData) {
        state.activeCase = caseData;
        setView("caseDetail");
      }
      return;
    }

    if (event.target.dataset.backCases !== undefined) {
      setView(isInternalMode() ? "admin" : "cases");
      return;
    }

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
        await downloadOfficialDocx(caseData, "memo");
      }
      return;
    }

    const syncDetailCaseId = event.target.dataset.syncDetail;
    if (syncDetailCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === syncDetailCaseId));
      if (caseData) await syncCaseToDetail(caseData, event.target);
      return;
    }

    const approveCaseId = event.target.dataset.approveQuote;
    if (approveCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === approveCaseId));
      if (!caseData) return;
      const amountInput = document.querySelector(`[data-final-amount="${approveCaseId}"]`);
      const noteInput = document.querySelector(`[data-adjustment-note="${approveCaseId}"]`);
      const finalAmount = Number(amountInput?.value || caseData.estimate.total);
      const adjustmentNote = String(noteInput?.value || "").trim();
      if (finalAmount !== caseData.estimate.total && !adjustmentNote) {
        alert("調整金額時必須填寫備註。");
        noteInput?.focus();
        return;
      }
      caseData.internal.finalAmount = finalAmount;
      caseData.internal.adjustmentNote = adjustmentNote;
      caseData.internal.quoteVersions.push({
        version: caseData.internal.quoteVersions.length + 1,
        amount: finalAmount,
        note: adjustmentNote,
        approvedAt: new Date().toISOString(),
      });
      caseData.internal.quoteApprovedAt = new Date().toISOString();
      caseData.status = "報價已確認";
      markInternalStep(caseData, "製作申請簽呈");
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
      if (!caseData.internal.quoteApprovedAt || !caseData.internal.quoteVersions.length) {
        alert("請先確認最終金額並建立正式報價版本。");
        return;
      }
      caseData.internal.quoteSentAt = new Date().toISOString();
      caseData.status = "報價單已寄出";
      syncCaseStepsFromStatus(caseData);
      saveState();
      renderCases();
      renderKanban();
      renderSubmission();
      return;
    }

    const inviteCaseId = event.target.dataset.inviteMember;
    if (inviteCaseId) {
      const caseData = state.cases.find((item) => item.id === inviteCaseId);
      if (!caseData) return;
      caseData.invitation = { email: caseData.customer.email, sentAt: new Date().toISOString(), demo: true };
      saveState();
      renderKanban();
      alert(`Demo 已建立寄給 ${caseData.customer.email} 的會員註冊邀請。`);
      return;
    }

    const linkCaseId = event.target.dataset.linkMember;
    if (linkCaseId) {
      const caseData = state.cases.find((item) => item.id === linkCaseId);
      const select = document.querySelector(`[data-member-link-select="${linkCaseId}"]`);
      if (!caseData || !select) return;
      caseData.ownerEmail = select.value;
      saveState();
      renderKanban();
      alert(select.value ? "已完成會員綁定。" : "已取消會員綁定。");
      return;
    }

    const correctionCaseId = event.target.dataset.requestCorrection;
    if (correctionCaseId) {
      const reason = prompt("請填寫需要更正的原因：");
      if (!reason?.trim()) return;
      const caseData = state.cases.find((item) => item.id === correctionCaseId);
      caseData.requests = caseData.requests || {};
      caseData.requests.correction = { reason: reason.trim(), requestedAt: new Date().toISOString() };
      saveState();
      renderCaseDetail();
      alert("已送出更正申請，待同仁退回後才能修改。");
      return;
    }

    const cancelCaseId = event.target.dataset.requestCancel;
    if (cancelCaseId) {
      const reason = prompt("請填寫取消原因：");
      if (!reason?.trim()) return;
      const caseData = state.cases.find((item) => item.id === cancelCaseId);
      caseData.requests = caseData.requests || {};
      caseData.requests.cancel = { reason: reason.trim(), requestedAt: new Date().toISOString() };
      caseData.status = "取消申請中";
      saveState();
      renderCases();
      renderCaseDetail();
      alert("取消申請已送出，案件資料會保留。");
      return;
    }

    const returnCaseId = event.target.dataset.returnCorrection;
    if (returnCaseId) {
      const caseData = state.cases.find((item) => item.id === returnCaseId);
      caseData.status = "退回更正";
      saveState();
      renderKanban();
      return;
    }

    const confirmCancelId = event.target.dataset.confirmCancel;
    if (confirmCancelId) {
      const caseData = state.cases.find((item) => item.id === confirmCancelId);
      caseData.status = "已取消";
      saveState();
      renderKanban();
      return;
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
    if (noteCaseId) {
      const caseData = ensureInternalCase(state.cases.find((item) => item.id === noteCaseId));
      if (!caseData) return;
      caseData.internal.note = event.target.value;
      saveState();
      return;
    }
    const amountCaseId = event.target.dataset.finalAmount;
    const adjustmentCaseId = event.target.dataset.adjustmentNote;
    const caseId = amountCaseId || adjustmentCaseId;
    if (!caseId) return;
    const caseData = ensureInternalCase(state.cases.find((item) => item.id === caseId));
    if (!caseData) return;
    if (amountCaseId) caseData.internal.finalAmount = Number(event.target.value || 0);
    if (adjustmentCaseId) caseData.internal.adjustmentNote = event.target.value;
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
    localStorage.setItem("ptri_members", JSON.stringify([demoMember]));
    localStorage.removeItem("ptri_cases");
    localStorage.removeItem("ptri_drafts");
    state.members = [demoMember];
    state.user = memberToUser(demoMember);
    state.role = "vendor";
    state.cases = [];
    state.drafts = [];
    state.activeDraftId = null;
    syncAccountUi();
    syncRoleUi();
    setView("cases");
  });
}

function init() {
  showQuoteSection("quoteTests");
  renderCategoryFilter();
  renderTests();
  markRequiredFields($("#quoteForm"));
  markRequiredFields($("#registerForm"));
  markRequiredFields($("#staffIntakeForm"));
  bindEvents();
  syncAccountUi();
  syncRoleUi();
  calculateEstimate();
  purgeExpiredDrafts();
  setView(state.user ? (isInternalMode() ? "admin" : "cases") : "login");
}

init();
