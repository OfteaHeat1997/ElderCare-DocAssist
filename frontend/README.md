# Frontend Documentation

## Overview
React web application for ElderCare voice documentation system.

## File Structure Explanation

### `/src/App.js`
Main application component that manages navigation between screens.

**What it does:**
- Manages which screen is currently visible (patient list, dashboard, or recording)
- Stores selected patient data
- Handles navigation between screens

**Key state variables:**
- `currentScreen`: Tracks which screen to show ('selection', 'dashboard', 'recording')
- `selectedPatient`: Stores the patient object when a patient is clicked

### `/src/screens/PatientSelectionScreen.js`
Displays list of all patients from the backend database.

**What it does:**
- Fetches patient list from backend API when component loads
- Displays patients in a grid with cards
- Shows patient initials, name, and age
- Handles click events to select a patient

**API Call:**
- Uses `getPatients()` from `api.js`
- Called in `useEffect` hook on component mount

### `/src/screens/PatientDashboardScreen.js`
Shows detailed information about a selected patient.

**What it does:**
- Displays patient avatar with initials
- Shows patient details (DOB, age, ID, address)
- Displays mock medical information (history, medications, allergies)
- Has a record button that navigates to recording screen

**Helper functions:**
- `getInitials()`: Creates initials from first/last name (e.g., "Jan de Vries" → "JV")
- `calculateAge()`: Calculates age from date of birth
- `formatPatientDetails()`: Formats patient info into display string

### `/src/screens/RecordingScreen.js`
Handles audio recording and transcription via Whisper.

**What it does:**
1. Records audio from user's microphone using browser MediaRecorder API
2. When stopped, sends audio to backend for transcription
3. Displays transcription result on screen
4. Shows modal popup while processing

**State variables:**
- `isRecording`: Boolean, true when actively recording
- `isProcessing`: Boolean, true when sending audio to Whisper
- `transcription`: String, the transcribed text from Whisper
- `status`: String, current status message
- `mediaRecorderRef`: Reference to MediaRecorder instance
- `audioChunksRef`: Array storing audio data chunks

**Flow:**
1. User clicks "Start Recording"
   - Browser requests microphone permission
   - MediaRecorder starts capturing audio
   - Audio chunks are stored in `audioChunksRef`

2. User clicks "Stop Recording"
   - MediaRecorder stops
   - Audio chunks are combined into a Blob
   - Modal popup appears with spinner
   - Audio is sent to backend via `transcribeAudio()` API call
   - Backend uses Whisper to transcribe
   - Transcription text is displayed

### `/src/services/api.js`
Contains all backend API calls.

**Backend URL:** `http://localhost:8080/v1`

**Functions:**

1. `getPatients()`
   - Endpoint: `GET /v1/patients`
   - Returns: Array of patient objects
   - Used by: PatientSelectionScreen

2. `getPatient(patientId)`
   - Endpoint: `GET /v1/patients/{id}`
   - Returns: Single patient object
   - Used by: (Future feature)

3. `transcribeAudio(audioBlob, patientId)`
   - Endpoint: `POST /v1/transcriptions`
   - Sends: Audio file as FormData
   - Returns: Object with `text` field containing transcription
   - Used by: RecordingScreen

4. Session-based functions (not currently used):
   - `startRecording()`: Start a recording session
   - `uploadAudio()`: Upload audio chunks during recording
   - `completeRecording()`: Finish session and get transcription
   - `generateSOAPNote()`: Generate SOAP note from transcription (future)

## CSS Files

### `/src/App.css`
Global styles and base layout. Contains responsive design breakpoints.

### `/src/screens/PatientSelectionScreen.css`
Styles for patient list grid and patient cards.

### `/src/screens/PatientDashboardScreen.css`
Styles for patient dashboard layout, info grid, and medical data display.

### `/src/screens/RecordingScreen.css`
Styles for recording button, status messages, modal popup, and spinner animation.

## Important Notes for Development

### Adding a New Screen
1. Create `NewScreen.js` in `/src/screens/`
2. Create `NewScreen.css` in `/src/screens/`
3. Import in `App.js`: `import NewScreen from './screens/NewScreen';`
4. Add new state value to `currentScreen` state
5. Add conditional rendering in App.js return statement

### Adding a New API Call
1. Open `/src/services/api.js`
2. Add new async function following existing pattern:
   ```javascript
   export const newApiCall = async (params) => {
     try {
       const response = await fetch(`${API_BASE_URL}/endpoint`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(params)
       });
       if (!response.ok) {
         throw new Error('Failed to...');
       }
       return await response.json();
     } catch (error) {
       console.error('Error:', error);
       throw error;
     }
   };
   ```
3. Import in component: `import { newApiCall } from '../services/api';`

### Browser Microphone Permissions
- First time: Browser will ask for microphone permission
- User must click "Allow" to enable recording
- If "Block" is clicked, recording will fail
- To reset permissions: Browser settings → Site settings → Microphone

### Hot Reload Not Working
If changes don't appear after editing:
1. Stop containers: `docker-compose down`
2. Rebuild: `docker-compose up -d --build frontend`
3. Hard refresh browser: Ctrl + Shift + R

## Common Issues

### "Failed to fetch patients"
- Backend is not running
- Check: `docker ps | grep backend`
- Fix: `docker restart eldercare-backend`

### "Failed to transcribe audio"
- Whisper model not downloaded yet (first time takes 10-20s)
- Backend error processing audio
- Check logs: `docker logs eldercare-backend`

### Recording button not working
- Microphone permissions blocked
- Browser doesn't support MediaRecorder (use Chrome/Firefox)
- Check browser console (F12) for errors

## Next Steps for Development

1. Save transcriptions to database (need Tim to add backend endpoint)
2. Add SOAP note generation from transcription
3. Add edit functionality for SOAP notes
4. Add save/export SOAP notes
5. Add user authentication
6. Add search/filter for patients
7. Add pagination for patient list
8. Make fully mobile responsive
