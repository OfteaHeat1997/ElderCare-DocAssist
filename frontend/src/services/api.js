// API Configuration - Connect to Tim's Java backend
const API_BASE_URL = 'http://localhost:8080/v1';

// Fetch all patients from backend
export const getPatients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`);
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Fetch single patient by ID
export const getPatient = async (patientId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch patient');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

// Start recording session (Tim is building this today)
export const startRecording = async (patientId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transcription/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId })
    });
    if (!response.ok) {
      throw new Error('Failed to start recording');
    }
    return await response.json();
  } catch (error) {
    console.error('Error starting recording:', error);
    throw error;
  }
};

// Upload audio chunk (Tim is building this today)
export const uploadAudio = async (sessionId, audioBlob) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch(`${API_BASE_URL}/transcription/${sessionId}/audio`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error('Failed to upload audio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

// Complete recording and get transcription
export const completeRecording = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transcription/${sessionId}/complete`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('Failed to complete recording');
    }
    return await response.json();
  } catch (error) {
    console.error('Error completing recording:', error);
    throw error;
  }
};

// Generate SOAP note from transcription
export const generateSOAPNote = async (transcriptionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/documentation/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcriptionId })
    });
    if (!response.ok) {
      throw new Error('Failed to generate SOAP note');
    }
    return await response.json();
  } catch (error) {
    console.error('Error generating SOAP note:', error);
    throw error;
  }
};

// NEW: Direct transcription API (Tim's Whisper)
export const transcribeAudio = async (audioBlob, patientId) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    if (patientId) {
      formData.append('patientId', patientId);
    }

    const response = await fetch(`${API_BASE_URL}/transcriptions`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to transcribe audio');
    }

    return await response.json();
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};
