@echo off
REM Test Whisper and save output to file

echo Testing Whisper Speech-to-Text...
echo.

REM Run Whisper and save to transcript.txt
C:\Users\maria\Documents\whisper\whisper-bin-x64\Release\main.exe -m backend\models\whisper\ggml-base.bin -f backend\models\test_audio\test.wav -l nl -otxt -of backend\models\test_audio\transcript

echo.
echo ===================================
echo Done! Check the output files:
echo - backend\models\test_audio\transcript.txt
echo ===================================
pause
