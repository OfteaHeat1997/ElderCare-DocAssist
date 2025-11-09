# How to Use Whisper Speech-to-Text

Simple guide based on what we tested and works!

## What We Have

✅ **Whisper model** - Already downloaded at: `backend/models/whisper/ggml-base.bin` (142MB)
✅ **Whisper.cpp** - Already installed at: `C:\Users\maria\Documents\whisper\whisper-bin-x64\Release`
✅ **Test audio** - Sample at: `backend/models/test_audio/nurse_soap_note.mp3`

## How to Convert Audio to Text

### Step 1: Put your audio file in the test_audio folder

Copy your recording to:
```
backend/models/test_audio/your_audio.mp3
```

### Step 2: Run Whisper

Open **PowerShell** or **Command Prompt** and run:

```powershell
cd C:\Users\maria\Desktop\projects\ElderCare-DocAssist

C:\Users\maria\Documents\whisper\whisper-bin-x64\Release\whisper-cli.exe -m "C:\Users\maria\Desktop\projects\ElderCare-DocAssist\backend\models\whisper\ggml-base.bin" -f backend\models\test_audio\your_audio.mp3 -l nl -otxt -of backend\models\test_audio\transcript
```

**What this does:**
- `-m` = Path to Whisper model
- `-f` = Your audio file
- `-l nl` = Language is Dutch
- `-otxt` = Save as text file
- `-of` = Output filename (will create transcript.txt)

### Step 3: Get Your Transcript

Check the file:
```
backend/models/test_audio/transcript.txt
```

This contains the transcribed Dutch text!

## Quick Test with Example Audio

We already have a working example. Run this:

```powershell
cd C:\Users\maria\Desktop\projects\ElderCare-DocAssist

C:\Users\maria\Documents\whisper\whisper-bin-x64\Release\whisper-cli.exe -m "C:\Users\maria\Desktop\projects\ElderCare-DocAssist\backend\models\whisper\ggml-base.bin" -f backend\models\test_audio\nurse_soap_note.mp3 -l nl -otxt -of backend\models\test_audio\result
```

This will create `result.txt` with the transcription!

## What the Example Audio Contains

The sample audio is a complete SOAP nursing note in Dutch:
- **Subjective**: Patient reports quiet night, normal appetite
- **Objective**: Vitals - Temp 36.6°C, BP 116/80, HR 70
- **Assessment**: General condition stable
- **Plan**: Continue care, monitor in 48h

## Important Notes

- Use `whisper-cli.exe` (NOT `main.exe` - it's deprecated!)
-  Audio format: `.mp3`, `.wav`, `.m4a` all work
- Always use `-l nl` for Dutch language
-  Use `-otxt -of filename` to save output to file
-  Audio quality affects accuracy - clear recordings work best

## For Your App

Your React Native app will eventually:
1. Record nurse speaking → Save .mp3 file
2. Send to backend → Backend runs Whisper command
3. Get transcript.txt back → Display to nurse
4. Nurse reviews → Add to database

For now, you're learning each step separately!
