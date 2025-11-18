import { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import ResponsiveView from "../components/ResponsiveView";
import ResponsiveText from "../components/ResponsiveText";
import { fakePatients } from "../data/fakePatients";
import { Link } from "expo-router";
import PatientCard from "../components/PatientCard";
import { isTablet, responsiveSize } from "../lib/responsive";

export default function PatientSelectionScreen() {
  const [search, setSearch] = useState("");

  const filtered = fakePatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.includes(search) ||
      p.room.toLowerCase().includes(search.toLowerCase())
  );

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
          <Link
            key={p.id}
            href={{
              pathname: "/record",
              params: { id: p.id },
            }}
            asChild
          >
            <PatientCard patient={p} />
          </Link>
        ))}
      </ScrollView>
    </ResponsiveView>
  );
}
