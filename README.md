# 印研中心檢測線上報價 MVP

這是一個前端靜態 MVP，用來展示「客戶登入、線上詢價、選擇檢測項目、產生申請書/報價單/內部簽呈」的核心流程。

## 目前包含

- Demo 登入與客戶資料自動帶入
- 新增詢價表單
- 樣品資料填寫
- 檢測項目選擇與預估金額計算
- 依 114 年 6 月 1 日收費標準建立紙張、油墨、印刷品、水槽液與其他服務價目
- 急件 1.5 倍、特急件 2 倍與每案最低 NT$2,500 計費；價目已含稅，不再另加 5%
- 每案內含中文正式報告 1 份；加購中文報告 NT$100/份，英文報告 NT$200/份
- 前台填寫欄位對齊官方申請書中廠商需填欄位
- 首次申請廠商提示須提供工廠登記證、公司執照或其他證明文件其中一項
- 歷史案件列表
- 內部後台案件看板
- 申請書、報價單、內部簽呈 HTML 預覽
- 列印/轉 PDF 與 HTML 下載

## MVP 限制

這版是 GitHub Pages 可展示的靜態版本，資料存在瀏覽器 `localStorage`，登入也只是 demo。正式部署到印研中心內部伺服器時，應改成後端資料庫與正式權限控管。

「商借儀器」、「數位典藏色彩檢測打樣」等費用另計項目尚未納入自動估價，正式版建議改成需人工確認的詢價項目。

## 建議下一階段

1. 改成 Laravel 或 Next.js 後端專案。
2. 加入真正客戶登入、密碼雜湊、忘記密碼。
3. 將案件、樣品、檢測項目、文件紀錄存入 MySQL/PostgreSQL。
4. 將目前 HTML 文件預覽改為 Word 模板套印與 PDF 產生。
5. 加入 Email 自動寄送與內部同仁通知。
6. 後台加入案件狀態、報價調整、文件版本紀錄與操作紀錄。

## 正式申請書輸出

正式申請書必須使用原始 Word 模板，不能用 HTML 重新排版。`tools/fill_official_application.py` 會複製官方 `.docx` 模板，只填入欄位與勾選項目，保留原本版面、表格、字型與頁面設定。

範例：

```powershell
& 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' tools\fill_official_application.py data\sample_case_paper.json --out generated_forms\sample_paper_application.docx
```

正式部署時，請將官方模板放在伺服器私有目錄，不要放在公開網站目錄。
簽呈功能需要部署人員另外放置內部 Word 範本至 `templates/memo_template.docx`。
此檔案由部署主機保管，Git 儲存庫不包含該檔案。正式對外開放前，須限制靜態檔案服務可讀取的目錄。

## 本機開啟

直接用瀏覽器開啟 `index.html` 即可。

若要下載正式 Word 申請書，請啟動本機後端：

```powershell
& 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' server.py
```

然後開啟：

```text
http://127.0.0.1:8765/
```

## 註冊安全驗證

啟動前須在主機設定 `RECAPTCHA_SECRET_KEY`，並搭配 `index.html` 中同一組的公開 site key。
目前頁面使用測試 site key。正式部署時請替換為正式網域的金鑰組，私密金鑰只設定在主機。

## 線上申請 LINE 通知

廠商送出新申請後，主機會將 Word 申請書保存到
`generated_forms/online_intake/<完整收件 ID>/申請書.docx`，然後在背景通知指定的人員。
通知包含廠商名稱、檢測類別、案件類型、勾選項目數量和台灣收件時間。
「申請書查找碼」是資料夾名稱的前 12 個字元。收件資料夾從主機檔案總管查看，網頁的「我的案件」仍依各瀏覽器保存。
重新下載申請書或由同仁代建案件不會發送通知。

在啟動 `server.py` 的 PowerShell 視窗設定下列環境變數，並重新啟動服務：

```powershell
$env:PTRI_LINE_CHANNEL_ACCESS_TOKEN = '<LINE Messaging API channel access token>'
$env:PTRI_LINE_USER_IDS = '<承辦人 user ID>,<組長 user ID>'
```

收件人可設定一位或多位，須先加該 LINE 官方帳號好友。
收件 ID 是 Messaging API 的 `U...` user ID，可依 [LINE 官方說明](https://developers.line.biz/en/docs/messaging-api/getting-user-ids/) 取得。
兩項環境變數皆未設定時，申請流程照常運作，LINE 通知停用。請勿把權杖寫入前端、版本庫或共享文件。
測試版每個伺服器程序每 24 小時最多排入 30 筆通知。超限或發送失敗會記在伺服器日誌，申請書仍會保存。

### 由主機檔案管理 LINE 收件人

#### 讓同事在 LINE 查自己的 ID

1. 到發送檢測通知的 Messaging API channel，在 Basic settings 取得 Channel secret。在啟動 RPA 的 PowerShell 輸入以下指令，再啟動新版 `server.py`。服務另需同一個 channel 的 `PTRI_LINE_CHANNEL_ACCESS_TOKEN`。

   ```powershell
   $env:PTRI_LINE_CHANNEL_SECRET = [System.Net.NetworkCredential]::new('', (Read-Host 'Channel secret' -AsSecureString)).Password
   ```

2. 在對外 HTTPS 入口只轉送 `POST /webhook/line-id` 至 `http://127.0.0.1:8765/webhook/line-id`，保留原始請求內容及 `X-Line-Signature`。名單管理與專案目錄留在內網。
3. 在該 channel 的 Messaging API → Webhook settings 填入外部 HTTPS 網址加上 `/webhook/line-id`，儲存，按 Verify，顯示 Success 後開啟 Use webhook。若該 channel 已有其他機器人使用 Webhook，請先整合既有接收端再切換。
4. 請同事加官方帳號好友，用一對一聊天傳「查詢我的ID」。官方帳號單獨回覆本人的完整代碼，方便長按複製。承辦核對身分後，再到後台新增收件人。

網址驗證會收到 LINE 簽章與空事件清單，成功時回應 HTTP 200。群組、多人聊天室和其他指令會略過。

也可在網頁「內部同仁登入 → LINE 通知收件人」直接管理同一份名單。啟動後端前，在服務環境設定獨立的強密碼 `PTRI_LINE_ADMIN_PASSWORD`。於本機 PowerShell 可用以下指令輸入，再於同一視窗啟動 `server.py`：

```powershell
$env:PTRI_LINE_ADMIN_PASSWORD = [System.Net.NetworkCredential]::new('', (Read-Host '設定 LINE 名單管理密碼' -AsSecureString)).Password
```

輸入管理密碼載入名單，可修改姓名、ID、勾選通知或移除收件人。網頁儲存後立即套用；LINE 權杖繼續由服務主機提供。後端未設定管理密碼時會關閉名單 API。遠端操作請使用 HTTPS，並給服務帳號名單目錄的修改權。離開該頁後需再次輸入管理密碼。

Windows 可雙擊 `LINE收件人管理.cmd`，按「新增」填入姓名及 LINE user ID，點選「通知」欄切換啟用狀態，再按「儲存名單」。工具需要含 Tk 的 Python 3.10 以上版本；啟動器會先使用本機 Codex Python，否則使用 Windows 的 `py -3`。

在同一 Windows 帳號下，工具與後端預設使用 `%LOCALAPPDATA%\PTRI\line-recipients.txt`。第一次儲存後請重新啟動 RPA，之後儲存即對下一筆新申請生效。首次建立名單時，工具會帶入其啟動環境中已有的 `PTRI_LINE_USER_IDS`。設定了 `PTRI_LINE_RECIPIENTS_FILE` 時，工具與服務都優先使用指定位置。若以不同帳號執行或已在另一個 PowerShell 視窗指定路徑，請確保兩邊使用同一個絕對路徑。服務帳號需有讀取權，管理人員需對所在資料夾有修改權。

正式主機可在服務的啟動環境設定 `PTRI_LINE_RECIPIENTS_FILE`，例如 `C:\ProgramData\PTRI\line-recipients.txt`。請使用網站目錄外的絕對路徑，讓服務帳號可讀、指定管理人員可修改。權杖仍由 `PTRI_LINE_CHANNEL_ACCESS_TOKEN` 提供。

以 UTF-8 儲存名單，每行填一個實際 LINE user ID，最多 10 人。`#` 後方可寫姓名或職稱。以下為格式示意：

```text
U0123456789abcdef0123456789abcdef  # 承辦人
# Uabcdef0123456789abcdef0123456789  # 組長（暫停通知）
```

首次設定或更換檔案路徑後，重新啟動服務。之後以記事本修改名單並存檔，下一筆新申請即採用更新名單。整行加上 `#` 可暫停該人，全部註解可暫停通知。只要指定了名單檔，該檔就是唯一的收件人來源。若讀取失敗或有無效 ID，本筆申請仍保存，通知略過並記錄於主機日誌。
