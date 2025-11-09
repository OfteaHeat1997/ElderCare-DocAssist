# AI Models

Local AI models for speech-to-text and text generation. Everything runs on your computer (privacy-safe, no cloud!).

## What's Here

### ✅ Whisper (Speech-to-Text) - READY!
Converts Dutch audio to text.

**Location:** `whisper/ggml-base.bin` (142MB) - **Already downloaded!**

**What it does:**
- Listens to audio recordings in Dutch
- Converts speech to text
- Works offline (no internet needed)
- Good accuracy for medical terms

### 📦 Ollama (Text Generation) - TODO
Generates SOAP notes from transcribed text.

**Installation needed:**
1. Download from: https://ollama.ai/download
2. Install Ollama
3. Run: `ollama pull llama2` or `ollama pull mistral`

**What it does:**
- Takes transcribed text
- Generates structured SOAP notes (Subjective, Objective, Assessment, Plan)
- Suggests medical documentation

## How to Use

### For Frontend Developers
Your React Native app will:
1. Record audio → Save as `.wav` or `.mp3`
2. Send to Whisper model → Get text back
3. Send text to Ollama → Get SOAP note structure

### For Backend Developers
You need to integrate:
1. **Whisper.cpp** - For running the speech-to-text model
2. **Ollama API** - For generating SOAP notes

## Quick Test (Optional)

Want to test if Whisper works?

1. Install whisper.cpp:
   - Windows: Download from https://github.com/ggerganov/whisper.cpp/releases
   - macOS: `brew install whisper-cpp`
   - Linux: `sudo apt-get install whisper-cpp`

2. Test with audio file:
   ```bash
   whisper-cpp -m backend/models/whisper/ggml-base.bin -f your-audio.wav
   ```

## File Structure

```
models/
├── whisper/
│   └── ggml-base.bin          ✅ Downloaded (142MB)
├── ollama/                     (config files, empty for now)
├── prompts/                    (SOAP generation templates)
└── test_audio/                 (sample audio files for testing)
```

## Important Notes

- ✅ Whisper model is already downloaded and ready!
- ⚠️ Models are NOT in git (too big, in .gitignore)
- 🔒 Everything runs locally (privacy-first)
- 🇳🇱 Whisper supports Dutch language
