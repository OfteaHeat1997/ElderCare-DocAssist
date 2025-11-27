import { useState, useEffect } from "react";
import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import ResponsiveView from "../components/ResponsiveView";
import ResponsiveText from "../components/ResponsiveText";
import { getPatients } from "../services/api";
import { Link } from "expo-router";
import PatientCard from "../components/PatientCard";
import { isTablet, responsiveSize } from "../lib/responsive";

export default function PatientSelectionScreen() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch real patients from Tim's backend
    getPatients()
      .then(response => {
        // API returns {data: [...], total: N}
        const patientData = response.data || response;
        // Transform backend data to match Yusuf's UI format
        const transformedPatients = patientData.map(p => ({
          id: p.id || p.patientId,
          name: `${p.firstName} ${p.lastName}`,
          firstName: p.firstName,
          lastName: p.lastName,
          birthdate: p.dateOfBirth ? formatBirthdate(p.dateOfBirth) : '',
          bsnHidden: '********',
          address: p.address || '',
          location: 'SR Eindhoven',
          room: p.room || '',
          alerts: getMockAlerts(p.id), // Mock alerts for now
        }));
        setPatients(transformedPatients);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching patients:', err);
        setError('Could not load patients. Make sure backend is running!');
        setLoading(false);
      });
  }, []);

  // Helper to format birthdate
  const formatBirthdate = (dob) => {
    const date = new Date(dob);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const age = calculateAge(dob);
    return `${day}-${month}-${year} (${age} jaar)`;
  };

  // Helper to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Mock alerts (would come from backend in real app)
  const getMockAlerts = (id) => {
    const alertSets = [
      [
        { label: "Wel reanimeren", icon: "❤️‍🩹", color: "#D2F8D2", textColor: "#005C0C" },
        { label: "Slikadvies", icon: "✋", color: "#FDECC2", textColor: "#A66A00" },
      ],
      [
        { label: "Infecties", icon: "🌞", color: "#FDECC2", textColor: "#A66A00" },
      ],
      [
        { label: "Wel reanimeren", icon: "❤️‍🩹", color: "#D2F8D2", textColor: "#005C0C" },
        { label: "Infecties", icon: "🌞", color: "#FDECC2", textColor: "#A66A00" },
        { label: "Slikadvies", icon: "✋", color: "#FDECC2", textColor: "#A66A00" },
      ],
    ];
    const index = parseInt(id) % alertSets.length;
    return alertSets[index] || [];
  };

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString().includes(search) ||
      (p.room && p.room.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <ResponsiveView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ResponsiveText style={{ marginTop: 10 }}>
          Loading patients...
        </ResponsiveText>
      </ResponsiveView>
    );
  }

  if (error) {
    return (
      <ResponsiveView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveText style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {error}
        </ResponsiveText>
        <ResponsiveText style={{ textAlign: 'center' }}>
          Run: docker-compose up
        </ResponsiveText>
      </ResponsiveView>
    );
  }

  return (
    <ResponsiveView style={{ flex: 1 }}>
      {/* Titel */}
      <ResponsiveText style={{ fontWeight: "bold", marginBottom: 10 }}>
        Selecteer een patiënt
      </ResponsiveText>

      {/* Zoekbalk */}
      <TextInput
        placeholder="Zoek op naam, ID of kamer..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          padding: responsiveSize(12, 18),
          borderRadius: 10,
          marginBottom: responsiveSize(16, 22),
          fontSize: responsiveSize(16, 22),
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />

      {/* Lijst */}
      <ScrollView>
        {filtered.map((p) => (
          <Link key={p.id} href={`/patient/${p.id}`} asChild>
            <PatientCard patient={p} />
          </Link>
        ))}
      </ScrollView>
    </ResponsiveView>
  );
}
