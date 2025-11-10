# Docker Setup - Student Guide

Simple guide to run ElderCare-DocAssist with Docker!

## Why Docker?

**Everyone on your team gets the SAME environment:**
- ✅ Same database
- ✅ Same AI models (Ollama)
- ✅ Same backend setup
- ✅ No "works on my machine" problems!

## What You Need

1. **Docker Desktop** installed
   - Windows/Mac: https://www.docker.com/products/docker-desktop
   - Linux: `sudo apt-get install docker.io docker-compose`

2. **This project** cloned from GitHub

## Quick Start (3 Steps!)

### Step 1: Start Everything

Open terminal in project folder and run:

```bash
docker-compose up
```

This starts:
- 🐳 Backend API server (port 3000)
- 🤖 Ollama for SOAP notes (port 11434)
- 🗄️ Database viewer (port 8080)

### Step 2: Setup Ollama Model

**In a NEW terminal** (while docker-compose is running):

```bash
# Pull the LLM model for SOAP generation
docker exec eldercare-ollama ollama pull llama2
```

Wait a few minutes for the model to download.

### Step 3: Verify Everything Works

```bash
# Check containers are running
docker ps

# You should see:
# - eldercare-backend
# - eldercare-ollama
# - eldercare-db-viewer
```

**Open Database Viewer:**

Go to http://localhost:8080 in your browser to see all your data!
- ✅ No login needed
- ✅ View tables (notes, vitals)
- ✅ Run SQL queries
- ✅ Export as CSV/JSON

## What's Running Where?

```
Your Computer
├── Frontend (React Native) → Port: Expo default
├── Backend API → http://localhost:3000
├── Ollama API → http://localhost:11434
├── Database Viewer → http://localhost:8080
└── Database → database/eldercare_dev.db (shared file)
```

## Common Commands

**Start services:**
```bash
docker-compose up
```

**Start in background:**
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
docker-compose logs backend

# Just Ollama
docker-compose logs ollama

# Just Database Viewer
docker-compose logs db-viewer
```

**Restart a service:**
```bash
docker-compose restart backend
```

## How Your Team Shares Data

### Database (SQLite)
The database file `database/eldercare_dev.db` is **shared** between Docker and your computer.

**Everyone runs the same setup script:**
```bash
cd database
python setup_team_database.py
```

Now everyone has the same data!

### AI Models
- **Whisper**: Stored in `backend/models/whisper/` (everyone downloads once)
- **Ollama**: Stored in Docker volume (each person pulls once)

## Development Workflow

### For Backend Developers

1. Edit code in `backend/`
2. Code is automatically synced to Docker (volume mount)
3. Restart backend: `docker-compose restart backend`
4. See changes!

### For Frontend Developers

Frontend (React Native) runs on your computer, NOT in Docker:

```bash
cd frontend
npm install
npx expo start
```

It connects to backend at: `http://localhost:3000`

## Troubleshooting

**"Port already in use"**
```bash
# Stop other services using ports 3000, 8080, or 11434
docker-compose down
```

**"Can't access database viewer at http://localhost:8080"**
```bash
# Check if running
docker ps | grep db-viewer
# Restart viewer
docker-compose restart db-viewer
```

**"Cannot connect to Docker daemon"**
- Start Docker Desktop first!

**"Database is locked"**
```bash
# Stop all containers
docker-compose down
# Check no other programs are using the database
# Restart
docker-compose up
```

**Reset everything:**
```bash
# Nuclear option - deletes everything!
docker-compose down -v
docker system prune -a
```

## What Gets Shared (Git)

✅ **Committed to Git:**
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `backend/` code
- `database/schema.sql`
- Setup scripts

❌ **NOT committed:**
- `*.db` files (too big, personal data)
- `backend/models/whisper/` (too big)
- Docker volumes
- `node_modules/`

## Next Steps

Once Docker is working:

1. **Backend team**: Build the API in `backend/`
2. **Frontend team**: Build React Native app
3. **AI team**: Integrate Whisper + Ollama
4. **Database team**: Define proper schema

Everyone works independently, Docker keeps it all together!

## For Your Instructor/Demo

Show that Docker makes deployment easy:

```bash
# On any computer:
git clone <your-repo>
docker-compose up -d
# Everything works!
```

This proves your project is:
- ✅ Portable
- ✅ Reproducible
- ✅ Professional
- ✅ Ready for deployment

---

**Questions?** Check Docker docs or ask your team!
