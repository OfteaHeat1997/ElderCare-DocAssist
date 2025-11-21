# ElderCare-DocAssist

Student project: Voice-to-text documentation system for elderly care professionals using OpenAI Whisper and AI-generated SOAP notes.

## Project Overview

A web application that helps nurses document patient care efficiently:
- Record voice notes via browser microphone
- Automatic transcription using OpenAI Whisper (Dutch language)
- View patient information and medical history
- Generate SOAP notes from transcriptions (future feature)

**Tech Stack:**
- Frontend: React (JavaScript)
- Backend: Java Spring Boot + Python Whisper
- Database: PostgreSQL
- AI: OpenAI Whisper for transcription, Ollama for SOAP generation
- Deployment: Docker Compose

## Project Structure

```
ElderCare-DocAssist/
├── frontend/                          # React web application
│   ├── src/
│   │   ├── screens/                   # Main UI screens
│   │   │   ├── PatientSelectionScreen.js     # Patient list
│   │   │   ├── PatientDashboardScreen.js     # Patient details
│   │   │   └── RecordingScreen.js            # Audio recording & transcription
│   │   ├── services/
│   │   │   └── api.js                 # Backend API calls
│   │   └── App.js                     # Main app component
│   ├── public/
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
└── docker-compose.yml                 # Complete application setup
```

## Getting Started

### Prerequisites

- Docker Desktop installed (Windows/Mac/Linux)
- At least 4GB RAM available for Docker
- Port 3001 (frontend), 8080 (backend), 5433 (database) available

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ElderCare-DocAssist
   ```

2. **Start all services with Docker**
   ```bash
   docker-compose up -d
   ```

   This command will:
   - Build the frontend React app
   - Build the backend Spring Boot app with Whisper
   - Start PostgreSQL database
   - Download Whisper AI model (first time only, ~150MB)

3. **Wait for services to start** (30-60 seconds)
   ```bash
   # Check if all containers are running
   docker ps

   # You should see:
   # - eldercare-frontend (port 3001)
   # - eldercare-backend (port 8080)
   # - eldercare-database (port 5433)
   ```

4. **Open the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8080
   - Database Admin: http://localhost:5050 (pgAdmin)

### First Time Usage

1. Open http://localhost:3001 in your browser
2. You'll see a list of test patients
3. Click on a patient to view their dashboard
4. Click the red record button to start recording
5. Allow microphone access when prompted
6. Speak in Dutch (Whisper is configured for Dutch)
7. Click "Stop Recording" to transcribe

### Troubleshooting

**Frontend not loading?**
```bash
# Restart frontend container
docker restart eldercare-frontend

# View frontend logs
docker logs eldercare-frontend
```

**Backend errors?**
```bash
# Check backend logs
docker logs eldercare-backend

# Restart backend
docker restart eldercare-backend
```

**Database connection issues?**
```bash
# Check database is running
docker ps | grep database

# Restart database
docker restart eldercare-database
```

**Whisper transcription failing?**
- First transcription takes 10-20 seconds (downloading model)
- Check backend logs: `docker logs eldercare-backend`
- Ensure Python and ffmpeg are installed in backend container

## Development

### Making Changes to Frontend

1. Edit files in `frontend/src/`
2. Rebuild and restart frontend:
   ```bash
   docker-compose up -d --build frontend
   ```
3. Refresh browser (Ctrl + Shift + R)

### Making Changes to Backend

1. Edit files in `backend/voiceverzorging-backend/src/`
2. Rebuild and restart backend:
   ```bash
   docker-compose up -d --build backend
   ```

### Stopping the Application

```bash
# Stop all containers
docker-compose down

# Stop and remove all data (database will be reset)
docker-compose down -v
```

## API Endpoints

### Patients
- `GET /v1/patients` - Get all patients
- `GET /v1/patients/{id}` - Get single patient

### Transcription
- `POST /v1/transcriptions` - Upload audio file, returns transcription
  - Form data: `audio` (file), `patientId` (optional)
  - Returns: `{ text: "transcribed text", ... }`

### Documentation (Future)
- `POST /v1/documentation/generate` - Generate SOAP note from transcription

## Team Members

- Maria - Frontend Development
- Tim - Backend Development & AI Integration
- Jussuf - [Role]

## Future Features

- [ ] Save transcriptions to database
- [ ] Generate SOAP notes from transcriptions
- [ ] Edit and review SOAP notes
- [ ] Export to ZIB/BGZ formats
- [ ] User authentication
- [ ] Mobile app version
