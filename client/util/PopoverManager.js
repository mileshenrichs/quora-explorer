class PopoverManager {

    /**
     * @param relatedQuestions list of RelatedQuestion objects
     * @param listDOM reference to <ul> DOM element storing list of related question links
     */
    constructor(relatedQuestions, listDOM) {
        this.relatedQuestions = relatedQuestions;
        this.listDOM = listDOM;
        this.currentOpenPopoverQuestionIndex = -1;
    }

    /**
     * Given a question id, open a popover above the question by directly appending HTML to the DOM
     * @param questionId the string id of the question
     */
    openPopover(questionId) {
        const questionIndex = this.relatedQuestions.map(rq => rq.id).indexOf(questionId);
        const questionLi = this.listDOM.children[questionIndex];
        if(!questionLi.querySelector('div.qe-popover')) {
            const relatedQuestion = this.relatedQuestions[questionIndex];

            const domParser = new DOMParser().parseFromString(HTMLFactory.getNoDataPopoverMarkup(), 'text/xml');
            const popoverContent = domParser.firstChild;
            questionLi.appendChild(popoverContent);

            if(relatedQuestion.hasNoData()) {
                // todo: show loading indicator

                // scrape question information
                ScrapeService.scrapeQuestion(relatedQuestion.id)
                    .then(res => res.json())
                    .then(scrapeInfo => {
                        console.log(scrapeInfo);
                    }).catch(err => {
                        console.log(err);
                    });
            }

            this.currentOpenPopoverQuestionIndex = questionIndex;
        }
    }

    /**
     * Closes the currently open popover over the span of 300 ms
     */
    closePopover() {
        const questionIndex = this.currentOpenPopoverQuestionIndex;
        const popup = this.listDOM.children[questionIndex].querySelector('div.qe-popover');
        this.currentOpenPopoverQuestionIndex = -1;

        popup.classList.add('fading-out');
        setTimeout(() => {
            this.listDOM.children[questionIndex].removeChild(popup);
        }, 300);
    }

    getCurrentPopoverDOMReference() {
        return this.listDOM.children[this.currentOpenPopoverQuestionIndex].querySelector('div.qe-popover');
    }

    hasPopoverOpen() {
        return this.currentOpenPopoverQuestionIndex > -1;
    }

}