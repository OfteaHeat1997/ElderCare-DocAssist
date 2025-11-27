# Quick Start Guide

Get ElderCare-DocAssist running in 5 minutes!

## Step 1: Start Docker Services

Open terminal in project folder:

```bash
docker-compose up -d
```

Wait 30-60 seconds for containers to start.

## Step 2: Download AI Model (First Time Only)

```bash
docker exec eldercare-ollama ollama pull qwen2.5:3b
```

Wait a few minutes (~2GB download).

## Step 3: Start Mobile App

```bash
cd frontend
npm install
npx expo start
```

## Step 4: Open on Phone

1. Install **Expo Go** app on your phone
2. Scan QR code from terminal
3. App opens on your phone!

## That's It!

**Now you can:**
- See patient list
- View patient details
- Record voice notes (Dutch)
- Get AI transcription (Whisper)
- Generate SOAP notes (Ollama)

## Check Services Are Running

```bash
docker ps
```

You should see:
- `eldercare-backend` (port 8080) - API + Whisper
- `eldercare-database` (port 5433) - PostgreSQL
- `eldercare-ollama` (port 11434) - SOAP AI
- `eldercare-db-admin` (port 5050) - Database viewer

## View Database (Optional)

Open http://localhost:5050
- Email: admin@example.com
- Password: admin

## Stop Everything

```bash
docker-compose down
```

## Troubleshooting

**App not connecting?**
- Phone and computer must be on same WiFi
- Restart Expo: `npx expo start --clear`

**Transcription not working?**
- Check backend: `docker logs eldercare-backend`
- First transcription takes 10-20 seconds

**SOAP not generating?**
- Check Ollama: `docker exec eldercare-ollama ollama list`
- Should show `qwen2.5:3b`

---

**Full guide:** See `DOCKER_SETUP.md`
