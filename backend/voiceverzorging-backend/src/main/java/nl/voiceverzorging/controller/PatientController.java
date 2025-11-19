package nl.voiceverzorging.controller;

import nl.voiceverzorging.dto.PatientDTO;
import nl.voiceverzorging.dto.PatientListResponse;
import nl.voiceverzorging.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public ResponseEntity<PatientListResponse> getAllPatients(
            @RequestParam(defaultValue = "50") int limit,
            @RequestParam(defaultValue = "0") int offset) {

        if (limit < 1 || limit > 100) {
            limit = 50;
        }
        if (offset < 0) {
            offset = 0;
        }

        PatientListResponse response = patientService.getAllPatients(limit, offset);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable UUID patientId) {
        return patientService.getPatientById(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PatientDTO> createPatient(@RequestBody PatientDTO patientDTO) {
        PatientDTO created = patientService.createPatient(
                patientDTO.getFirstName(),
                patientDTO.getLastName()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}