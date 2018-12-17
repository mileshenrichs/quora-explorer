package quoraExplorer;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ExploreController {

    @GetMapping("/api/explore")
    public ScrapeInfo exploreQuestion(
            @RequestParam(value="q") String q
    ) {
        System.out.println(q);
        return new ScrapeInfo(-1, 100);
    }

}
