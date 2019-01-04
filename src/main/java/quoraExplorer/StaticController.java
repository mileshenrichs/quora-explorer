package quoraExplorer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller to serve static HTML pages (i.e. privacy policy page)
 */
@Controller
public class StaticController {

    @RequestMapping("/legal/privacy-policy")
    public String privacyPolicy() {
        return "privacyPolicy";
    }

}
