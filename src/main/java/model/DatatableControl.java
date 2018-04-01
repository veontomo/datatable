package model;

public class DatatableControl extends PersonModel {

    private final Integer start;
    private final Integer length;
    private final Integer draw;

    public DatatableControl(Integer start, Integer length, Integer draw, String name, Integer age) {
        super(name, age);
        this.start = start;
        this.length = length;
        this.draw = draw;
    }

    public Integer getStart() {
        return start;
    }

    public Integer getLength() {
        return length;
    }

    public Integer getDraw() {
        return draw;
    }

}
