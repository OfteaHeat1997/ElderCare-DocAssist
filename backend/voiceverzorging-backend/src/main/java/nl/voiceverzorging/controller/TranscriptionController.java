package nl.voiceverzorging.controller;

import nl.voiceverzorging.dto.TranscriptionDTO;
import nl.voiceverzorging.service.WhisperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * REST Controller for audio transcription
 * Base path: /v1/transcriptions
 */
@RestController
@RequestMapping("/v1/transcriptions")
@CrossOrigin(origins = "*")
public class TranscriptionController {

    private final WhisperService whisperService;

    @Autowired
    public TranscriptionController(WhisperService whisperService) {
        this.whisperService = whisperService;
    }

    /**
     * POST /v1/transcriptions
     * Upload audio file and get transcription
     *
     * @param patientId UUID of the patient (optional, for context)
     * @param audioFile Audio file (webm, mp3, wav, m4a, etc.)
     * @return Transcription text in Dutch
     */
    @PostMapping
    public ResponseEntity<TranscriptionDTO> transcribeAudio(
            @RequestParam(required = false) UUID patientId,
            @RequestParam("audio") MultipartFile audioFile) {

        try {
            // Validate file
            if (audioFile.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Log for debugging
            System.out.println("=== New Transcription Request ===");
            System.out.println("File: " + audioFile.getOriginalFilename());
            System.out.println("Size: " + audioFile.getSize() + " bytes");
            System.out.println("Content-Type: " + audioFile.getContentType());
            System.out.println("Patient ID: " + patientId);

            // Transcribe audio using Python Whisper
            TranscriptionDTO transcription = whisperService.transcribeAudio(audioFile);

            return ResponseEntity.ok(transcription);

        } catch (Exception e) {
            System.err.println("=== Transcription Error ===");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /v1/transcriptions/test
     * Test endpoint to verify service is running
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Transcription service is running!");
    }
}