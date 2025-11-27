import { View, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router";
import ResponsiveView from "../components/ResponsiveView";
import ResponsiveText from "../components/ResponsiveText";
import { responsiveSize, responsivePadding, isTablet } from "../lib/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, isLoggedIn, logout } = useAuth();

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <ResponsiveText style={{ fontWeight: "bold" }}>
              Welkom {user?.name || "Verpleegkundige"}
            </ResponsiveText>
            <ResponsiveText style={{ marginTop: 5 }}>
              Wat wil je vandaag doen?
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              padding: responsiveSize(10, 14),
              borderRadius: 10,
            }}
          >
            <Ionicons name="log-out-outline" size={responsiveSize(24, 32)} color="#333" />
          </TouchableOpacity>
        </View>
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
        </View>
      </ResponsiveView>
    </View>
  );
}
