@echo off
title Sanity Admin Panel Launcher
echo ========================================================
echo   Dhaka College International Hall - Admin Panel
echo ========================================================
echo.
echo Starting local Sanity Studio...
cd /d "C:\Users\USER\dc_studio"
start http://localhost:3333
npx sanity dev --port 3333
pause
