package hospital.util;

import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FileLogger {

    private static final String RECORDS_DIR = "records";
    private static final String LOG_FILE    = RECORDS_DIR + "/discharge_log.txt";
    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    static {
        try {
            Files.createDirectories(Paths.get(RECORDS_DIR));
        } catch (IOException e) {
            System.err.println("Warning: could not create records directory – " + e.getMessage());
        }
    }

    /** Appends a discharge report to the log file. */
    public static void logDischarge(String report) {
        String entry = "\n" + "=".repeat(60) + "\n"
                + "Logged: " + LocalDateTime.now().format(FMT) + "\n"
                + report + "\n";
        try (FileWriter fw = new FileWriter(LOG_FILE, true)) {
            fw.write(entry);
        } catch (IOException e) {
            System.err.println("Warning: could not write to log – " + e.getMessage());
        }
    }

    /** Reads and returns the full log, or a message if it is empty. */
    public static String readLog() {
        try {
            String content = Files.readString(Paths.get(LOG_FILE));
            return content.isBlank() ? "(No records yet.)" : content;
        } catch (IOException e) {
            return "(No records yet.)";
        }
    }
}
