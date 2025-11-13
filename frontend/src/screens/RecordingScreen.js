import React, { useState } from 'react';
import './RecordingScreen.css';

function RecordingScreen({ patient, onBack }) {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      alert('Recording started (will connect to Whisper later)');
    } else {
      setIsRecording(false);
      alert('Recording stopped (will connect to Ollama later)');
    }
  };

  return (
    <div className="screen">
      <button onClick={onBack} className="back-button">← Back</button>

      <h1>Record Note</h1>

      <div className="patient-info">
        <h2>{patient.name}</h2>
        <p>ID: {patient.id}</p>
        <p>Room: {patient.room}</p>
      </div>

      <button
        onClick={handleRecordClick}
        className={isRecording ? "record-button recording" : "record-button"}
      >
        {isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
      </button>
    </div>
  );
}

export default RecordingScreen;
