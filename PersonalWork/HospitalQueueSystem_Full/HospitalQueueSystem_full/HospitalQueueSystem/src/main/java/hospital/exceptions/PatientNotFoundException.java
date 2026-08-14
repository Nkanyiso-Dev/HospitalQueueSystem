package hospital.exceptions;

public class PatientNotFoundException extends Exception {
    public PatientNotFoundException(String patientId) {
        super("No active record found for patient ID: " + patientId);
    }
}
