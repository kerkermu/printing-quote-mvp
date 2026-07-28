# 印研中心檢測線上報價 MVP

這是一個前端靜態 MVP，用來展示「客戶登入、線上詢價、選擇檢測項目、產生申請書/報價單/內部簽呈」的核心流程。

## 目前包含

- Demo 登入與客戶資料自動帶入
- 新增詢價表單
- 樣品資料填寫
- 檢測項目選擇與預估金額計算
- 依 114 年 6 月 1 日收費標準建立紙張、油墨、印刷品、水槽液與其他服務價目
- 急件 1.5 倍與每案最低 NT$2,500 計費
- 前台填寫欄位對齊官方申請書中廠商需填欄位
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
