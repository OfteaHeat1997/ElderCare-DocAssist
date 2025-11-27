# ElderCare-DocAssist

Student project: Voice-to-text documentation system for elderly care professionals using OpenAI Whisper and AI-generated SOAP notes.

## Project Overview

A mobile app that helps nurses document patient care efficiently:
- Record voice notes via phone microphone
- Automatic transcription using OpenAI Whisper (Dutch language)
- View patient information and medical history
- Generate SOAP notes from transcriptions using Ollama AI

**Tech Stack:**
- Frontend: React Native (Expo) - Mobile app
- Backend: Java Spring Boot + Python Whisper
- Database: PostgreSQL
- AI: OpenAI Whisper for transcription, Ollama (qwen2.5:3b) for SOAP generation
- Deployment: Docker Compose

## Project Structure

```
ElderCare-DocAssist/
├── frontend/                          # Expo React Native mobile app
│   ├── app/                           # Expo Router screens
│   │   ├── index.js                   # Patient selection
│   │   ├── patient/[id].js            # Patient dashboard
│   │   └── record.js                  # Recording screen
│   ├── screens/                       # Screen components
│   │   ├── PatientSelectionScreen.js  # Patient list
│   │   ├── PatientDetailScreen.js     # Patient details + medical info
│   │   └── RecordingScreen.js         # Audio recording & transcription
│   ├── services/
│   │   ├── api.js                     # Backend API calls (Whisper)
│   │   └── ollama.js                  # Ollama API calls (SOAP)
│   └── package.json
│
├── backend/
│   └── voiceverzorging-backend/       # Spring Boot backend
│       ├── src/main/java/nl/voiceverzorging/
│       │   ├── controller/            # REST API endpoints
│       │   ├── service/               # Business logic
│       │   ├── model/                 # Data models
│       │   └── repository/            # Database access
│       └── whisper/
│           └── transcribe.py          # Whisper transcription script
│
├── database/                          # Database setup and docs
│
└── docker-compose.yml                 # Backend services setup
```

## Getting Started

### Prerequisites

- Docker Desktop installed (Windows/Mac/Linux)
- Node.js 18+ installed
- Expo Go app on your phone (for testing)
- At least 8GB RAM (for Ollama with qwen2.5:3b model)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ElderCare-DocAssist
   ```

2. **Start backend services with Docker**
   ```bash
   docker-compose up -d
   ```

   This starts:
   - PostgreSQL database (port 5433)
   - Java Spring Boot backend with Whisper (port 8080)
   - Ollama for SOAP generation (port 11434)
   - pgAdmin database viewer (port 5050)

3. **Download Ollama model** (first time only)
   ```bash
   docker exec eldercare-ollama ollama pull qwen2.5:3b
   ```
   Wait a few minutes for the model to download (~2GB).

4. **Start the Expo mobile app**
   ```bash
   cd frontend
   npm install
   npx expo start
   ```

5. **Scan QR code** with Expo Go app on your phone

### Testing the App

1. Open Expo Go app on your phone
2. Scan the QR code from terminal
3. You'll see a list of patients
4. Tap a patient to view their dashboard
5. Tap "Start opname" (red button) to record
6. Speak in Dutch
7. Tap "Stop" - Whisper transcribes your audio
8. Tap "Generate SOAP Note" - Ollama creates SOAP report

## Services & Ports

| Service | Port | Description |
|---------|------|-------------|
| Backend | 8080 | Java Spring Boot + Whisper |
| Database | 5433 | PostgreSQL |
| Ollama | 11434 | AI for SOAP notes |
| pgAdmin | 5050 | Database viewer |
| Expo | 8081 | Metro bundler (development) |

## API Endpoints

### Patients
- `GET /v1/patients` - Get all patients
- `GET /v1/patients/{id}` - Get single patient

### Transcription (Whisper)
- `POST /v1/transcriptions` - Upload audio file, returns transcription
  - Form data: `audio` (file), `patientId` (optional)
  - Returns: `{ text: "transcribed text", ... }`

### SOAP Generation (Ollama - Frontend Direct)
- Ollama API: `POST http://localhost:11434/api/generate`
- Called directly from frontend (not through backend)

## Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Phone App     │     │  Docker         │
│   (Expo)        │     │  Services       │
│                 │     │                 │
│  ┌───────────┐  │     │  ┌───────────┐  │
│  │ Recording │──┼─────┼─►│ Backend   │  │
│  │ Screen    │  │     │  │ (Whisper) │  │
│  └───────────┘  │     │  └───────────┘  │
│       │         │     │       │         │
│       ▼         │     │       ▼         │
│  ┌───────────┐  │     │  ┌───────────┐  │
│  │ SOAP      │──┼─────┼─►│ Ollama    │  │
│  │ Button    │  │     │  │ (AI)      │  │
│  └───────────┘  │     │  └───────────┘  │
│                 │     │       │         │
│                 │     │       ▼         │
│                 │     │  ┌───────────┐  │
│                 │     │  │ Database  │  │
│                 │     │  │(PostgreSQL│  │
│                 │     │  └───────────┘  │
└─────────────────┘     └─────────────────┘
```

## Team Members

- Maria - Project Lead
- Tim - Backend Development & Whisper Integration
- Yusuf - Frontend Development (Expo/React Native)

## Troubleshooting

**Phone can't connect to backend?**
- Make sure phone and computer are on same WiFi
- Expo automatically uses your computer's IP

**Whisper transcription failing?**
- First transcription takes 10-20 seconds (loading model)
- Check backend logs: `docker logs eldercare-backend`

**Ollama SOAP not working?**
- Check Ollama is running: `docker ps | grep ollama`
- Check model is downloaded: `docker exec eldercare-ollama ollama list`
- For phone: Update IP in `frontend/services/ollama.js`

**Expo not starting?**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npx expo start --clear`

## Commands Cheat Sheet

```bash
# Start backend services
docker-compose up -d

# Stop backend services
docker-compose down

# View logs
docker logs eldercare-backend
docker logs eldercare-ollama

# Start Expo app
cd frontend && npx expo start

# Pull Ollama model
docker exec eldercare-ollama ollama pull qwen2.5:3b
```
