package hospital.model;

import java.util.concurrent.atomic.AtomicInteger;

public class Doctor extends Person {

    private static final AtomicInteger ID_COUNTER = new AtomicInteger(100);

    private final String  doctorId;
    private final String  specialization;
    private       boolean available;

    public Doctor(String name, int age, String contact, String specialization) {
        super(name, age, contact);
        if (specialization == null || specialization.isBlank())
            throw new IllegalArgumentException("Specialization cannot be empty.");
        this.doctorId       = "D-" + ID_COUNTER.getAndIncrement();
        this.specialization = specialization.trim();
        this.available      = true;
    }

    @Override
    public String getRole() { return "Doctor"; }

    public String  getDoctorId()        { return doctorId;       }
    public String  getSpecialization()  { return specialization; }
    public boolean isAvailable()        { return available;      }
    public void    setAvailable(boolean available) { this.available = available; }

    @Override
    public String toString() {
        return String.format("Dr. %-20s | Specialization: %-15s | %s",
                getName(), specialization, available ? "Available" : "Busy");
    }
}
