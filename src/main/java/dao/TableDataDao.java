package dao;

import java.util.Locale;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;

public class TableDataDao {
	private final Faker faker = new Faker(new Locale("IT"), new Random(1));

	public String getName() {
		return faker.name().firstName();
	}

	public String[] getRow() {
		final Name name = faker.name();
		return new String[] { name.firstName(), name.lastName(), faker.company().profession(), faker.address().city(),
				faker.date().past(1000, TimeUnit.DAYS).toString(), faker.commerce().price(20000.0, 80000.0) };
	}
}
