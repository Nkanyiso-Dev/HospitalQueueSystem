package hospital.service;

import hospital.exceptions.NoAvailableDoctorException;
import hospital.exceptions.PatientNotFoundException;
import hospital.model.Doctor;
import hospital.model.Patient;
import hospital.model.PatientRecord;
import hospital.util.ConsoleFormatter;
import hospital.util.FileLogger;

import java.util.*;
import java.util.stream.Collectors;

public class HospitalQueue {

    // Priority: lowest urgency.priority int = most urgent (CRITICAL = 1)
    private final PriorityQueue<Patient>    queue;
    private final List<Doctor>              doctors;
    private final List<PatientRecord>       records;

    public HospitalQueue() {
        this.queue   = new PriorityQueue<>(
                Comparator.comparingInt(p -> p.getUrgency().getPriority()));
        this.doctors = new ArrayList<>();
        this.records = new ArrayList<>();
    }

    // ── Doctor management ─────────────────────────────────────────────────────

    public void addDoctor(Doctor doctor) {
        doctors.add(doctor);
        ConsoleFormatter.printSuccess("Doctor added: " + doctor);
    }

    public List<Doctor> getDoctors() {
        return Collections.unmodifiableList(doctors);
    }

    // ── Patient registration ──────────────────────────────────────────────────

    public void registerPatient(Patient patient) {
        queue.add(patient);
        ConsoleFormatter.printSuccess("Patient registered → " + patient.getTriageSummary());
    }

    // ── Core queue operations ─────────────────────────────────────────────────

    /**
     * Pops the highest-urgency patient and assigns them to the first available doctor.
     * Throws checked exceptions instead of swallowing errors silently.
     */
    public PatientRecord assignNextPatient()
            throws NoAvailableDoctorException {

        if (queue.isEmpty()) {
            ConsoleFormatter.printInfo("Queue is empty – no patients to assign.");
            return null;
        }

        Doctor availableDoctor = doctors.stream()
                .filter(Doctor::isAvailable)
                .findFirst()
                .orElseThrow(NoAvailableDoctorException::new);

        Patient next = queue.poll();
        availableDoctor.setAvailable(false);

        PatientRecord record = new PatientRecord(next, availableDoctor);
        records.add(record);

        ConsoleFormatter.printSuccess(String.format(
                "Assigned %s [%s] → Dr. %s",
                next.getName(), next.getUrgency(), availableDoctor.getName()));

        return record;
    }

    /**
     * Discharges a patient by ID, frees their doctor, and logs the report.
     */
    public void dischargePatient(String patientId, String notes)
            throws PatientNotFoundException {

        PatientRecord record = records.stream()
                .filter(r -> r.getPatient().getPatientId().equalsIgnoreCase(patientId))
                .filter(r -> !r.isClosed())
                .findFirst()
                .orElseThrow(() -> new PatientNotFoundException(patientId));

        record.closeRecord(notes);
        String report = record.getPatient().generateReport();
        FileLogger.logDischarge(report);

        ConsoleFormatter.printSuccess("Patient discharged successfully.");
        System.out.println(report);
    }

    // ── Display helpers ───────────────────────────────────────────────────────

    public void printQueueStatus() {
        ConsoleFormatter.printHeader("Current Queue Status");

        if (queue.isEmpty()) {
            ConsoleFormatter.printInfo("Queue is empty.");
        } else {
            System.out.printf("%-6s %-20s %-10s %-30s%n",
                    "Pos", "Patient", "Urgency", "Symptoms");
            ConsoleFormatter.printDivider();

            List<Patient> sorted = queue.stream()
                    .sorted(Comparator.comparingInt(p -> p.getUrgency().getPriority()))
                    .collect(Collectors.toList());

            int pos = 1;
            for (Patient p : sorted) {
                System.out.printf("%-6d %-20s %-10s %-30s%n",
                        pos++, p.getName(), p.getUrgency().name(), p.getSymptoms());
            }
        }

        ConsoleFormatter.printDivider();
        System.out.println("Patients waiting : " + queue.size());
        long avail = doctors.stream().filter(Doctor::isAvailable).count();
        System.out.println("Doctors available: " + avail + " / " + doctors.size());
    }

    public void printDoctors() {
        ConsoleFormatter.printHeader("Medical Staff");
        if (doctors.isEmpty()) {
            ConsoleFormatter.printInfo("No doctors registered.");
        } else {
            doctors.forEach(System.out::println);
        }
    }

    public void printActiveRecords() {
        ConsoleFormatter.printHeader("Active Patient Records");
        List<PatientRecord> active = records.stream()
                .filter(r -> !r.isClosed())
                .collect(Collectors.toList());

        if (active.isEmpty()) {
            ConsoleFormatter.printInfo("No active records.");
        } else {
            active.forEach(r -> System.out.println(r.getSummary()));
        }
    }

    public void printDischargeLog() {
        ConsoleFormatter.printHeader("Discharge Log (all sessions)");
        System.out.println(FileLogger.readLog());
    }

    // ── Getters for testing ───────────────────────────────────────────────────

    public int getQueueSize()     { return queue.size(); }
    public List<PatientRecord> getRecords() { return Collections.unmodifiableList(records); }
}
