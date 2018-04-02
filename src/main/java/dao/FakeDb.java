package dao;

import java.util.Arrays;
import java.util.Locale;
import java.util.Random;
import java.util.stream.Stream;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;

import model.DatatableControl;

public class FakeDb {

    final static private int size = 35;

    final static private String[][] rows = new String[size][4];

    private final static Faker faker = new Faker(new Locale("en-GB"), new Random(1));

    public FakeDb() {
        for (int i = 0; i < size; i++) {
            final Name name = faker.name();
            rows[i][0] = String.valueOf(i);
            rows[i][1] = name.firstName();
            rows[i][2] = name.lastName();
            rows[i][3] = faker.company().profession();
        }
    }

    public int getSize() {
        return size;
    }

    public String[] getRow(int i) {
        final String[] row = rows[i];
        return new String[] { row[0], row[1], row[2], row[3] };
    }

    public String[][] getRows(final DatatableControl filter) {
        final String name = filter.getName();
        final String position = filter.getPosition();
        final Stream<String[]> stream = Arrays.stream(rows)
                .filter(row -> name == null || name.isEmpty() ? true : name.equals(row[1]))
                .filter(row -> position == null || position.isEmpty() || "all".equals(position) ? true
                        : position.equals(row[3]))
                .skip(filter.getStart()).limit(filter.getLength());
        return stream.toArray(String[][]::new);
    }

    public String[] getUniqueColumnValues(int i) {
        return Arrays.stream(rows).map(elem -> elem[i]).distinct().toArray(String[]::new);

    }

}
