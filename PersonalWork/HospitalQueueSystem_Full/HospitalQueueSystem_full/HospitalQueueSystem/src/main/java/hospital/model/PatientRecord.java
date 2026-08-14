package hospital.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class PatientRecord {

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final Patient       patient;
    private final Doctor        assignedDoctor;
    private final LocalDateTime assignedTime;
    private       LocalDateTime dischargeTime;

    public PatientRecord(Patient patient, Doctor doctor) {
        this.patient        = patient;
        this.assignedDoctor = doctor;
        this.assignedTime   = LocalDateTime.now();
    }

    public void closeRecord(String notes) {
        patient.discharge(notes);
        assignedDoctor.setAvailable(true);
        this.dischargeTime = LocalDateTime.now();
    }

    public String getSummary() {
        return String.format("[%s] %-20s | Dr. %-20s | Assigned: %s | Discharged: %s",
                patient.getPatientId(), patient.getName(),
                assignedDoctor.getName(),
                assignedTime.format(FMT),
                dischargeTime != null ? dischargeTime.format(FMT) : "Still attending");
    }

    public Patient       getPatient()       { return patient;        }
    public Doctor        getDoctor()        { return assignedDoctor; }
    public LocalDateTime getAssignedTime()  { return assignedTime;   }
    public LocalDateTime getDischargeTime() { return dischargeTime;  }
    public boolean       isClosed()         { return patient.isDischarged(); }
}
