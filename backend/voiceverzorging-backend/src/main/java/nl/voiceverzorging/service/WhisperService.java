package nl.voiceverzorging.service;

import nl.voiceverzorging.dto.TranscriptionDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Service
public class WhisperService {

    @Value("${whisper.python.path}")
    private String pythonPath;

    @Value("${whisper.script.path}")
    private String scriptPath;

    @Value("${whisper.temp.dir}")
    private String tempDir;

    /**
     * Transcribe audio using Python Whisper
     */
    public TranscriptionDTO transcribeAudio(MultipartFile audioFile) throws IOException {
        System.out.println("=== Starting Transcription (Python Whisper) ===");

        Path tempDirectory = Paths.get(tempDir);
        Files.createDirectories(tempDirectory);

        String filename = System.currentTimeMillis() + "_" + audioFile.getOriginalFilename();
        Path audioPath = tempDirectory.resolve(filename);

        audioFile.transferTo(audioPath.toFile());
        System.out.println("Audio saved: " + audioPath);
        System.out.println("File size: " + Files.size(audioPath) + " bytes");

        try {
            String result = callPythonWhisper(audioPath.toString());

            JSONObject json = new JSONObject(result);

            TranscriptionDTO dto = new TranscriptionDTO();
            dto.setText(json.optString("text", ""));
            dto.setLanguage(json.optString("language", "nl"));
            dto.setDuration(json.optDouble("duration", 0.0));

            System.out.println("=== Transcription Complete ===");
            System.out.println("Text length: " + dto.getText().length() + " characters");
            System.out.println("Preview: " + dto.getText().substring(0, Math.min(100, dto.getText().length())) + "...");

            return dto;

        } catch (Exception e) {
            System.err.println("=== Transcription Failed ===");
            e.printStackTrace();
            throw e;
        } finally {
            // Clean up temp file
            try {
                Files.deleteIfExists(audioPath);
                System.out.println("Cleaned up temp file: " + audioPath);
            } catch (IOException e) {
                System.err.println("Failed to delete temp file: " + e.getMessage());
            }
        }
    }

    /**
     * Call Python Whisper script
     */
    private String callPythonWhisper(String audioPath) throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                pythonPath,
                scriptPath,
                audioPath
        );

        processBuilder.redirectErrorStream(false);

        System.out.println("Command: " + pythonPath + " " + scriptPath + " " + audioPath);

        Process process = processBuilder.start();

        StringBuilder output = new StringBuilder();
        StringBuilder errorOutput = new StringBuilder();

        // Read standard output (JSON result)
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
        }

        // Read error output (progress messages)
        try (BufferedReader errorReader = new BufferedReader(
                new InputStreamReader(process.getErrorStream()))) {
            String line;
            while ((line = errorReader.readLine()) != null) {
                System.out.println("[Python] " + line);
                errorOutput.append(line).append("\n");
            }
        }

        // Wait for process to complete (max 5 minutes)
        try {
            boolean finished = process.waitFor(5, TimeUnit.MINUTES);
            if (!finished) {
                process.destroy();
                throw new IOException("Transcription timeout (5 minutes)");
            }
        } catch (InterruptedException e) {
            process.destroy();
            Thread.currentThread().interrupt();
            throw new IOException("Transcription interrupted", e);
        }

        int exitCode = process.exitValue();
        System.out.println("Python exit code: " + exitCode);

        if (exitCode != 0) {
            throw new IOException("Python Whisper failed with exit code " + exitCode + ": " + errorOutput);
        }

        String result = output.toString().trim();
        System.out.println("Python output: " + result);

        return result;
    }
}