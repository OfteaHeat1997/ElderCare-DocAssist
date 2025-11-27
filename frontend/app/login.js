import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ResponsiveText from "../components/ResponsiveText";
import { responsiveSize, responsivePadding } from "../lib/responsive";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    if (!email.trim()) {
      setError("Voer uw e-mailadres in");
      return;
    }
    if (!password.trim()) {
      setError("Voer uw wachtwoord in");
      return;
    }

    const result = login(email.trim().toLowerCase(), password);
    if (result.success) {
      router.replace("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="medical"
            size={responsiveSize(60, 80)}
            color="#007AFF"
          />
          <ResponsiveText style={styles.title}>ElderCare DocAssist</ResponsiveText>
          <ResponsiveText style={styles.subtitle}>
            Log in met uw account
          </ResponsiveText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={responsiveSize(22, 28)} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mailadres"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(text) => { setEmail(text); setError(""); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={responsiveSize(22, 28)} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Wachtwoord"
              placeholderTextColor="#999"
              value={password}
              onChangeText={(text) => { setPassword(text); setError(""); }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={responsiveSize(22, 28)}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error ? (
            <ResponsiveText style={styles.errorText}>{error}</ResponsiveText>
          ) : null}

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <ResponsiveText style={styles.loginButtonText}>Inloggen</ResponsiveText>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ResponsiveText style={styles.footerText}>Demo accounts:</ResponsiveText>
          <ResponsiveText style={styles.footerText}>maria@eldercare.nl / wachtwoord123</ResponsiveText>
          <ResponsiveText style={styles.footerText}>jan@eldercare.nl / wachtwoord123</ResponsiveText>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsivePadding() * 1.5,
  },
  header: {
    alignItems: "center",
    marginBottom: responsiveSize(40, 60),
  },
  title: {
    fontSize: responsiveSize(24, 36),
    fontWeight: "bold",
    color: "#333",
    marginTop: responsiveSize(15, 20),
  },
  subtitle: {
    fontSize: responsiveSize(16, 24),
    color: "#666",
    marginTop: responsiveSize(8, 12),
  },
  form: {
    gap: responsiveSize(16, 24),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: responsiveSize(16, 20),
    height: responsiveSize(56, 70),
  },
  inputIcon: {
    marginRight: responsiveSize(12, 16),
  },
  input: {
    flex: 1,
    fontSize: responsiveSize(16, 22),
    color: "#333",
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: responsiveSize(14, 18),
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    height: responsiveSize(56, 70),
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveSize(8, 12),
  },
  loginButtonText: {
    color: "#fff",
    fontSize: responsiveSize(18, 24),
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: responsiveSize(30, 50),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    fontSize: responsiveSize(12, 16),
    color: "#999",
    marginTop: 4,
  },
});
