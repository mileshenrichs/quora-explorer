class RelatedQuestion {

    constructor(qTitle, qUrl) {
        this.id = qUrl.substring(22);
        this.title = qTitle;
        this.numAnswers = undefined;
        this.topRatedAnswerScore = undefined;
    }

    hasNoData() {
        return this.numAnswers === undefined && this.topRatedAnswerScore === undefined;
    }

}