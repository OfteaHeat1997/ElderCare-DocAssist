import React from 'react';
import './PatientDashboardScreen.css';

function PatientDashboardScreen({ patient, onBack, onStartRecording }) {
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

    parts.push('********');

    if (patient.address) {
      parts.push(patient.address);
    }

    parts.push('Signaleringen(3)');

    return parts.join(' | ');
  };

  // Mock data - would come from backend in production
  const getMockTags = () => {
    return [
      { text: 'Wel reanimeren', color: 'green' },
      { text: 'Infecties', color: 'yellow' },
      { text: 'Slikadvies', color: 'yellow' }
    ];
  };

  return (
    <div className="dashboard-screen">
      <div className="dashboard-header">
        <button className="back-button" onClick={onBack}>
          &lt;
        </button>
        <h1>Dashboard</h1>
      </div>

      {/* Patient Info Card */}
      <div className="patient-card">
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
            {getMockTags().map((tag, index) => (
              <span key={index} className={`patient-tag ${tag.color}`}>
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="info-grid">
        <div className="info-card tall">
          <h3>Medische voorgeschiedenis</h3>
          <p>
            Multiple Sclerose (Primair Progressief): Diagnose 2016.
            Neurogene blaas: Maakt gebruik van verblijfskatheter (SPC).
            Recividerende Urineweginfecties
            Dysfagie: Verslikkingsgevaar bij dun vloeibaar.
          </p>
        </div>

        <div className="info-card">
          <h3>Allergieën en overgevoeligheden</h3>
          <p>
            Antibiotica (nitrofurantoïne): Ernstige misselijkheid/braken)
            Pleisters: Huidirritatie bij fixatiepleisters
            Hooikoorts (Boompollen)
          </p>
        </div>

        <div className="info-card small">
          <h3>Locatie</h3>
          <p>Apartement 4B (Begeleid wonen)</p>
        </div>

        <div className="info-card">
          <h3>Medicatie</h3>
          <p>
            Baclofen: 10mg 3x daags
            Oxybutynine
            Macrogol
            Antibiotica profylaxe 1x daags preventief
          </p>
        </div>

        <div className="info-card medium">
          <h3>Contactpersonen</h3>
          <p>
            1e contact: Dhr. Mark de Boer (partner) 06-12341234
            2e contact: Mevr. A. de Client (moeder) 06-43214321
            Neuroloog: Dr. Visser (Catharina ziekenhuis)
          </p>
        </div>

        <div className="info-card">
          <h3>Zorgplan en Aandachtspunten</h3>
          <p>
            Voeding: Dranken indikken tot niveau 2 (vla-dikte) i.v.m. slikadvies.
            Rustig eten in rechte zithouding.
            Hygiëne: Strikte handhygiëne bij verzorging katheter i.v.m. infectierisico.
            Mobiliteit: Transfer met actieve tillift, kan kleine stukjes staan.
          </p>
        </div>
      </div>

      {/* Latest Report */}
      <div className="latest-report">
        <h3>Laatste rapportage</h3>
        <p>
          Tijdens de lunch ging het slikken moeizaam, Karin moest vaak kuchen.
          Ik heb de dranken iets dikker gemaakt. De insteekopening van de katheter
          ziet er rustig uit, geen roodheid. Ze voelt zich wel wat warm aan,
          graag temperatuur controleren in de avonddienst.
        </p>
      </div>

      {/* Start Recording Button */}
      <button className="record-action-button" onClick={onStartRecording}>
        <span className="record-icon">⏺</span>
      </button>
    </div>
  );
}

export default PatientDashboardScreen;
