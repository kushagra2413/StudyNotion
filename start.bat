@echo off
echo Starting StudyNotion Development Environment...

echo.
echo Checking if Node.js is installed...
node --version > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed
echo.

echo Starting both client and server...
echo.
echo Client will run on: http://localhost:3000
echo Server will run on: http://localhost:4000
echo.

npm run dev
