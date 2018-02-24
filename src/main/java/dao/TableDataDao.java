package dao;

import java.util.Locale;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;

public class TableDataDao {
	private final Faker faker = new Faker(new Locale("IT"));
	
	
	public String getName() {
		return faker.name().firstName();
	}
	
	public String[] getRow() {
		final Name name = faker.name();
		return new String[] {name.firstName(), name.lastName(), faker.company().profession(), faker.address().city(), faker.date().birthday().toString(), String.valueOf(faker.number().randomNumber())
		};
	}
}
