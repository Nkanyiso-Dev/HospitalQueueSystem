package hospital.util;

public class ConsoleFormatter {

    public static final String RESET  = "\u001B[0m";
    public static final String RED    = "\u001B[31m";
    public static final String YELLOW = "\u001B[33m";
    public static final String GREEN  = "\u001B[32m";
    public static final String CYAN   = "\u001B[36m";
    public static final String BOLD   = "\u001B[1m";

    public static void printHeader(String title) {
        String line = "─".repeat(60);
        System.out.println("\n" + BOLD + CYAN + line);
        System.out.printf("  %s%n", title.toUpperCase());
        System.out.println(line + RESET);
    }

    public static void printSuccess(String msg) {
        System.out.println(GREEN + "✔  " + msg + RESET);
    }

    public static void printWarning(String msg) {
        System.out.println(YELLOW + "⚠  " + msg + RESET);
    }

    public static void printError(String msg) {
        System.out.println(RED + "✖  " + msg + RESET);
    }

    public static void printInfo(String msg) {
        System.out.println(CYAN + "ℹ  " + msg + RESET);
    }

    public static void printDivider() {
        System.out.println("─".repeat(60));
    }
}
