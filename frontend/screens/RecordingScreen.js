import { useState, useRef } from "react";
import { View, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Audio } from "expo-av";
import ResponsiveText from "../components/ResponsiveText";
import { transcribeAudio } from "../services/api";
import { responsiveSize, responsivePadding } from "../lib/responsive";

export default function RecordingScreen() {
  const { id, name } = useLocalSearchParams();
  const patientName = name ? decodeURIComponent(name) : 'Patient';

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recordingRef = useRef(null);

  const handleStartRecording = async () => {
    try {
      setStatus('Starting recording...');
      setTranscription('');

      // Request permissions
      const { status: permissionStatus } = await Audio.requestPermissionsAsync();
      if (permissionStatus !== 'granted') {
        setStatus('Error: Microphone permission denied');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setIsRecording(true);
      setStatus('Recording in progress...');
    } catch (error) {
      console.error('Error starting recording:', error);
      setStatus('Error: Could not start recording. ' + error.message);
    }
  };

  const handleStopRecording = async () => {
    if (!recordingRef.current) {
      return;
    }

    setIsRecording(false);
    setIsProcessing(true);
    setStatus('Processing audio...');

    try {
      // Stop recording
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      setStatus('Sending to Whisper for transcription...');

      // Send to backend for transcription
      const result = await transcribeAudio(uri, id);

      setTranscription(result.text || result.transcriptionText || 'No transcription available');
      setStatus('Transcription Complete!');
      setIsProcessing(false);

      // Clean up
      recordingRef.current = null;

      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    } catch (error) {
      console.error('Error processing recording:', error);
      setStatus('Error: ' + error.message);
      setIsProcessing(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F7F7" }}
      contentContainerStyle={{ padding: responsivePadding(), flexGrow: 1 }}
    >
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginBottom: responsiveSize(20, 30) }}
      >
        <ResponsiveText style={{ fontSize: responsiveSize(14, 20) }}>
          ← Terug
        </ResponsiveText>
      </TouchableOpacity>

      {/* Title */}
      <ResponsiveText
        style={{
          fontWeight: "bold",
          fontSize: responsiveSize(24, 36),
          marginBottom: responsiveSize(10, 15),
        }}
      >
        Opname maken
      </ResponsiveText>

      {/* Patient info */}
      <View
        style={{
          backgroundColor: "white",
          padding: responsiveSize(16, 24),
          borderRadius: 12,
          marginBottom: responsiveSize(20, 30),
        }}
      >
        <ResponsiveText style={{ fontWeight: "600", color: "#003BCE" }}>
          {patientName}
        </ResponsiveText>
        <ResponsiveText style={{ color: "#666", marginTop: 4 }}>
          ID: {id}
        </ResponsiveText>
      </View>

      {/* Record button */}
      <TouchableOpacity
        onPress={isRecording ? handleStopRecording : handleStartRecording}
        disabled={isProcessing}
        style={{
          backgroundColor: isRecording ? "#FF5252" : "#E53935",
          paddingVertical: responsiveSize(24, 36),
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          width: responsiveSize(150, 200),
          height: responsiveSize(150, 200),
          opacity: isProcessing ? 0.5 : 1,
          shadowColor: "#E53935",
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
        }}
      >
        <ResponsiveText
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: responsiveSize(18, 26),
          }}
        >
          {isRecording ? "⏹ Stop" : "🎤 Start"}
        </ResponsiveText>
      </TouchableOpacity>

      {/* Status */}
      {status && !isProcessing && (
        <View
          style={{
            marginTop: responsiveSize(20, 30),
            padding: responsiveSize(12, 18),
            backgroundColor: "#E3F2FD",
            borderRadius: 10,
          }}
        >
          <ResponsiveText style={{ textAlign: "center", color: "#1565C0" }}>
            {status}
          </ResponsiveText>
        </View>
      )}

      {/* Processing Modal */}
      <Modal
        visible={isProcessing}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: responsiveSize(30, 40),
              borderRadius: 20,
              alignItems: "center",
              width: "80%",
              maxWidth: 400,
            }}
          >
            <ActivityIndicator size="large" color="#E53935" />
            <ResponsiveText
              style={{
                fontWeight: "bold",
                fontSize: responsiveSize(18, 24),
                marginTop: responsiveSize(16, 24),
              }}
            >
              Processing Audio
            </ResponsiveText>
            <ResponsiveText
              style={{
                color: "#666",
                textAlign: "center",
                marginTop: responsiveSize(8, 12),
              }}
            >
              {status}
            </ResponsiveText>
            <ResponsiveText
              style={{
                color: "#999",
                fontSize: responsiveSize(12, 16),
                marginTop: responsiveSize(8, 12),
              }}
            >
              Whisper is transcribing your recording...
            </ResponsiveText>
          </View>
        </View>
      </Modal>

      {/* Transcription result */}
      {transcription && (
        <View
          style={{
            marginTop: responsiveSize(20, 30),
            padding: responsiveSize(16, 24),
            backgroundColor: "white",
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: "#4CAF50",
          }}
        >
          <ResponsiveText
            style={{
              fontWeight: "bold",
              marginBottom: responsiveSize(10, 15),
              color: "#2E7D32",
            }}
          >
            Whisper Transcription (Dutch):
          </ResponsiveText>
          <ResponsiveText style={{ lineHeight: 24 }}>
            {transcription}
          </ResponsiveText>
        </View>
      )}
    </ScrollView>
  );
}
