package quoraExplorer;

public class ScrapeInfo {

    private int numAnswers;
    private int topRatedAnswerScore;

    public ScrapeInfo(int numAns, int topScore) {
        this.numAnswers = numAns;
        this.topRatedAnswerScore = topScore;
    }

    public int getNumAnswers() {
        return numAnswers;
    }

    public int getTopRatedAnswerScore() {
        return topRatedAnswerScore;
    }
}