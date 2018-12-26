package rnd;

import quoraExplorer.Answer;
import quoraExplorer.AnswerExtractor;

import java.util.Arrays;
import java.util.List;

public class ResearchAndDevelopment {

    public static void main(String[] args) {
        // Test the hypothesis: for all questions with 50 or more answers, the top rated answer is guaranteed
        // to reside within the first 50 listed answers.  For example, the top rated answer for a question with
        // 250 answers will be one of the first 50.

        List<String> questionIds = Arrays.asList(
                "Quora-is-a-curated-community-of-early-adopters-now-Its-nice-but-how-can-it-scale-What-will-prevent-Quora-from-becoming-similar-to-Yahoo-Answers",
                "Why-are-my-questions-not-answered-on-Quora",
                "Why-do-people-write-such-lengthy-answers-on-Quora",
                "Why-are-answers-on-Quora-collapsed",
                "Whats-the-most-inspiring-story-of-your-life",
                "Which-are-the-best-motivational-books-1",
                "What-books-should-entrepreneurs-read",
                "What-are-the-top-25-books-you-should-read",
                "What-is-the-strangest-sorting-algorithm",
                "How-can-I-become-a-data-scientist-1",
                "What-are-the-best-sites-for-learning-Data-Science-1",
                "What-was-your-scariest-travel-experience",
                "What-is-the-scariest-thing-that-has-ever-happened-to-you-2",
                "What-are-the-creepiest-paranormal-experiences-one-ever-had",
                "Whats-the-most-inexplicable-experience-youve-ever-had-whether-supernatural-paranormal-bizarre-coincidence-mysterious-intuition-prophetic-dream-or-unexpected-lab-result",
                "What-have-been-some-of-your-best-experiences-while-traveling",
                "What-are-the-worst-travel-experiences-you-have-ever-encountered",
                "What-is-your-worst-ever-showering-experience",
                "What-has-been-your-worst-experience-in-a-restaurant",
                "What-are-your-worst-experiences-in-a-movie-theatre",
                "What-is-your-craziest-TSA-experience",
                "What-is-your-craziest-US-immigration-experience",
                "Why-do-people-want-to-immigrate-to-the-United-States",
                "How-can-I-immigrate-to-the-US",
                "How-do-I-learn-to-cook-1",
                "What-can-you-cook",
                "What-are-the-best-ways-to-cook-chicken",
                "What-is-the-best-way-to-prepare-steak-What-is-the-best-cut-to-use-What-seasonings-are-best-and-in-what-proportions-What-is-the-ideal-degree-of-cooking-from-blue-to-well-done-Im-looking-for-optimum-deliciousness",
                "What-is-the-best-way-to-learn-Spanish-on-your-own",
                "Why-is-Spanish-an-important-language-to-learn",
                "What-is-the-best-way-to-learn-Spanish-independently-without-having-to-travel-to-a-Spanish-speaking-country",
                "What’s-the-simplest-way-to-learn-the-Spanish-language",
                "If-fire-needs-oxygen-where-does-the-sun-get-oxygen-if-theres-no-oxygen-in-space",
                "Can-people-see-atoms-with-their-naked-eye-To-rephrase-it-can-an-atom-be-so-dense-that-it’s-visible-to-the-naked-eye",
                "What-is-the-resolution-of-the-human-eye-in-megapixels",
                "What-is-the-speed-of-gravity-If-the-Sun-disappeared-would-the-Earth-continue-in-its-orbit-for-8½-minutes",
                "The-sun-attracts-the-moon-with-a-force-twice-as-large-as-the-attraction-of-the-earth-on-the-moon-Why-does-the-moon-not-revolve-around-the-sun",
                "How-and-why-are-planets-spherical-What-makes-them-round",
                "Could-a-hollow-earth-be-theoretically-possible",
                "Why-was-the-Earth-named-Earth-Who-named-it-How-have-the-planets-been-named"
        );

        for(String qId : questionIds) {
            AnswerExtractor extractor = new AnswerExtractor("https://quora.com/" + qId);
            List<Answer> answers = extractor.getAnswers();

            int highestUpvoteAnswerIndex = 0;
            for(int i = 1; i < answers.size(); i++) {
                if(answers.get(i).getNumUpvotes() > answers.get(highestUpvoteAnswerIndex).getNumUpvotes()) {
                    highestUpvoteAnswerIndex = i;
                }
            }

            System.out.println(qId + ":");
            System.out.println("  " + highestUpvoteAnswerIndex + "/" + answers.size());
        }
    }

}
