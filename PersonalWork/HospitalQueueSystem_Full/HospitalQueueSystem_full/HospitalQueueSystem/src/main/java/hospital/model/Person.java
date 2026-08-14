package hospital.model;

public abstract class Person {
    private final String name;
    private final int    age;
    private final String contactNumber;

    public Person(String name, int age, String contactNumber) {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Name cannot be empty.");
        if (age < 0 || age > 150)
            throw new IllegalArgumentException("Invalid age: " + age);
        this.name          = name.trim();
        this.age           = age;
        this.contactNumber = contactNumber;
    }

    public String getName()          { return name;          }
    public int    getAge()           { return age;           }
    public String getContactNumber() { return contactNumber; }

    public abstract String getRole();

    @Override
    public String toString() {
        return String.format("%s [%s] | Age: %d | Contact: %s", name, getRole(), age, contactNumber);
    }
}
