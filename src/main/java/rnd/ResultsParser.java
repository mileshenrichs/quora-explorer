package rnd;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ResultsParser {

    public static void main(String[] args) throws IOException {
//        parseDataForExperiment1();
        parseDataForExperiment2();
    }

    private static void parseDataForExperiment1() throws IOException {
        String filePath = System.getProperty("user.dir") + "\\src\\main\\java\\rnd\\answer-index-results.txt";
        List<String> input = getInput(filePath);

        List<Result1> results = extractResults1(input);

        int totalAnswerCount = 0;
        int averageAnswerCount;
        int totalTopRatedAnswerIndex = 0;
        int averageTopRatedAnswerIndex;
        int worstRankedTopAnswerIndex = Integer.MIN_VALUE;
        int worstRankedTopAnswerIndexAnswerCount = 0;

        for(Result1 result : results) {
            totalAnswerCount += result.numAnswers;
            totalTopRatedAnswerIndex += result.topRatedAnswerIndex;
            if(result.topRatedAnswerIndex > worstRankedTopAnswerIndex) {
                worstRankedTopAnswerIndex = result.topRatedAnswerIndex;
                worstRankedTopAnswerIndexAnswerCount = result.numAnswers;
            }
            worstRankedTopAnswerIndex = Math.max(worstRankedTopAnswerIndex, result.topRatedAnswerIndex);
        }
        averageAnswerCount = totalAnswerCount / results.size();
        averageTopRatedAnswerIndex = totalTopRatedAnswerIndex / results.size();

        System.out.println("====================  RESULTS ARE IN  =====================");
        System.out.println("Question count: " + results.size() + "\n");
        System.out.println("Average answer count: " + averageAnswerCount);
        System.out.println("Average index of a top rated answer: " + averageTopRatedAnswerIndex);
        System.out.println("Worst ranked top answer index: " + worstRankedTopAnswerIndex + "/" + worstRankedTopAnswerIndexAnswerCount);
    }

    private static void parseDataForExperiment2() throws IOException {
        String filePath = System.getProperty("user.dir") + "\\src\\main\\java\\rnd\\answer-count-processing-time-results.txt";
        List<String> input = getInput(filePath);

        List<Result2> results = extractResults2(input);
        Collections.sort(results);

        for(Result2 result : results) {
            System.out.println(result.numAnswers + " " + result.runtime);
        }
    }

    private static List<String> getInput(String fileName) throws IOException {
        List<String> inputList = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        String currentLine = reader.readLine();
        while(currentLine != null) {
            inputList.add(currentLine);
            currentLine = reader.readLine();
        }

        reader.close();

        return inputList;
    }

    private static List<Result1> extractResults1(List<String> input) {
        List<Result1> results = new ArrayList<>();
        Result1 result = new Result1();
        for(int i = 0; i < input.size(); i++) {
            if(i % 4 == 0) {
                result = new Result1();
                result.questionId = input.get(i).substring(0, input.get(i).length() - 1);
            } else if(i % 4 == 1) {
                String indexToAnsCountRatio = input.get(i).substring(2);
                String[] ratioParts = indexToAnsCountRatio.split("/");
                result.topRatedAnswerIndex = Integer.parseInt(ratioParts[0]);
                result.numAnswers = Integer.parseInt(ratioParts[1]);

                results.add(result);
            }
        }

        return results;
    }

    private static List<Result2> extractResults2(List<String> input) {
        List<Result2> results = new ArrayList<>();
        for(String in : input) {
            String[] resultParts = in.split(" ");
            results.add(new Result2(Integer.valueOf(resultParts[0]), Integer.valueOf(resultParts[1])));
        }
        return results;
    }

    static class Result1 {
        String questionId;
        int topRatedAnswerIndex;
        int numAnswers;
    }

    static class Result2 implements Comparable<Result2> {
        int numAnswers;
        int runtime;

        Result2(int numAnswers, int runtime) {
            this.numAnswers = numAnswers;
            this.runtime = runtime;
        }

        @Override
        public int compareTo(Result2 other) {
            return Integer.compare(numAnswers, other.numAnswers);
        }
    }

}
