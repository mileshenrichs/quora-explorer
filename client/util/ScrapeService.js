class ScrapeService {

    static scrapeQuestion(qUrl) {
        const questionIdentifier = qUrl.substring(22);
        return fetch('http://localhost:8080/api/explore?q=' + questionIdentifier);
    }

}