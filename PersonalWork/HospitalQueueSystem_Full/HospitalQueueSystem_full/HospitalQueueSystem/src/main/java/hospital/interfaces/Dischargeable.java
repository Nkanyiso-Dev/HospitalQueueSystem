package hospital.interfaces;

public interface Dischargeable {
    void   discharge(String notes);
    String generateReport();
    boolean isDischarged();
}
