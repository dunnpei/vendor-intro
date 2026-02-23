@echo off
setlocal EnableDelayedExpansion

rem ==============================
rem  Deploy 工作流程（含自動 pull）
rem ==============================

rem ----- 1. git add -----
echo -------------------------------------------------
echo 正在執行: git add .
git add .
if errorlevel 1 (
    echo [ERROR] git add 失敗，請確認 Git 已安裝且路徑正確。
    pause
    exit /b 1
)

rem ----- 2. git commit -----
echo -------------------------------------------------
echo 正在執行: git commit -m "修改了標題文字"
git commit -m "修改了標題文字"
if %errorlevel% EQU 1 (
    echo [INFO] 目前沒有變更需要提交，跳過 commit。
) else if %errorlevel% NEQ 0 (
    echo [ERROR] git commit 發生錯誤。
    pause
    exit /b 1
)

rem ----- 3. 拉下遠端最新 (rebase) -----
echo -------------------------------------------------
echo 正在執行: git pull --rebase
git pull --rebase
if %errorlevel% NEQ 0 (
    echo [ERROR] git pull --rebase 失敗，可能產生衝突。
    echo 請手動解決衝突後執行 "git rebase --continue" 或 "git rebase --abort"
    pause
    exit /b 1
)

rem ----- 4. git push -----
echo -------------------------------------------------
echo 正在執行: git push
git push
if %errorlevel% NEQ 0 (
    echo [ERROR] git push 失敗，請檢查遠端是否仍有未拉取的變更。
    pause
    exit /b 1
)

rem ----- 5. npm run deploy -----
echo -------------------------------------------------
echo 正在執行: npm run deploy
npm run deploy
if %errorlevel% NEQ 0 (
    echo [ERROR] npm run deploy 失敗。
    pause
    exit /b 1
)

echo -------------------------------------------------
echo ? 所有步驟完成！網站已成功部署至 GitHub Pages。
pause