package hospital.model;

import hospital.enums.UrgencyLevel;
import hospital.interfaces.Dischargeable;
import hospital.interfaces.Triageable;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

public class Patient extends Person implements Triageable, Dischargeable {

    private static final AtomicInteger    ID_COUNTER = new AtomicInteger(1000);
    private static final DateTimeFormatter FMT        =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final String        patientId;
    private final String        symptoms;
    private final UrgencyLevel  urgency;
    private final LocalDateTime arrivalTime;

    private boolean discharged    = false;
    private String  dischargeNotes;
    private LocalDateTime dischargeTime;

    public Patient(String name, int age, String contact, String symptoms, UrgencyLevel urgency) {
        super(name, age, contact);
        if (symptoms == null || symptoms.isBlank())
            throw new IllegalArgumentException("Symptoms cannot be empty.");
        this.patientId   = "P-" + ID_COUNTER.getAndIncrement();
        this.symptoms    = symptoms.trim();
        this.urgency     = urgency;
        this.arrivalTime = LocalDateTime.now();
    }

    // ── Triageable ────────────────────────────────────────────────────────────

    @Override
    public UrgencyLevel assessUrgency() { return urgency; }

    @Override
    public String getTriageSummary() {
        return String.format("%s %-8s | %-20s | Symptoms: %-30s | Arrived: %s",
                urgency.getIndicator(), urgency.name(),
                getName(), symptoms, arrivalTime.format(FMT));
    }

    // ── Dischargeable ─────────────────────────────────────────────────────────

    @Override
    public void discharge(String notes) {
        if (discharged) throw new IllegalStateException(getName() + " is already discharged.");
        this.discharged     = true;
        this.dischargeNotes = notes;
        this.dischargeTime  = LocalDateTime.now();
    }

    @Override
    public String generateReport() {
        long minutes = Duration.between(arrivalTime,
                dischargeTime != null ? dischargeTime : LocalDateTime.now()).toMinutes();
        return String.format(
                "Patient Report\n" +
                "  ID        : %s\n" +
                "  Name      : %s\n" +
                "  Age       : %d\n" +
                "  Symptoms  : %s\n" +
                "  Urgency   : %s\n" +
                "  Arrived   : %s\n" +
                "  Discharged: %s\n" +
                "  Wait time : %d min(s)\n" +
                "  Notes     : %s",
                patientId, getName(), getAge(), symptoms,
                urgency.name() + " – " + urgency.getDescription(),
                arrivalTime.format(FMT),
                dischargeTime != null ? dischargeTime.format(FMT) : "N/A",
                minutes,
                dischargeNotes != null ? dischargeNotes : "N/A");
    }

    @Override
    public boolean isDischarged() { return discharged; }

    // ── Person ────────────────────────────────────────────────────────────────

    @Override
    public String getRole() { return "Patient"; }

    // ── Getters ───────────────────────────────────────────────────────────────

    public String        getPatientId()   { return patientId;   }
    public String        getSymptoms()    { return symptoms;    }
    public UrgencyLevel  getUrgency()     { return urgency;     }
    public LocalDateTime getArrivalTime() { return arrivalTime; }

    public long getWaitTimeMinutes() {
        return Duration.between(arrivalTime, LocalDateTime.now()).toMinutes();
    }
}
