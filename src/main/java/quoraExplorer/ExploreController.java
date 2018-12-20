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
            int prevPageSourceLength = Integer.MIN_VALUE;
            String pageSource = "";

            while(pageSource.length() != prevPageSourceLength) {
                prevPageSourceLength = pageSource.length();

                jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight)");

                TimeUnit.MILLISECONDS.sleep(300);

                jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight * .85)");

                TimeUnit.MILLISECONDS.sleep(300);

                pageSource = driver.getPageSource();
                System.out.println(pageSource.length());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return new ScrapeInfo(-1, 100);
    }

}
