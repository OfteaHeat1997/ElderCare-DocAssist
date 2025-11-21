import { TouchableOpacity, View } from "react-native";
import ResponsiveText from "./ResponsiveText";
import { responsiveSize, isTablet } from "../lib/responsive";

export default function PatientCard({ patient, onPress }) {
  // Initialen berekenen
  const initials = patient.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <TouchableOpacity
      onPress={() => onPress(patient)}
      style={{
        backgroundColor: "#FFFFFF",
        padding: responsiveSize(16, 26),
        borderRadius: 22,
        marginBottom: responsiveSize(14, 20),
        borderWidth: 1,
        borderColor: "#E6E6E6",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {/* Rij: Avatar + Info */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Avatar */}
        <View
          style={{
            width: responsiveSize(60, 90),
            height: responsiveSize(60, 90),
            borderRadius: 100,
            backgroundColor: "#F8B9C1",
            justifyContent: "center",
            alignItems: "center",
            marginRight: responsiveSize(16, 26),
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

        {/* Tekstblok */}
        <View style={{ flex: 1 }}>
          <ResponsiveText
            style={{
              fontWeight: "bold",
              color: "#003BCE",
              fontSize: responsiveSize(20, 30),
              marginBottom: 6,
            }}
          >
            {patient.name}
          </ResponsiveText>

          <ResponsiveText
            style={{
              color: "#333",
              fontSize: responsiveSize(14, 22),
              marginBottom: 4,
            }}
          >
            {patient.birthdate} | {patient.bsnHidden} | {patient.address}
          </ResponsiveText>

          <ResponsiveText
            style={{
              color: "#555",
              fontSize: responsiveSize(14, 20),
              marginBottom: 8,
            }}
          >
            {patient.location} | Signaleringen ({patient.alerts.length})
          </ResponsiveText>

          {/* BADGES */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: responsiveSize(8, 14),
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
                  paddingHorizontal: responsiveSize(10, 16),
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
      </View>
    </TouchableOpacity>
  );
}
