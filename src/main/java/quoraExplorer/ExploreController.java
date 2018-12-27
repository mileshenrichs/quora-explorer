package quoraExplorer;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ExploreController {

    @GetMapping("/")
    public String happyHealthCheck() {
        return "It's all good";
    }

    @GetMapping("/api/top-rated-answer")
    public String getTopRatedAnswer(
            @RequestParam(value="q") String q
    ) {
        AnswerExtractor answerExtractor = new AnswerExtractor("https://quora.com/" + q);
        List<Answer> answers = answerExtractor.getAnswers();
        if(answers.isEmpty()) {
            return "--";
        }
        System.out.println(answers.size() + " answers collected");

        AnswerListAnalyzer answerListAnalyzer = new AnswerListAnalyzer(answers);
        return answerListAnalyzer.pickHighestRatedAnswer();
    }

}
