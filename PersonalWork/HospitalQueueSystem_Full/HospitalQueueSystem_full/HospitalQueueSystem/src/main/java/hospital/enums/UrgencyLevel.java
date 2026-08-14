package hospital.enums;

public enum UrgencyLevel {
    CRITICAL(1, "Immediate threat to life", "🔴"),
    HIGH(2, "Serious but stable",          "🟠"),
    MEDIUM(3, "Needs attention soon",       "🟡"),
    LOW(4,    "Minor, can wait",            "🟢");

    private final int    priority;
    private final String description;
    private final String indicator;

    UrgencyLevel(int priority, String description, String indicator) {
        this.priority    = priority;
        this.description = description;
        this.indicator   = indicator;
    }

    public int    getPriority()    { return priority;    }
    public String getDescription() { return description; }
    public String getIndicator()   { return indicator;   }

    public static UrgencyLevel fromInt(int choice) {
        for (UrgencyLevel level : values()) {
            if (level.priority == choice) return level;
        }
        throw new IllegalArgumentException("Invalid urgency choice: " + choice);
    }
}
