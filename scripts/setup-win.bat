@echo off
git config --local alias.update-submodules "submodule update --init --recursive"
git config --local alias.sync "fetch --all && pull --rebase"

REM Check if the alias was successfully added
git config alias.update-submodules >nul
if %ERRORLEVEL%==0 (
    git update-submodules
    echo Git aliases have been successfully configured!
) else (
    echo Failed to configure Git aliases.
)
