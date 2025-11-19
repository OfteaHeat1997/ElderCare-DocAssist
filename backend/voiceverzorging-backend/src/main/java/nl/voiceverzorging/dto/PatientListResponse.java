package nl.voiceverzorging.dto;

import java.util.List;

public class PatientListResponse {

    private List<PatientDTO> data;
    private int total;
    private int limit;
    private int offset;

    public PatientListResponse() {
    }

    public PatientListResponse(List<PatientDTO> data, int total, int limit, int offset) {
        this.data = data;
        this.total = total;
        this.limit = limit;
        this.offset = offset;
    }

    public List<PatientDTO> getData() {
        return data;
    }

    public void setData(List<PatientDTO> data) {
        this.data = data;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }
}