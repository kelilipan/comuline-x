package dev.wisesa.comuline;
public class Station {
    private String id;
    private String name;
    private int daop;
    private int fgEnable;
    private boolean haveSchedule;
    private String updatedAt;

    // Getters for all the fields
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getDaop() {
        return daop;
    }

    public int getFgEnable() {
        return fgEnable;
    }

    public boolean isHaveSchedule() {
        return haveSchedule;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }
}
