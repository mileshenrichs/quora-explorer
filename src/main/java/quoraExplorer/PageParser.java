package quoraExplorer;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PageParser {
    private final String pageHtml;
    private List<Answer> answers;

    public PageParser(String pageSource) {
        this.pageHtml = pageSource;
    }

    public List<Answer> getAnswers() {
        if(answers == null) {
            parseAnswers();
        }
        return answers;
    }

    public int getAnswerCount() {
        if(answers == null) {
            parseAnswers();
        }
        return answers.size();
    }

    private void parseAnswers() {
        this.answers = new ArrayList<>();

        Document doc = Jsoup.parse(pageHtml);
        Elements answers = doc.select("div.pagedlist_item div.Answer");
        for(Element answer : answers) {
            String author;
            Element authorLink = answer.selectFirst("a.user");
            if(authorLink == null) {
                author = "Anonymous";
            } else {
                author = authorLink.text();
            }
            float upvoteCount;

            Element upvoteDetail = answer.selectFirst("a.AnswerVoterListModalLink");
            if(upvoteDetail != null) {
                String upvoteDetailText = upvoteDetail.text();
                Pattern p = Pattern.compile("View (.*) Upvoter[s]?");
                Matcher m = p.matcher(upvoteDetailText);
                String upvoteCountStr = "";
                if(m.matches()) {
                    upvoteCountStr = m.group(1);
                }

                if(upvoteCountStr.contains("k")) {
                    upvoteCount = Float.parseFloat(upvoteCountStr.substring(0, upvoteCountStr.length() - 1));
                    upvoteCount *= 1000;
                } else {
                    upvoteCount = Float.parseFloat(upvoteCountStr);
                }
            } else {
                upvoteCount = 0;
            }

            this.answers.add(new Answer(author, (int) upvoteCount));
        }
    }
}
