package hospital.interfaces;

import hospital.enums.UrgencyLevel;

public interface Triageable {
    UrgencyLevel assessUrgency();
    String       getTriageSummary();
}
