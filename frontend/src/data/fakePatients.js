// Fake patients for testing - Student level code
// No database needed! Just hardcoded data for frontend development

export const fakePatients = [
  {
    id: '0001',
    name: 'Jan de Vries',
    age: 85,
    dateOfBirth: '1940-03-15',
    room: '101A',
    conditions: 'Diabetes, Hypertension'
  },
  {
    id: '0002',
    name: 'Maria Jansen',
    age: 87,
    dateOfBirth: '1938-07-22',
    room: '102B',
    conditions: 'Dementia, Arthritis'
  },
  {
    id: '0003',
    name: 'Piet Bakker',
    age: 79,
    dateOfBirth: '1945-11-08',
    room: '103A',
    conditions: 'Heart disease'
  },
  {
    id: '0004',
    name: 'Anna van Dijk',
    age: 83,
    dateOfBirth: '1942-01-30',
    room: '104C',
    conditions: 'COPD, Osteoporosis'
  },
  {
    id: '0005',
    name: 'Henk Visser',
    age: 86,
    dateOfBirth: '1939-05-12',
    room: '105B',
    conditions: 'Parkinson'
  },
  {
    id: '0006',
    name: 'Els Smit',
    age: 82,
    dateOfBirth: '1943-09-25',
    room: '106A',
    conditions: 'Diabetes, Dementia'
  },
  {
    id: '0007',
    name: 'Johan Mulder',
    age: 84,
    dateOfBirth: '1941-12-03',
    room: '107B',
    conditions: 'Stroke history'
  },
  {
    id: '0008',
    name: 'Greet de Jong',
    age: 81,
    dateOfBirth: '1944-06-18',
    room: '108C',
    conditions: 'Arthritis'
  },
  {
    id: '0009',
    name: 'Kees van Beek',
    age: 88,
    dateOfBirth: '1937-04-07',
    room: '109A',
    conditions: 'Heart failure'
  },
  {
    id: '0010',
    name: 'Truus Willems',
    age: 79,
    dateOfBirth: '1946-08-14',
    room: '110B',
    conditions: 'Hypertension'
  }
];

// Helper function to search patients by name
export const searchPatients = (query) => {
  if (!query) return fakePatients;

  const lowerQuery = query.toLowerCase();
  return fakePatients.filter(patient =>
    patient.name.toLowerCase().includes(lowerQuery) ||
    patient.id.includes(query) ||
    patient.room.toLowerCase().includes(lowerQuery)
  );
};
