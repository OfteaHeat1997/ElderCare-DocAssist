# Docker Setup - Student Guide

Simple guide to run ElderCare-DocAssist with Docker!

## Why Docker?

**Everyone on your team gets the SAME environment:**
- Same database (PostgreSQL)
- Same AI models (Whisper + Ollama)
- Same backend setup
- No "works on my machine" problems!

## What You Need

1. **Docker Desktop** installed
   - Windows/Mac: https://www.docker.com/products/docker-desktop
   - Linux: `sudo apt-get install docker.io docker-compose`

2. **Node.js 18+** installed (for Expo frontend)

3. **Expo Go app** on your phone

4. **This project** cloned from GitHub

## Quick Start (4 Steps!)

### Step 1: Start Backend Services

Open terminal in project folder and run:

```bash
docker-compose up -d
```

This starts:
- Database (PostgreSQL) on port 5433
- Backend API (Java + Whisper) on port 8080
- Ollama (AI for SOAP notes) on port 11434
- pgAdmin (database viewer) on port 5050

### Step 2: Download Ollama Model

**In a NEW terminal** (while docker-compose is running):

```bash
docker exec eldercare-ollama ollama pull qwen2.5:3b
```

Wait a few minutes for the model to download (~2GB).
This model is good for Dutch language SOAP notes.

### Step 3: Start Expo Frontend

```bash
cd frontend
npm install
npx expo start
```

Scan QR code with Expo Go app on your phone.

### Step 4: Verify Everything Works

```bash
# Check containers are running
docker ps

# You should see:
# - eldercare-backend (port 8080)
# - eldercare-database (port 5433)
# - eldercare-ollama (port 11434)
# - eldercare-db-admin (port 5050)
```

**Open pgAdmin (Database Viewer):**
- Go to http://localhost:5050
- Login: admin@example.com / admin
- Add server: host=database, port=5432, user=postgres, password=eldercare2025

## What's Running Where?

```
Your Computer
│
├── Docker Services
│   ├── Backend API → http://localhost:8080
│   ├── Database → localhost:5433
│   ├── Ollama API → http://localhost:11434
│   └── pgAdmin → http://localhost:5050
│
└── Expo (runs separately)
    └── Metro bundler → scans with Expo Go app
```

## Common Commands

**Start services:**
```bash
docker-compose up -d
```

**Stop everything:**
```bash
docker-compose down
```

**See logs:**
```bash
# All services
docker-compose logs

# Just backend
docker logs eldercare-backend

# Just Ollama
docker logs eldercare-ollama
```

**Restart a service:**
```bash
docker-compose restart backend
docker-compose restart ollama
```

**Check Ollama models:**
```bash
docker exec eldercare-ollama ollama list
```

## Development Workflow

### For Backend Developers (Tim)

1. Edit code in `backend/voiceverzorging-backend/`
2. Rebuild and restart:
   ```bash
   docker-compose up -d --build backend
   ```
3. Check logs: `docker logs eldercare-backend`

### For Frontend Developers (Yusuf)

Frontend (Expo) runs on your computer, NOT in Docker:

```bash
cd frontend
npm install
npx expo start
```

It connects to:
- Backend at: `http://<your-ip>:8080`
- Ollama at: `http://localhost:11434` (update IP for phone testing)

### For Database Changes

1. Connect to pgAdmin at http://localhost:5050
2. Or use command line:
   ```bash
   docker exec -it eldercare-database psql -U postgres -d voiceverzorging
   ```

## Troubleshooting

**"Port already in use"**
```bash
# Stop containers
docker-compose down
# Check what's using port
lsof -i :8080
```

**"Cannot connect to Docker daemon"**
- Start Docker Desktop first!

**Backend not connecting to database?**
```bash
# Check database is healthy
docker ps | grep database
# Check backend logs
docker logs eldercare-backend
```

**Ollama model not working?**
```bash
# Check model is downloaded
docker exec eldercare-ollama ollama list
# Pull model again
docker exec eldercare-ollama ollama pull qwen2.5:3b
```

**Phone can't connect to backend?**
- Phone and computer must be on same WiFi
- Expo auto-detects your IP for backend
- For Ollama: manually update IP in `frontend/services/ollama.js`

**Reset everything:**
```bash
# Nuclear option - deletes all data!
docker-compose down -v
docker system prune -a
```

## What Gets Shared (Git)

**Committed to Git:**
- `docker-compose.yml`
- `backend/` code
- `frontend/` code (Expo)
- Documentation

**NOT committed:**
- Database data (Docker volumes)
- Ollama models (Docker volumes)
- `node_modules/`
- Whisper models

## For Your Instructor/Demo

Show that Docker makes deployment easy:

```bash
# On any computer:
git clone <your-repo>
docker-compose up -d
docker exec eldercare-ollama ollama pull qwen2.5:3b
cd frontend && npm install && npx expo start
# Everything works!
```

This proves your project is:
- Portable
- Reproducible
- Professional
- Ready for deployment

---

**Questions?** Check Docker docs or ask your team!
