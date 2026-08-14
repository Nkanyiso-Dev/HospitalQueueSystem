package hospital;

import hospital.enums.UrgencyLevel;
import hospital.exceptions.NoAvailableDoctorException;
import hospital.exceptions.PatientNotFoundException;
import hospital.model.Doctor;
import hospital.model.Patient;
import hospital.model.PatientRecord;
import hospital.service.HospitalQueue;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class HospitalQueueTest {

    private HospitalQueue queue;
    private Doctor        doctor;

    @BeforeEach
    void setUp() {
        queue  = new HospitalQueue();
        doctor = new Doctor("Dr. Test", 40, "000-0000", "General");
        queue.addDoctor(doctor);
    }

    // ── Registration ──────────────────────────────────────────────────────────

    @Test
    @Order(1)
    @DisplayName("Registering a patient increases queue size")
    void testRegisterPatientIncreasesQueueSize() {
        queue.registerPatient(makePatient("Alice", UrgencyLevel.LOW));
        assertEquals(1, queue.getQueueSize());
    }

    @Test
    @Order(2)
    @DisplayName("Multiple patients all added to queue")
    void testMultiplePatientsInQueue() {
        queue.registerPatient(makePatient("Alice",   UrgencyLevel.LOW));
        queue.registerPatient(makePatient("Bob",     UrgencyLevel.HIGH));
        queue.registerPatient(makePatient("Charlie", UrgencyLevel.MEDIUM));
        assertEquals(3, queue.getQueueSize());
    }

    // ── Priority ordering ─────────────────────────────────────────────────────

    @Test
    @Order(3)
    @DisplayName("CRITICAL patient is assigned before LOW patient")
    void testCriticalBeforeLow() throws NoAvailableDoctorException {
        Patient low      = makePatient("Low",      UrgencyLevel.LOW);
        Patient critical = makePatient("Critical", UrgencyLevel.CRITICAL);

        queue.registerPatient(low);
        queue.registerPatient(critical);

        // Add a second doctor so both can be assigned
        queue.addDoctor(new Doctor("Dr. Two", 35, "000-0001", "Emergency"));

        PatientRecord first = queue.assignNextPatient();
        assertNotNull(first);
        assertEquals("Critical", first.getPatient().getName());
    }

    @Test
    @Order(4)
    @DisplayName("Assign reduces queue size by one")
    void testAssignReducesQueueSize() throws NoAvailableDoctorException {
        queue.registerPatient(makePatient("Alice", UrgencyLevel.MEDIUM));
        queue.assignNextPatient();
        assertEquals(0, queue.getQueueSize());
    }

    // ── Doctor availability ───────────────────────────────────────────────────

    @Test
    @Order(5)
    @DisplayName("Doctor marked unavailable after assignment")
    void testDoctorBecomesUnavailableAfterAssignment() throws NoAvailableDoctorException {
        queue.registerPatient(makePatient("Alice", UrgencyLevel.HIGH));
        queue.assignNextPatient();
        assertFalse(doctor.isAvailable());
    }

    @Test
    @Order(6)
    @DisplayName("Throws NoAvailableDoctorException when all doctors busy")
    void testThrowsWhenNoDoctorAvailable() throws NoAvailableDoctorException {
        queue.registerPatient(makePatient("Alice", UrgencyLevel.HIGH));
        queue.assignNextPatient(); // doctor is now busy

        queue.registerPatient(makePatient("Bob", UrgencyLevel.MEDIUM));
        assertThrows(NoAvailableDoctorException.class, () -> queue.assignNextPatient());
    }

    // ── Discharge ─────────────────────────────────────────────────────────────

    @Test
    @Order(7)
    @DisplayName("Doctor freed after patient discharge")
    void testDoctorFreedAfterDischarge() throws Exception {
        Patient patient = makePatient("Alice", UrgencyLevel.HIGH);
        queue.registerPatient(patient);
        queue.assignNextPatient();

        assertFalse(doctor.isAvailable(), "Should be busy before discharge");

        queue.dischargePatient(patient.getPatientId(), "Recovered");
        assertTrue(doctor.isAvailable(), "Should be free after discharge");
    }

    @Test
    @Order(8)
    @DisplayName("Patient marked as discharged after discharge call")
    void testPatientMarkedDischarged() throws Exception {
        Patient patient = makePatient("Alice", UrgencyLevel.LOW);
        queue.registerPatient(patient);
        queue.assignNextPatient();
        queue.dischargePatient(patient.getPatientId(), "All clear");
        assertTrue(patient.isDischarged());
    }

    @Test
    @Order(9)
    @DisplayName("Throws PatientNotFoundException for unknown ID")
    void testThrowsForUnknownPatientId() {
        assertThrows(PatientNotFoundException.class,
                () -> queue.dischargePatient("P-9999", "Some notes"));
    }

    @Test
    @Order(10)
    @DisplayName("Discharging already-discharged patient throws exception")
    void testDoubleDischargeThrows() throws Exception {
        Patient patient = makePatient("Alice", UrgencyLevel.LOW);
        queue.registerPatient(patient);
        queue.assignNextPatient();
        queue.dischargePatient(patient.getPatientId(), "First discharge");

        assertThrows(PatientNotFoundException.class,
                () -> queue.dischargePatient(patient.getPatientId(), "Second discharge"));
    }

    // ── Input validation ──────────────────────────────────────────────────────

    @Test
    @Order(11)
    @DisplayName("Patient with blank name throws IllegalArgumentException")
    void testBlankNameThrows() {
        assertThrows(IllegalArgumentException.class,
                () -> new Patient("  ", 25, "000", "Headache", UrgencyLevel.LOW));
    }

    @Test
    @Order(12)
    @DisplayName("Patient with blank symptoms throws IllegalArgumentException")
    void testBlankSymptomsThrows() {
        assertThrows(IllegalArgumentException.class,
                () -> new Patient("Bob", 25, "000", "   ", UrgencyLevel.LOW));
    }

    @Test
    @Order(13)
    @DisplayName("Patient with invalid age throws IllegalArgumentException")
    void testInvalidAgeThrows() {
        assertThrows(IllegalArgumentException.class,
                () -> new Patient("Eve", -5, "000", "Cough", UrgencyLevel.LOW));
    }

    // ── Helper ────────────────────────────────────────────────────────────────

    private Patient makePatient(String name, UrgencyLevel urgency) {
        return new Patient(name, 30, "000-0000", "General complaint", urgency);
    }
}
