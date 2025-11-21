import React, { useState } from 'react';
import PatientSelectionScreen from './screens/PatientSelectionScreen';
import RecordingScreen from './screens/RecordingScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('patientSelection');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Handle patient selection
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setCurrentScreen('recording');
  };

  // Handle back button
  const handleBack = () => {
    setCurrentScreen('patientSelection');
    setSelectedPatient(null);
  };

  return (
    <div className="app">
      {currentScreen === 'patientSelection' && (
        <PatientSelectionScreen onPatientSelect={handlePatientSelect} />
      )}

      {currentScreen === 'recording' && selectedPatient && (
        <RecordingScreen patient={selectedPatient} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
