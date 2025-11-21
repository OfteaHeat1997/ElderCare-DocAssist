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

  // Helper function to get initials
  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format patient details
  const formatPatientDetails = (patient) => {
    const parts = [];

    if (patient.dateOfBirth) {
      const dob = new Date(patient.dateOfBirth).toLocaleDateString('nl-NL');
      const age = calculateAge(patient.dateOfBirth);
      parts.push(`${dob} (${age} jaar)`);
    }

    if (patient.patientId || patient.id) {
      parts.push(patient.patientId || patient.id);
    }

    parts.push('********'); // Placeholder for privacy

    if (patient.address) {
      parts.push(patient.address);
    }

    parts.push('Signaleringen(3)'); // Placeholder

    return parts.join(' | ');
  };

  // Get mock tags for demonstration (would come from backend in real app)
  const getMockTags = (index) => {
    const tagSets = [
      [
        { text: 'Wel reanimeren', color: 'green' },
        { text: 'Infecties', color: 'yellow' },
        { text: 'Slikadvies', color: 'yellow' }
      ],
      [
        { text: 'Niet reanimeren', color: 'red' },
        { text: 'Valgevaar', color: 'red' },
        { text: 'Rollatorgebruik', color: 'yellow' }
      ],
      [
        { text: 'Wel reanimeren', color: 'green' },
        { text: 'MRSA', color: 'yellow' },
        { text: 'Slikadvies', color: 'yellow' }
      ],
      [
        { text: 'Wel reanimeren', color: 'green' },
        { text: 'Epilepsie', color: 'yellow' },
        { text: 'Tillift nodig', color: 'yellow' }
      ],
      [
        { text: 'Niet Reanimeren', color: 'red' },
        { text: 'Diabetes', color: 'yellow' },
        { text: 'Gemalen voeding', color: 'yellow' }
      ],
      [
        { text: 'Wel reanimeren', color: 'green' },
        { text: 'Agressie', color: 'yellow' },
        { text: 'Benaderingsplan', color: 'yellow' }
      ]
    ];
    return tagSets[index % tagSets.length] || [];
  };

  if (loading) {
    return (
      <div className="screen loading">
        <h1>Loading patients...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen error">
        <h1>Error</h1>
        <p>{error}</p>
        <p>Run: docker-compose up</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Patiëntenlijst</h1>
      </div>

      <div className="patient-list">
        {patients.map((patient, index) => (
          <button
            key={patient.id}
            className="patient-button"
            onClick={() => onPatientSelect(patient)}
          >
            <div className="patient-avatar">
              <span className="patient-avatar-text">
                {getInitials(patient.firstName, patient.lastName)}
              </span>
            </div>

            <div className="patient-info">
              <h2 className="patient-name">
                {patient.firstName} {patient.lastName}
              </h2>

              <p className="patient-details">
                {formatPatientDetails(patient)}
              </p>

              <div className="patient-tags">
                {getMockTags(index).map((tag, tagIndex) => (
                  <span key={tagIndex} className={`patient-tag ${tag.color}`}>
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatientSelectionScreen;
