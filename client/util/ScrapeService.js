class ScrapeService {

    static getTopRatedAnswer(qId) {
        return fetch('http://localhost:8080/api/top-rated-answer?q=' + encodeURIComponent(qId));
    }

}