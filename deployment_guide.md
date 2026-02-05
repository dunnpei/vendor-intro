# GitHub Pages 部署指南

本專案已設定好 GitHub Pages 的部署流程。請依照以下步驟將網站發布上線。

## ⚠️ 重要提示：關於 Repository 選擇

您提供的網址 `.../Webs/tree/main/Harvard/vendor` 屬於一個已經存在的倉庫 (`Webs`) 的子目錄。

**強烈建議您不要使用現有的 `Webs` 倉庫**，因為：
1.  Git **無法**直接將專案推送到遠端倉庫的「特定子資料夾」。它預設會同步整個倉庫。
2.  如果您強制推送，可能會**覆蓋掉您 `Webs` 倉庫裡原本所有的檔案**。
3.  `gh-pages` 部署腳本預設會佔用該倉庫的 `gh-pages` 分支，可能導致您原本在該倉庫的其他網頁被覆蓋。

### ✅ 最佳做法
**請在 GitHub 上「建立一個全新的 Repository」**（例如命名為 `harvard-vendor`），專門用來放這個專案。這樣最安全，管理也最方便。

---

## 1. 建立全新 GitHub Repository
1.  登入 [GitHub](https://github.com)。
2.  點擊右上角 `+` > **New repository**。
3.  Repository name 填入：`harvard-vendor` (或您喜歡的名字)。
4.  **不要** 勾選 "Initialize with README" 或其他初始化選項。
5.  點擊 **Create repository**。

## 2. 推送程式碼
請在專案目錄下打開終端機（或使用 VS Code 終端機），依序執行以下指令：

```bash
# 加入所有檔案
git add .

# 提交變更
git commit -m "Initial commit"

# 設定遠端倉庫 (請將網址換成您「新建立」的 repo網址)
# 網址結尾通常是 .git，例如：
git remote add origin https://github.com/您的帳號/harvard-vendor.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 3. 一鍵部署
程式碼推送到 GitHub 後，請執行以下指令將網站發布到 GitHub Pages：

```bash
npm run deploy
```

等待約 1-2 分鐘後，您的網站將會在：
`https://您的帳號.github.io/harvard-vendor/`

## 4. 最後一步：API 設定
由於 GitHub Pages 是靜態網頁，無法讀取本地的 `.env.local`。
1. 若要讓網站能讀取 Google Sheet，請到 GitHub 該倉庫的 **Settings** > **Secrets and variables** > **Actions**。
2. 新增一個 Repository Secret：
   - Name: `VITE_GOOGLE_SHEET_API_URL`
   - Secret: (您的 Google Web App URL)
3. 或者，最簡單的方式是修改本地的 `services/sheetService.ts`，直接將網址寫入程式碼中（取代 `import.meta.env...`），再重新執行部署。
