import React, { useState } from 'react';
import PatientSelectionScreen from './screens/PatientSelectionScreen';
import PatientDashboardScreen from './screens/PatientDashboardScreen';
import RecordingScreen from './screens/RecordingScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('patientSelection');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Handle patient selection
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setCurrentScreen('dashboard');
  };

  // Handle back from dashboard to patient list
  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  // Handle back from dashboard to patient selection
  const handleBackToPatientList = () => {
    setCurrentScreen('patientSelection');
    setSelectedPatient(null);
  };

  // Handle start recording from dashboard
  const handleStartRecording = () => {
    setCurrentScreen('recording');
  };

  return (
    <div className="app">
      {currentScreen === 'patientSelection' && (
        <PatientSelectionScreen onPatientSelect={handlePatientSelect} />
      )}

      {currentScreen === 'dashboard' && selectedPatient && (
        <PatientDashboardScreen
          patient={selectedPatient}
          onBack={handleBackToPatientList}
          onStartRecording={handleStartRecording}
        />
      )}

      {currentScreen === 'recording' && selectedPatient && (
        <RecordingScreen
          patient={selectedPatient}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;
