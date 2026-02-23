@echo off
rem =========================================================
rem  Deploy 工作流程
rem  1. git add .
rem  2. git commit -m "修改了標題文字"
rem  3. git push
rem  4. npm run deploy
rem =========================================================

rem -------------- 1. 把所有變更加入暫存 --------------
echo -------------------------------------------------
echo 正在執行: git add .
git add .
if errorlevel 1 (
    echo [ERROR] git add 失敗，請檢查 Git 是否已安裝或工作目錄是否正確。
    pause
    exit /b 1
)

rem -------------- 2. 提交變更 --------------
echo -------------------------------------------------
echo 正在執行: git commit -m "修改了標題文字"
git commit -m "修改了標題文字"
rem 若沒有變更可以直接跳過 commit 步驟
if %errorlevel%==1 (
    echo [INFO] 目前沒有變更需要提交，跳過 commit。
) else if %errorlevel% NEQ 0 (
    echo [ERROR] git commit 失敗。
    pause
    exit /b 1
)

rem -------------- 3. 推送到遠端 --------------
echo -------------------------------------------------
echo 正在執行: git push
git push
if %errorlevel% NEQ 0 (
    echo [ERROR] git push 失敗。可能是遠端有更新，請先執行 git pull 再重試。
    pause
    exit /b 1
)

rem -------------- 4. 部署至 GitHub Pages --------------
echo -------------------------------------------------
echo 正在執行: npm run deploy
npm run deploy
if %errorlevel% NEQ 0 (
    echo [ERROR] npm run deploy 失敗。
    pause
    exit /b 1
)

echo -------------------------------------------------
echo 所有步驟完成！網站已成功部署。
pause