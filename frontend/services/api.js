// API Configuration - Connect to Tim's Java backend
// Uses the same host that Expo/Metro is running on
import Constants from 'expo-constants';

const getApiBaseUrl = () => {
  // Get the debugger host from Expo (e.g., "192.168.178.25:8081")
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;

  if (debuggerHost) {
    // Extract just the IP address (remove the port)
    const host = debuggerHost.split(':')[0];
    return `http://${host}:8080/v1`;
  }

  // Fallback for development
  return 'http://localhost:8080/v1';
};

const API_BASE_URL = getApiBaseUrl();

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

// Start recording session
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

// Upload audio chunk
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

// Direct transcription API (Tim's Whisper)
export const transcribeAudio = async (audioUri, patientId) => {
  try {
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a'
    });
    if (patientId) {
      formData.append('patientId', patientId);
    }

    const response = await fetch(`${API_BASE_URL}/transcriptions`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
