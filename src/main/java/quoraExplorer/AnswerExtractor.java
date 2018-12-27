package quoraExplorer;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Uses Selenium WebDriver and repeated scrolling to produce a list of all answers
 * to a given question on Quora
 */
public class AnswerExtractor {
    private final String questionUrl;

    public AnswerExtractor(String questionUrl) {
        this.questionUrl = questionUrl;
    }

    List<Answer> getAnswers() {
        List<Answer> answers = new ArrayList<>();

        System.setProperty("webdriver.chrome.driver", System.getenv("CHROME_DRIVER_PATH"));
        System.setProperty("webdriver.chrome.silentOutput", "true");

        ChromeOptions options = new ChromeOptions();
        // add arguments so it works on Linux
        options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
        WebDriver driver = new ChromeDriver(options);

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        driver.get(questionUrl);

        try {
            PageParser parser = new PageParser(driver.getPageSource());

            while(parser.getAnswerCount() > answers.size()) {
                answers = parser.getAnswers();

                // stop after collecting 36 answers,
                // about 70% of the time we'll have already seen the highest rated answer
                if(answers.size() >= 36) {
                    break;
                }

                jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                TimeUnit.SECONDS.sleep((long) 1.75);
                parser = new PageParser(driver.getPageSource());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }

        return answers;
    }
}
