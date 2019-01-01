package quoraExplorer;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin
public class ExploreController {

    @GetMapping("/api/top-rated-answer")
    public String getTopRatedAnswer(
            @RequestParam(value="q") String q,
            HttpServletRequest req
    ) {
        logRequest(q, req);

        AnswerExtractor answerExtractor = new AnswerExtractor("https://quora.com/" + q);
        List<Answer> answers = answerExtractor.getAnswers();
        if(answers.isEmpty()) {
            return "--";
        }

        AnswerListAnalyzer answerListAnalyzer = new AnswerListAnalyzer(answers);
        return answerListAnalyzer.pickHighestRatedAnswer();
    }

    private void logRequest(String questionId, HttpServletRequest request) {
        System.out.print("Question id: " + questionId);
        if(System.getenv("IS_PROD_ENVIRONMENT") != null) {
            System.out.print(" // Requested by " + getRequestingIPAddress(request));
        }
        System.out.println();
    }

    private String getRequestingIPAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-FORWARDED-FOR");
        return xForwardedForHeader.substring(0, xForwardedForHeader.indexOf(","));
    }

}
