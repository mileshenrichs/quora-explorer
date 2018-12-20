package quoraExplorer;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@CrossOrigin
public class ExploreController {

    @GetMapping("/api/explore")
    public ScrapeInfo exploreQuestion(
            @RequestParam(value="q") String q
    ) {
        try {
            System.out.println(q);

            System.setProperty("webdriver.chrome.driver", "C:\\chromedriver_win32\\chromedriver.exe");
            WebDriver driver = new ChromeDriver();
            driver.get("https://quora.com/" + q);

            JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

            for(int i = 0; i < 10; i++) {
                jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight)");

                TimeUnit.MILLISECONDS.sleep(600);

                String pageSource = driver.getPageSource();
                PageParser parser = new PageParser(pageSource);
                System.out.println(pageSource.length());
                System.out.println("There are " + parser.getAnswerCount() + " answers found so far.");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return new ScrapeInfo(-1, 100);
    }

}
