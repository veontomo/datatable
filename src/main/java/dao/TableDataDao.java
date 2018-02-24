package dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;

public class TableDataDao {
	private final Faker faker = new Faker(new Locale("en-GB"), new Random(1));
	private final DateFormat formatter = new SimpleDateFormat("dd MMMM yyy");

	public String getName() {
		return faker.name().firstName();
	}

	public String[] getRow() {
		final Name name = faker.name();
		final String date = formatter.format(faker.date().past(5000, TimeUnit.DAYS));
		return new String[] { name.firstName(), name.lastName(), faker.company().profession(), faker.address().city(),
				date, faker.commerce().price(20000.0, 80000.0) };
	}
}
