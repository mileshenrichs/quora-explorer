package quoraExplorer;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.List;

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

        // To get answers to load on infinite scroll page, scroll down.
        // Then, constantly listen for changes in the page's scroll height.
        // When scroll height changes, it means that more answers have loaded.  It also means that we're not currently at bottom of page.
        // So scroll down to bottom again and continue listening for more answers to be loaded.
        // If no answers have loaded since 1.75 seconds after the last scroll, conclude that we've seen all answers and return
        // Top answer is typically one of first ~36, so also stop after accumulating 36 answers (otherwise takes way too long for big questions)
        final long MAX_TIME_TO_WAIT_FOR_LOAD_MS = 1750;
        long previousScrollTimestamp = System.currentTimeMillis();
        long previousScrollHeight = 0;
        PageParser parser;

        while(System.currentTimeMillis() - previousScrollTimestamp < MAX_TIME_TO_WAIT_FOR_LOAD_MS) {
            parser = new PageParser(driver.getPageSource());
            answers = parser.getAnswers();
            // stop after collecting 36 answers,
            // about 70% of the time we'll have already seen the highest rated answer
            if(answers.size() >= 36) {
                break;
            }

            long currentScrollHeight = (long) jsExecutor.executeScript("return document.body.scrollHeight");
            if(currentScrollHeight > previousScrollHeight) {
                jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                previousScrollTimestamp = System.currentTimeMillis();
                previousScrollHeight = currentScrollHeight;
            }
        }

        driver.quit();
        return answers;
    }
}
