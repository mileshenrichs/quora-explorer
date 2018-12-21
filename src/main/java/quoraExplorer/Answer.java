package quoraExplorer;

public class Answer {
    private String author;
    private int numUpvotes;

    public Answer(String author, int numUpvotes) {
        this.author = author;
        this.numUpvotes = numUpvotes;
    }

    public int getNumUpvotes() {
        return numUpvotes;
    }

    public String getAuthor() {
        return author;
    }
}
