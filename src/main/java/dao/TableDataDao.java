package dao;

import java.util.Locale;
import java.util.Random;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;

import model.Person;

public class TableDataDao {
	private final Faker faker = new Faker(new Locale("en-GB"), new Random(1));

	public String getName() {
		return faker.name().firstName();
	}

	public Person getRow() {
		final Name name = faker.name();
		return new Person( name.firstName(), name.lastName(), faker.company().profession() );
	}
}
