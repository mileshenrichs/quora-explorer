class ScrapeService {

    static scrapeQuestion(qId) {
        return fetch('http://localhost:8080/api/explore?q=' + encodeURIComponent(qId));
    }

}