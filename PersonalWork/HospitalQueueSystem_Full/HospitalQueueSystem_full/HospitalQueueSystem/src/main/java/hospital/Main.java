package hospital;

import hospital.enums.UrgencyLevel;
import hospital.exceptions.NoAvailableDoctorException;
import hospital.exceptions.PatientNotFoundException;
import hospital.model.Doctor;
import hospital.model.Patient;
import hospital.service.HospitalQueue;
import hospital.util.ConsoleFormatter;

import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {

    private static final HospitalQueue hospital = new HospitalQueue();
    private static final Scanner       scanner  = new Scanner(System.in);

    public static void main(String[] args) {
        printWelcome();
        seedData();

        boolean running = true;
        while (running) {
            printMenu();
            int choice = readInt("Choice: ", 1, 9);
            switch (choice) {
                case 1 -> registerPatient();
                case 2 -> assignNextPatient();
                case 3 -> dischargePatient();
                case 4 -> hospital.printQueueStatus();
                case 5 -> hospital.printDoctors();
                case 6 -> hospital.printActiveRecords();
                case 7 -> addDoctor();
                case 8 -> hospital.printDischargeLog();
                case 9 -> running = false;
            }
        }

        ConsoleFormatter.printInfo("System shut down. Goodbye.");
        scanner.close();
    }

    // ── Seeded data ───────────────────────────────────────────────────────────

    private static void seedData() {
        ConsoleFormatter.printHeader("Loading demo data");

        hospital.addDoctor(new Doctor("Dr. Nkosi",   45, "011-555-0001", "Emergency"));
        hospital.addDoctor(new Doctor("Dr. Patel",   38, "011-555-0002", "General"));
        hospital.addDoctor(new Doctor("Dr. Mahlangu",51, "011-555-0003", "Cardiology"));

        hospital.registerPatient(new Patient("Thabo Dlamini",  34, "082-111-0001",
                "Chest pain, shortness of breath", UrgencyLevel.CRITICAL));
        hospital.registerPatient(new Patient("Fatima Mokoena", 29, "082-111-0002",
                "High fever, severe headache",      UrgencyLevel.HIGH));
        hospital.registerPatient(new Patient("John Sithole",   62, "082-111-0003",
                "Mild back pain",                   UrgencyLevel.LOW));
        hospital.registerPatient(new Patient("Zanele Khumalo", 45, "082-111-0004",
                "Broken arm after fall",            UrgencyLevel.MEDIUM));

        System.out.println();
    }

    // ── Menu actions ──────────────────────────────────────────────────────────

    private static void registerPatient() {
        ConsoleFormatter.printHeader("Register New Patient");
        try {
            System.out.print("  Full name     : ");
            String name    = scanner.nextLine().trim();
            int    age     = readInt("  Age           : ", 0, 120);
            System.out.print("  Contact number: ");
            String contact = scanner.nextLine().trim();
            System.out.print("  Symptoms      : ");
            String symptoms = scanner.nextLine().trim();

            System.out.println("\n  Urgency levels:");
            for (UrgencyLevel u : UrgencyLevel.values()) {
                System.out.printf("    %d – %-8s %s%n",
                        u.getPriority(), u.name(), u.getDescription());
            }
            int uChoice = readInt("  Select (1-4)  : ", 1, 4);
            UrgencyLevel urgency = UrgencyLevel.fromInt(uChoice);

            hospital.registerPatient(new Patient(name, age, contact, symptoms, urgency));

        } catch (IllegalArgumentException e) {
            ConsoleFormatter.printError("Invalid input – " + e.getMessage());
        }
    }

    private static void assignNextPatient() {
        ConsoleFormatter.printHeader("Assign Next Patient");
        try {
            hospital.assignNextPatient();
        } catch (NoAvailableDoctorException e) {
            ConsoleFormatter.printWarning(e.getMessage());
        }
    }

    private static void dischargePatient() {
        ConsoleFormatter.printHeader("Discharge Patient");
        hospital.printActiveRecords();
        System.out.print("\n  Patient ID    : ");
        String id = scanner.nextLine().trim();
        System.out.print("  Discharge notes: ");
        String notes = scanner.nextLine().trim();
        try {
            hospital.dischargePatient(id, notes);
        } catch (PatientNotFoundException e) {
            ConsoleFormatter.printError(e.getMessage());
        }
    }

    private static void addDoctor() {
        ConsoleFormatter.printHeader("Add New Doctor");
        try {
            System.out.print("  Full name       : ");
            String name = scanner.nextLine().trim();
            int    age  = readInt("  Age             : ", 18, 80);
            System.out.print("  Contact         : ");
            String contact = scanner.nextLine().trim();
            System.out.print("  Specialization  : ");
            String spec = scanner.nextLine().trim();
            hospital.addDoctor(new Doctor(name, age, contact, spec));
        } catch (IllegalArgumentException e) {
            ConsoleFormatter.printError("Invalid input – " + e.getMessage());
        }
    }

    // ── UI helpers ────────────────────────────────────────────────────────────

    private static void printWelcome() {
        System.out.println(ConsoleFormatter.BOLD + ConsoleFormatter.CYAN);
        System.out.println("╔══════════════════════════════════════════════════════════╗");
        System.out.println("║         HOSPITAL QUEUE MANAGEMENT SYSTEM v1.0           ║");
        System.out.println("║              Java OOP Portfolio Project                  ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        System.out.println(ConsoleFormatter.RESET);
    }

    private static void printMenu() {
        System.out.println(ConsoleFormatter.BOLD + "\n  ── Main Menu ──" + ConsoleFormatter.RESET);
        System.out.println("  1. Register new patient");
        System.out.println("  2. Assign next patient to doctor");
        System.out.println("  3. Discharge patient");
        System.out.println("  4. View queue status");
        System.out.println("  5. View all doctors");
        System.out.println("  6. View active records");
        System.out.println("  7. Add new doctor");
        System.out.println("  8. View discharge log");
        System.out.println("  9. Exit");
    }

    /** Reads an int in [min, max], re-prompting on bad input. */
    private static int readInt(String prompt, int min, int max) {
        while (true) {
            System.out.print(prompt);
            try {
                int value = Integer.parseInt(scanner.nextLine().trim());
                if (value >= min && value <= max) return value;
                System.out.printf("  Please enter a number between %d and %d.%n", min, max);
            } catch (NumberFormatException e) {
                System.out.println("  Invalid input – please enter a number.");
            }
        }
    }
}
