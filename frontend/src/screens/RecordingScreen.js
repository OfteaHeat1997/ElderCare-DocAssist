import React, { useState, useRef } from 'react';
import { startRecording, uploadAudio, completeRecording, generateSOAPNote } from '../services/api';
import './RecordingScreen.css';

function RecordingScreen({ patient, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [soapNote, setSoapNote] = useState(null);
  const [status, setStatus] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      setStatus('Starting recording session...');

      // Start recording session with backend
      const session = await startRecording(patient.id);
      setSessionId(session.sessionId);

      // Start browser audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus('Recording in progress...');
    } catch (error) {
      console.error('Error starting recording:', error);
      setStatus('Error: Could not start recording. Check if backend is running.');
    }
  };

  const handleStopRecording = async () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setStatus('Processing audio...');

    mediaRecorderRef.current.onstop = async () => {
      try {
        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        setStatus('Uploading audio to Whisper...');
        // Upload to backend
        await uploadAudio(sessionId, audioBlob);

        setStatus('Transcribing audio...');
        // Complete recording and get transcription
        const result = await completeRecording(sessionId);
        setTranscription(result.transcriptionText);

        setStatus('Generating SOAP note...');
        // Generate SOAP note
        const soap = await generateSOAPNote(result.id);
        setSoapNote(soap);

        setStatus('Complete!');

        // Clean up
        audioChunksRef.current = [];
      } catch (error) {
        console.error('Error processing recording:', error);
        setStatus('Error: ' + error.message);
      }
    };
  };

  return (
    <div className="screen">
      <button onClick={onBack} className="back-button">← Back</button>

      <h1>Record Note</h1>

      <div className="patient-info">
        <h2>{patient.firstName} {patient.lastName}</h2>
        <p>ID: {patient.id}</p>
      </div>

      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={isRecording ? "record-button recording" : "record-button"}
        disabled={!!status && status !== 'Complete!'}
      >
        {isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
      </button>

      {status && (
        <div className="status">
          <p>{status}</p>
        </div>
      )}

      {transcription && (
        <div className="transcription">
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}

      {soapNote && (
        <div className="soap-note">
          <h3>SOAP Note:</h3>
          <div className="soap-content">
            {soapNote.structuredData.symptoms && (
              <div>
                <strong>Symptoms:</strong>
                <ul>
                  {soapNote.structuredData.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>
            )}
            {soapNote.structuredData.observations && (
              <div>
                <strong>Observations:</strong>
                <p>{soapNote.structuredData.observations}</p>
              </div>
            )}
            {soapNote.structuredData.interventions && (
              <div>
                <strong>Interventions:</strong>
                <p>{soapNote.structuredData.interventions}</p>
              </div>
            )}
            {soapNote.structuredData.nextSteps && (
              <div>
                <strong>Next Steps:</strong>
                <p>{soapNote.structuredData.nextSteps}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordingScreen;
