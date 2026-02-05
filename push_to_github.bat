@echo off
echo ==========================================
echo      Ansari Matrimonials Git Pusher
echo ==========================================
echo.

:: Add all files
echo [1/3] Adding changes...
git add .

:: Prompt for commit message
set /p commitMsg="Enter commit message: "

if "%commitMsg%"=="" set commitMsg="Update"

:: Commit
echo [2/3] Committing changes...
git commit -m "%commitMsg%"

:: Push
echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo      Done! Changes pushed to GitHub.
echo ==========================================
pause
