/**
 * RelatedQuestion is a question listed in the list of "Related Questions" links
 * on a given Quora question page.
 */
class RelatedQuestion {

    constructor(qTitle, qUrl) {
        this.id = qUrl.substring(22);
        this.title = qTitle;
        this.numAnswers = undefined;
        this.topRatedAnswerScore = undefined;
    }

    hasData() {
        return this.numAnswers !== undefined && this.topRatedAnswerScore !== undefined;
    }

}