package model;

public class DatatableControl {
    
    private final String screen;
    private final Integer pc;

    public DatatableControl(String screen, Integer pc) {
        this.screen = screen;
        this.pc = pc;
    }

    public String getScreen() {
        return screen;
    }

    public Integer getPc() {
        return pc;
    }


}
