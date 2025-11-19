package nl.voiceverzorging.mapper;

import nl.voiceverzorging.dto.PatientDTO;
import nl.voiceverzorging.model.Patient;

public class PatientMapper {

    public static PatientDTO toDTO(Patient patient) {
        if (patient == null) {
            return null;
        }

        return new PatientDTO(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName()
        );
    }

    public static Patient toEntity(PatientDTO dto) {
        if (dto == null) {
            return null;
        }

        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());

        return patient;
    }
}