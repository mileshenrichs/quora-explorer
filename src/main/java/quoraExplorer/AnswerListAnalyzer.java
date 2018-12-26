package quoraExplorer;

import java.util.List;

public class AnswerListAnalyzer {
    private final List<Answer> answers;

    AnswerListAnalyzer(List<Answer> answers) {
        this.answers = answers;
    }

    String pickHighestRatedAnswer() {
        int highestRated = Integer.MIN_VALUE;

        for(Answer answer : answers) {
            highestRated = Math.max(highestRated, answer.getNumUpvotes());
        }

        return stringRepresentationOf(highestRated);
    }

    private String stringRepresentationOf(int n) {
        String nStr = String.valueOf(n);
        if(n < 1000) {
            return nStr;
        } else {
            int hundredsPlace = Integer.valueOf(nStr.substring(nStr.length() - 3)) / 100;
            StringBuilder result = new StringBuilder();
            result.append(nStr, 0, nStr.length() - 3);
            if(hundredsPlace > 0) {
                result.append(".").append(hundredsPlace);
            }
            result.append("k");

            return result.toString();
        }
    }

}
