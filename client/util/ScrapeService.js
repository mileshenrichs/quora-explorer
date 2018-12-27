/**
 * Service that uses Fetch API to interact with backend endpoints
 */
class ScrapeService {

    static getTopRatedAnswer(qId) {
        return fetch(Config.apiBaseUrl() + '/api/top-rated-answer?q=' + encodeURIComponent(qId));
    }

}