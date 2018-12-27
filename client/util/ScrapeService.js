/**
 * Service that uses Fetch API to interact with backend endpoints
 */
class ScrapeService {

    static getTopRatedAnswer(qId) {
        return fetch('http://quora-explorer.us-west-1.elasticbeanstalk.com/api/top-rated-answer?q=' + encodeURIComponent(qId));
    }

}