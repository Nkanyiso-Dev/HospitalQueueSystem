package hospital.exceptions;

public class NoAvailableDoctorException extends Exception {
    public NoAvailableDoctorException() {
        super("No doctors are currently available. Patient remains in queue.");
    }
}
