import { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import ResponsiveText from "../components/ResponsiveText";
import { getPatient } from "../services/api";
import { isTablet, responsiveSize, responsivePadding } from "../lib/responsive";

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch patient from Tim's backend
    getPatient(id)
      .then(data => {
        // Transform backend data to UI format
        const transformed = {
          id: data.id || data.patientId,
          name: `${data.firstName} ${data.lastName}`,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          birthdate: data.dateOfBirth ? formatBirthdate(data.dateOfBirth) : '',
          bsnHidden: '********',
          address: data.address || '',
          location: 'SR Eindhoven',
          room: data.room || 'Apartement 4B',
          alerts: getMockAlerts(data.id),
        };
        setPatient(transformed);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching patient:', err);
        setError('Could not load patient. Make sure backend is running!');
        setLoading(false);
      });
  }, [id]);

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

  // Mock alerts
  const getMockAlerts = (patientId) => {
    return [
      { label: "Wel reanimeren", icon: "❤️‍🩹", color: "#D2F8D2", textColor: "#005C0C" },
      { label: "Infecties", icon: "🌞", color: "#FDECC2", textColor: "#A66A00" },
      { label: "Slikadvies", icon: "✋", color: "#FDECC2", textColor: "#A66A00" },
    ];
  };

  // Info card component
  const InfoCard = ({ title, children, style }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: responsiveSize(16, 20),
        borderRadius: 12,
        marginBottom: responsiveSize(12, 16),
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        ...style,
      }}
    >
      <ResponsiveText
        style={{
          fontWeight: "bold",
          fontSize: responsiveSize(14, 18),
          color: "#003BCE",
          marginBottom: responsiveSize(8, 12),
        }}
      >
        {title}
      </ResponsiveText>
      <ResponsiveText style={{ color: "#333", lineHeight: 22 }}>
        {children}
      </ResponsiveText>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#F7F7F7" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ResponsiveText style={{ marginTop: 10 }}>Loading patient...</ResponsiveText>
      </View>
    );
  }

  if (error || !patient) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#F7F7F7", padding: responsivePadding() }}>
        <ResponsiveText style={{ color: 'red', textAlign: 'center' }}>
          {error || 'Patiënt niet gevonden.'}
        </ResponsiveText>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <ResponsiveText style={{ color: '#007AFF' }}>← Terug</ResponsiveText>
        </TouchableOpacity>
      </View>
    );
  }

  // Calculate initials
  const initials = patient.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F7F7" }}
      contentContainerStyle={{ padding: responsivePadding(), paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: responsiveSize(20, 30) }}>
        <TouchableOpacity onPress={() => router.back()}>
          <ResponsiveText style={{ fontSize: responsiveSize(18, 24) }}>←</ResponsiveText>
        </TouchableOpacity>
        <ResponsiveText
          style={{
            fontWeight: "bold",
            fontSize: responsiveSize(20, 28),
            marginLeft: responsiveSize(12, 16),
          }}
        >
          Dashboard
        </ResponsiveText>
      </View>

      {/* Patient Info Card */}
      <View
        style={{
          backgroundColor: "white",
          padding: responsiveSize(20, 30),
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          marginBottom: responsiveSize(20, 30),
        }}
      >
        {/* Header with Avatar */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: responsiveSize(70, 100),
              height: responsiveSize(70, 100),
              borderRadius: 100,
              backgroundColor: "#F8B9C1",
              justifyContent: "center",
              alignItems: "center",
              marginRight: responsiveSize(16, 24),
            }}
          >
            <ResponsiveText
              style={{
                fontWeight: "bold",
                color: "#A60024",
                fontSize: responsiveSize(22, 34),
              }}
            >
              {initials}
            </ResponsiveText>
          </View>

          <View style={{ flex: 1 }}>
            <ResponsiveText
              style={{
                fontWeight: "bold",
                color: "#003BCE",
                fontSize: responsiveSize(20, 28),
                marginBottom: 4,
              }}
            >
              {patient.name}
            </ResponsiveText>

            <ResponsiveText style={{ color: "#666", fontSize: responsiveSize(12, 16) }}>
              {patient.birthdate} | {patient.bsnHidden}
            </ResponsiveText>

            {patient.address ? (
              <ResponsiveText style={{ color: "#666", fontSize: responsiveSize(12, 16) }}>
                {patient.address}
              </ResponsiveText>
            ) : null}

            <ResponsiveText style={{ color: "#666", fontSize: responsiveSize(12, 16) }}>
              Signaleringen (3)
            </ResponsiveText>
          </View>
        </View>

        {/* ALERT BADGES */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: responsiveSize(8, 12),
            marginTop: responsiveSize(16, 24),
          }}
        >
          {patient.alerts.map((alert, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: alert.color,
                paddingVertical: responsiveSize(6, 10),
                paddingHorizontal: responsiveSize(12, 16),
                borderRadius: 8,
              }}
            >
              <ResponsiveText
                style={{
                  color: alert.textColor,
                  fontWeight: "600",
                  fontSize: responsiveSize(12, 16),
                }}
              >
                {alert.icon} {alert.label}
              </ResponsiveText>
            </View>
          ))}
        </View>
      </View>

      {/* Info Grid */}
      <InfoCard title="Medische voorgeschiedenis">
        Multiple Sclerose (Primair Progressief): Diagnose 2016.{"\n"}
        Neurogene blaas: Maakt gebruik van verblijfskatheter (SPC).{"\n"}
        Recividerende Urineweginfecties{"\n"}
        Dysfagie: Verslikkingsgevaar bij dun vloeibaar.
      </InfoCard>

      <InfoCard title="Allergieën en overgevoeligheden">
        Antibiotica (nitrofurantoïne): Ernstige misselijkheid/braken{"\n"}
        Pleisters: Huidirritatie bij fixatiepleisters{"\n"}
        Hooikoorts (Boompollen)
      </InfoCard>

      <InfoCard title="Locatie">
        {patient.room} (Begeleid wonen)
      </InfoCard>

      <InfoCard title="Medicatie">
        Baclofen: 10mg 3x daags{"\n"}
        Oxybutynine{"\n"}
        Macrogol{"\n"}
        Antibiotica profylaxe 1x daags preventief
      </InfoCard>

      <InfoCard title="Contactpersonen">
        1e contact: Dhr. Mark de Boer (partner) 06-12341234{"\n"}
        2e contact: Mevr. A. de Client (moeder) 06-43214321{"\n"}
        Neuroloog: Dr. Visser (Catharina ziekenhuis)
      </InfoCard>

      <InfoCard title="Zorgplan en Aandachtspunten">
        Voeding: Dranken indikken tot niveau 2 (vla-dikte) i.v.m. slikadvies. Rustig eten in rechte zithouding.{"\n\n"}
        Hygiëne: Strikte handhygiëne bij verzorging katheter i.v.m. infectierisico.{"\n\n"}
        Mobiliteit: Transfer met actieve tillift, kan kleine stukjes staan.
      </InfoCard>

      {/* Latest Report */}
      <InfoCard title="Laatste rapportage" style={{ borderLeftWidth: 4, borderLeftColor: "#4CAF50" }}>
        Tijdens de lunch ging het slikken moeizaam, Karin moest vaak kuchen. Ik heb de dranken iets dikker gemaakt. De insteekopening van de katheter ziet er rustig uit, geen roodheid. Ze voelt zich wel wat warm aan, graag temperatuur controleren in de avonddienst.
      </InfoCard>

      {/* Start Recording Button - Fixed at bottom */}
      <TouchableOpacity
        onPress={() => router.push(`/record?id=${patient.id}&name=${encodeURIComponent(patient.name)}`)}
        style={{
          backgroundColor: "#E53935",
          paddingVertical: responsiveSize(18, 26),
          borderRadius: 18,
          marginTop: responsiveSize(10, 16),
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: responsiveSize(40, 50),
            height: responsiveSize(40, 50),
            borderRadius: 25,
            backgroundColor: "rgba(255,255,255,0.2)",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <ResponsiveText style={{ color: "white", fontWeight: "bold", fontSize: responsiveSize(12, 16) }}>
            REC
          </ResponsiveText>
        </View>
        <ResponsiveText style={{ color: "white", fontWeight: "700", fontSize: responsiveSize(16, 20) }}>
          Start opname
        </ResponsiveText>
      </TouchableOpacity>
    </ScrollView>
  );
}
