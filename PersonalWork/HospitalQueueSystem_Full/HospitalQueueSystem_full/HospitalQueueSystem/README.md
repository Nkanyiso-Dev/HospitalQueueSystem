# Hospital Queue Management System

A Java OOP portfolio project that models a real hospital patient triage and queue system. Built to demonstrate core object-oriented programming principles in a practical, interview-friendly context.

---

## Features

- Register patients with urgency levels (Critical → Low)
- Auto-priority queue — critical patients always go first
- Assign patients to available doctors
- Discharge patients with notes and free the doctor automatically
- Persist discharge records to a log file across sessions
- Coloured terminal output for readability
- 13 JUnit 5 unit tests covering the full workflow

---

## OOP Concepts Demonstrated

| Concept | Where |
|---|---|
| **Encapsulation** | Private fields + getters in every class |
| **Inheritance** | `Patient` and `Doctor` both extend abstract `Person` |
| **Abstraction** | `Person` is abstract; `Triageable` and `Dischargeable` are interfaces |
| **Polymorphism** | `Patient` cast as `Triageable` or `Dischargeable` depending on context |
| **Composition** | `PatientRecord` holds a `Patient` and a `Doctor` |
| **Enums with behaviour** | `UrgencyLevel` carries priority int + description |
| **Custom exceptions** | `NoAvailableDoctorException`, `PatientNotFoundException` |
| **Generics** | `PriorityQueue<Patient>`, `List<Doctor>`, `List<PatientRecord>` |
| **Streams & Lambdas** | Filtering doctors, sorting queue output |
| **File I/O** | `FileLogger` persists discharge reports to `records/discharge_log.txt` |

---

## Project Structure

```
src/
├── main/java/hospital/
│   ├── Main.java                          ← CLI entry point
│   ├── enums/
│   │   └── UrgencyLevel.java              ← CRITICAL / HIGH / MEDIUM / LOW
│   ├── interfaces/
│   │   ├── Triageable.java
│   │   └── Dischargeable.java
│   ├── model/
│   │   ├── Person.java                    ← Abstract base class
│   │   ├── Patient.java                   ← Extends Person, implements both interfaces
│   │   ├── Doctor.java                    ← Extends Person
│   │   └── PatientRecord.java             ← Links patient + doctor
│   ├── service/
│   │   └── HospitalQueue.java             ← Core business logic
│   ├── exceptions/
│   │   ├── NoAvailableDoctorException.java
│   │   └── PatientNotFoundException.java
│   └── util/
│       ├── FileLogger.java                ← Discharge log persistence
│       └── ConsoleFormatter.java          ← Coloured terminal output
└── test/java/hospital/
    └── HospitalQueueTest.java             ← 13 JUnit 5 tests
```

---

## Getting Started

**Prerequisites:** Java 17+, Maven 3.8+

```bash
# Clone and build
git clone https://github.com/YOUR_USERNAME/hospital-queue-system.git
cd hospital-queue-system

# Run tests
mvn test

# Run the application
mvn package -q
java -jar target/hospital-queue.jar
```

---

## Sample Session

```
╔══════════════════════════════════════════════════════════╗
║         HOSPITAL QUEUE MANAGEMENT SYSTEM v1.0           ║
╚══════════════════════════════════════════════════════════╝

  ── Main Menu ──
  1. Register new patient
  2. Assign next patient to doctor
  ...

✔  Patient registered → 🔴 CRITICAL   | Thabo Dlamini       | Symptoms: Chest pain ...
✔  Assigned Thabo Dlamini [CRITICAL] → Dr. Nkosi
✔  Patient discharged successfully.
```

---

## Running Tests

```bash
mvn test
```

All 13 tests cover: registration, priority ordering, doctor availability, discharge flow, double-discharge guard, and input validation.

---

## Author

Built as a Java OOP portfolio project. Open to junior software developer opportunities.
