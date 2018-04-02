package model;

public class Person {

    final private String name;
    final private String surname;
    final private String mansion;

    public Person(int id, String name, String surname, String mansion) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.mansion = mansion;
    }

    final private int id;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getMansion() {
        return mansion;
    }

}
