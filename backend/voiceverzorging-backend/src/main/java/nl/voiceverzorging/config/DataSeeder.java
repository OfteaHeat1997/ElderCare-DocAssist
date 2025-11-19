package nl.voiceverzorging.config;

import nl.voiceverzorging.model.Patient;
import nl.voiceverzorging.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PatientRepository patientRepository;

    @Autowired
    public DataSeeder(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public void run(String... args) {
        if (patientRepository.count() == 0) {
            seedPatients();
        }
    }

    private void seedPatients() {
        System.out.println("Seeding patient data...");

        patientRepository.save(new Patient("Maria", "Peters"));
        patientRepository.save(new Patient("Jan", "de Vries"));
        patientRepository.save(new Patient("Anna", "Bakker"));
        patientRepository.save(new Patient("Henk", "Jansen"));
        patientRepository.save(new Patient("Els", "Vermeulen"));
        patientRepository.save(new Patient("Piet", "Smit"));
        patientRepository.save(new Patient("Greet", "Mulder"));
        patientRepository.save(new Patient("Kees", "Visser"));

        System.out.println("Seeding complete! Added " + patientRepository.count() + " patients.");
    }
}