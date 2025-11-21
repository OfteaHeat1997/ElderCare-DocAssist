import { View, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import ResponsiveText from "../components/ResponsiveText";
import { fakePatients } from "../data/fakePatients";
import { isTablet, responsiveSize, responsivePadding } from "../lib/responsive";

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams();
  const patient = fakePatients.find((p) => p.id === id);

  if (!patient) return <ResponsiveText>Patiënt niet gevonden.</ResponsiveText>;

  // initialen berekenen
  const initials = patient.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F7F7" }}
      contentContainerStyle={{ padding: responsivePadding() }}
    >
      {/* Terugknop */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginBottom: responsiveSize(20, 30),
        }}
      >
        <ResponsiveText style={{ fontSize: responsiveSize(14, 20) }}>
          ← Terug
        </ResponsiveText>
      </TouchableOpacity>

      {/* Kaart */}
      <View
        style={{
          backgroundColor: "white",
          padding: responsiveSize(20, 30),
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Avatar */}
          <View
            style={{
              width: responsiveSize(80, 120),
              height: responsiveSize(80, 120),
              borderRadius: 100,
              backgroundColor: "#F8B9C1",
              justifyContent: "center",
              alignItems: "center",
              marginRight: responsiveSize(20, 30),
            }}
          >
            <ResponsiveText
              style={{
                fontWeight: "bold",
                color: "#A60024",
                fontSize: responsiveSize(26, 40),
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
                fontSize: responsiveSize(22, 32),
                marginBottom: 6,
              }}
            >
              {patient.name}
            </ResponsiveText>

            <ResponsiveText style={{ marginBottom: 4 }}>
              {patient.birthdate} | {patient.bsnHidden}
            </ResponsiveText>

            <ResponsiveText style={{ marginBottom: 4 }}>
              {patient.address}
            </ResponsiveText>

            <ResponsiveText>
              {patient.location} | Kamer {patient.room}
            </ResponsiveText>
          </View>
        </View>

        {/* ALERT BADGES */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: responsiveSize(10, 16),
            marginTop: responsiveSize(20, 30),
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
                paddingHorizontal: responsiveSize(12, 18),
                borderRadius: 10,
              }}
            >
              <ResponsiveText
                style={{
                  color: alert.textColor,
                  fontWeight: "600",
                }}
              >
                {alert.icon} {alert.label}
              </ResponsiveText>
            </View>
          ))}
        </View>
      </View>

      {/* OPNAME KNOP */}
      <TouchableOpacity
        onPress={() => router.push(`/record?id=${patient.id}`)}
        style={{
          backgroundColor: "#E53935",
          paddingVertical: responsiveSize(18, 26),
          borderRadius: 18,
          marginTop: responsiveSize(30, 40),
          alignItems: "center",
        }}
      >
        <ResponsiveText style={{ color: "white", fontWeight: "700" }}>
          🎤 Start opname
        </ResponsiveText>
      </TouchableOpacity>
    </ScrollView>
  );
}
