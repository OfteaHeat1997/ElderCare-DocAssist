import { View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import ResponsiveView from "../components/ResponsiveView";
import ResponsiveText from "../components/ResponsiveText";
import { responsiveSize, responsivePadding, isTablet } from "../lib/responsive";
import { Ionicons } from "@expo/vector-icons"; // ← toegevoegd

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View
        style={{
          backgroundColor: "#FFD54F",
          paddingVertical: responsiveSize(30, 50),
          paddingHorizontal: responsivePadding(),
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <ResponsiveText style={{ fontWeight: "bold" }}>
          Hallo Kim 👋
        </ResponsiveText>
        <ResponsiveText style={{ marginTop: 5 }}>
          Wat wil je vandaag doen?
        </ResponsiveText>
      </View>

      {/* CONTENT AREA */}
      <ResponsiveView
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            gap: responsiveSize(14, 22),
          }}
        >
          {/* QUICK ACTION 1 */}
          <Link href="/patient-selection" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                paddingVertical: responsiveSize(20, 28),
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Ionicons name="person-outline" size={24} color="white" />
              <ResponsiveText
                style={{ color: "white", fontWeight: "600", marginTop: 6 }}
              >
                Patiënt selecteren
              </ResponsiveText>
            </TouchableOpacity>
          </Link>

          {/* QUICK ACTION 2 */}
          <Link href="/record" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#E53935",
                paddingVertical: responsiveSize(20, 28),
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Ionicons name="mic-outline" size={24} color="white" />
              <ResponsiveText
                style={{ color: "white", fontWeight: "600", marginTop: 6 }}
              >
                Nieuwe opname
              </ResponsiveText>
            </TouchableOpacity>
          </Link>

          {/* QUICK ACTION 3 */}
          <Link href="/review" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#8E24AA",
                paddingVertical: responsiveSize(20, 28),
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Ionicons name="document-text-outline" size={24} color="white" />
              <ResponsiveText
                style={{ color: "white", fontWeight: "600", marginTop: 6 }}
              >
                Notities bekijken
              </ResponsiveText>
            </TouchableOpacity>
          </Link>
        </View>
      </ResponsiveView>
    </View>
  );
}
