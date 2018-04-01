package model;

public class PersonModel {
    private final String name;
    private final Integer age;

    

    public PersonModel(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public Integer getAge() {
        return age;
    }
    
    public String getName() {
        return name;
    }
}
