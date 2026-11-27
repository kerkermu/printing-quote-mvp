@echo off
setlocal
set "editor=%~dp0tools\manage_line_recipients.py"
set "bundled=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%bundled%" (
    "%bundled%" -B "%editor%"
) else (
    py -3 -B "%editor%"
)
if errorlevel 1 (
    echo Please install Python 3.10+ with Tk and the Windows Python launcher.
    pause
)
