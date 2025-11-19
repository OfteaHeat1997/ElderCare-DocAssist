package nl.voiceverzorging.service;

import nl.voiceverzorging.dto.PatientDTO;
import nl.voiceverzorging.dto.PatientListResponse;
import nl.voiceverzorging.mapper.PatientMapper;
import nl.voiceverzorging.model.Patient;
import nl.voiceverzorging.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public PatientListResponse getAllPatients(int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        Page<Patient> patientPage = patientRepository.findAll(pageable);

        List<PatientDTO> patientDTOs = patientPage.getContent()
                .stream()
                .map(PatientMapper::toDTO)
                .collect(Collectors.toList());

        return new PatientListResponse(
                patientDTOs,
                (int) patientPage.getTotalElements(),
                limit,
                offset
        );
    }

    public Optional<PatientDTO> getPatientById(UUID id) {
        return patientRepository.findById(id)
                .map(PatientMapper::toDTO);
    }

    public PatientDTO createPatient(String firstName, String lastName) {
        Patient patient = new Patient(firstName, lastName);
        Patient savedPatient = patientRepository.save(patient);
        return PatientMapper.toDTO(savedPatient);
    }
}