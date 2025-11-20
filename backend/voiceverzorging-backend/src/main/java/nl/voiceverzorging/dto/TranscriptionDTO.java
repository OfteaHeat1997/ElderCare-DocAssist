package nl.voiceverzorging.dto;

public class TranscriptionDTO {

    private String text;
    private String language;
    private Double duration;

    public TranscriptionDTO() {
    }

    public TranscriptionDTO(String text, String language, Double duration) {
        this.text = text;
        this.language = language;
        this.duration = duration;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }
}










































