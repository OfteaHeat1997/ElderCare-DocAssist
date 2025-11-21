import React, { useState, useRef } from 'react';
import { transcribeAudio } from '../services/api';
import './RecordingScreen.css';

function RecordingScreen({ patient, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      setStatus('Starting recording...');
      setTranscription('');

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
      setStatus('Error: Could not access microphone.');
    }
  };

  const handleStopRecording = async () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
      return;
    }

    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsProcessing(true);
    setStatus('Processing audio...');

    mediaRecorderRef.current.onstop = async () => {
      try {
        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        setStatus('Sending to Whisper for transcription...');

        // Send to backend for transcription
        const result = await transcribeAudio(audioBlob, patient.id);

        setTranscription(result.text || result.transcriptionText || 'No transcription available');
        setStatus('Transcription Complete!');
        setIsProcessing(false);

        // Clean up
        audioChunksRef.current = [];

        // Stop all audio tracks
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Error processing recording:', error);
        setStatus('Error: ' + error.message);
        setIsProcessing(false);
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
        disabled={isProcessing}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {status && !isProcessing && (
        <div className="status">
          <p>{status}</p>
        </div>
      )}

      {/* Processing Modal Pop-up */}
      {isProcessing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="spinner"></div>
            <h2>Processing Audio</h2>
            <p>{status}</p>
            <p className="modal-subtext">Whisper is transcribing your recording...</p>
          </div>
        </div>
      )}

      {transcription && (
        <div className="transcription">
          <h3>Whisper Transcription (Dutch):</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default RecordingScreen;
