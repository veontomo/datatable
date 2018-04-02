package model;

public class PersonModel {
    private final String name;
    private final String position;

    

    public PersonModel(String name, String position) {
        this.name = name;
        this.position = position;
    }

    public String getPosition() {
        return position;
    }
    
    public String getName() {
        return name;
    }
}
