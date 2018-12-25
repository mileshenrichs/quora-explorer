class ScrapeService {

    static getAnswerCount(qId) {
        return fetch('http://localhost:8080/api/answer-count?q=' + encodeURIComponent(qId));
    }

    static getTopRatedAnswer(qId) {
        return fetch('http://localhost:8080/api/top-rated-answer?q=' + encodeURIComponent(qId));
    }

}