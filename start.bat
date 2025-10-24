@echo off
REM Quick Start Script for Contact List App (Windows PowerShell)
REM Run this script to start both frontend and backend servers

echo.
echo ============================================
echo  Contact List App - Quick Start
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Checking Node.js installation...
node --version
npm --version
echo.

echo [2/5] Installing frontend dependencies (if needed)...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo.

echo [3/5] Installing server dependencies (if needed)...
cd server
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install server dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo [4/5] Verifying .env file...
if not exist server\.env (
    echo WARNING: server\.env not found!
    echo Please create server\.env with:
    echo   MONGODB_URI=your_mongodb_connection_string
    echo   PORT=4000
    echo   CLOUDINARY_CLOUD_NAME=your_cloud_name (optional)
    echo.
)
echo.

echo [5/5] Ready to start servers!
echo.
echo Next steps:
echo   - Open Terminal 1 and run: cd server ^&^& npm run dev
echo   - Open Terminal 2 and run: npm run dev
echo   - Visit http://localhost:5173 in your browser
echo.
echo For detailed instructions, see README.md
echo.
pause
