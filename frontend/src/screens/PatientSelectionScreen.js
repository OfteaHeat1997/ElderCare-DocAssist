import React from 'react';
import { fakePatients } from '../data/fakePatients';
import './PatientSelectionScreen.css';

function PatientSelectionScreen({ onPatientSelect }) {
  return (
    <div className="screen">
      <h1>Select Patient</h1>

      <div className="patient-list">
        {fakePatients.map((patient) => (
          <button
            key={patient.id}
            className="patient-button"
            onClick={() => onPatientSelect(patient)}
          >
            {patient.name} - Room {patient.room}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatientSelectionScreen;
