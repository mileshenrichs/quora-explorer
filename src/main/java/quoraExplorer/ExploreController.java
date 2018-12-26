package quoraExplorer;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@CrossOrigin
public class ExploreController {

    @GetMapping("/api/top-rated-answer")
    public String getTopRatedAnswer(
            @RequestParam(value="q") String q
    ) {
        String topRated = "--";

        try {
            System.out.println(q);

            System.setProperty("webdriver.chrome.driver", "C:\\chromedriver_win32\\chromedriver.exe");
            WebDriver driver = new ChromeDriver();
            JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
            driver.get("https://quora.com/" + q);

            List<Answer> answers = new ArrayList<>();
            PageParser parser = new PageParser(driver.getPageSource());
            int i = 1;

            while(parser.getAnswerCount() > answers.size()) {
                System.out.println("Iteration: " + i);
                System.out.println("Answer count: " + answers.size());

                answers = parser.getAnswers();
                jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                TimeUnit.SECONDS.sleep((long) 1.5);
                parser = new PageParser(driver.getPageSource());

                i++;
            }

            System.out.println("Final answer count: " + answers.size());

            AnswerListAnalyzer answerListAnalyzer = new AnswerListAnalyzer(answers);
            topRated = answerListAnalyzer.pickHighestRatedAnswer();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return topRated;
    }

}
