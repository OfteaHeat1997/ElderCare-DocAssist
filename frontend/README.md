# ElderCare Frontend

React web application for the ElderCare DocAssist project.

## What's Inside

- **Screen 1: Patient Selection** - Search and select from 10 fake patients
- **Screen 2: Recording Screen** - Big red button to record notes (placeholder for Whisper integration)

## Fake Patients (Hardcoded)

The app includes 10 fake Dutch elderly care patients:
- Jan de Vries (ID: 0001)
- Maria Jansen (ID: 0002)
- Piet Bakker (ID: 0003)
- Anna van Dijk (ID: 0004)
- Henk Visser (ID: 0005)
- Els Smit (ID: 0006)
- Johan Mulder (ID: 0007)
- Greet de Jong (ID: 0008)
- Kees van Beek (ID: 0009)
- Truus Willems (ID: 0010)

**No database connection needed!** The data is in `src/data/fakePatients.js`

## How to Run

### Option 1: With Docker (Recommended)

From project root:

```bash
# Build and start frontend
docker-compose up -d frontend

# Check if it's running
docker ps | grep eldercare-frontend

# View logs
docker logs eldercare-frontend
```

Open in browser: **http://localhost:3001**

### Option 2: Without Docker (Local Development)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Open in browser: **http://localhost:3001**

## File Structure

```
frontend/
├── public/
│   └── index.html                  # HTML template
├── src/
│   ├── data/
│   │   └── fakePatients.js        # 10 fake patients
│   ├── screens/
│   │   ├── PatientSelectionScreen.js   # Screen 1
│   │   ├── PatientSelectionScreen.css
│   │   ├── RecordingScreen.js          # Screen 2
│   │   └── RecordingScreen.css
│   ├── App.js                     # Main app (navigation)
│   └── index.js                   # Entry point
├── Dockerfile                     # Docker configuration
└── package.json                   # Dependencies
```

## Features Working Now

- [x] Patient search by name, ID, or room
- [x] Patient selection
- [x] Navigate to recording screen
- [x] Display patient info
- [x] Big record button (visual only)
- [x] Back navigation

## Features Coming Later

- [ ] Connect to Whisper (speech-to-text)
- [ ] Connect to Ollama (SOAP note generation)
- [ ] Connect to backend API (when ready)
- [ ] Save notes to database
- [ ] Review and edit screen

## Ports

- Frontend: **http://localhost:3001**
- Backend API: **http://localhost:3000** (not built yet)
- Database Viewer: **http://localhost:8080**
- Ollama API: **http://localhost:11434**

## For Your Team

Everyone can run the frontend:

```bash
# Start everything
docker-compose up -d

# Open browser
# Go to http://localhost:3001
```

That's it! The frontend works without backend or database.
