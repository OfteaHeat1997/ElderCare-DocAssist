import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/api';
import './PatientSelectionScreen.css';

function PatientSelectionScreen({ onPatientSelect }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch real patients from Tim's backend
    getPatients()
      .then(response => {
        setPatients(response.data); // API returns {data: [...], total: 8}
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
        setError('Could not load patients. Make sure backend is running!');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="screen">
        <h1>Loading patients...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen">
        <h1>Error</h1>
        <p style={{color: 'red'}}>{error}</p>
        <p>Run: docker-compose up</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <h1>Select Patient</h1>

      <div className="patient-list">
        {patients.map((patient) => (
          <button
            key={patient.id}
            className="patient-button"
            onClick={() => onPatientSelect(patient)}
          >
            {patient.firstName} {patient.lastName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatientSelectionScreen;
