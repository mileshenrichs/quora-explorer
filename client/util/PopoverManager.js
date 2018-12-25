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
        if(!questionLi.querySelector('div.qe-popover')) { // check that there isn't already a popover open here
            const relatedQuestion = this.relatedQuestions[questionIndex];

            const popoverBuilder = new PopoverBuilder(questionLi);
            popoverBuilder.setTitle(relatedQuestion.title);
            popoverBuilder.setViewButtonUrl('https://quora.com/' + relatedQuestion.id);
            if(relatedQuestion.hasData()) {
                // build popover using data
                // popoverBuilder.setNumAnswers(relatedQuestion.numAnswers);
                // popoverBuilder.setTopRated(relatedQuestion.topRatedAnswerScore);
            } else {
                popoverBuilder.indicateLoadingState();

                // scrape answer count
                ScrapeService.getAnswerCount(relatedQuestion.id)
                    .then(res => res.text())
                    .then(ansCount => {
                        // update data in RelatedQuestion state object
                        this.relatedQuestions[questionIndex].numAnswers = ansCount;

                        // if popover still open, update num answers with the new data
                        if(this.currentOpenPopoverQuestionIndex === questionIndex) {
                            popoverBuilder.setNumAnswers(ansCount);
                        }
                    });

                // scrape top rated answer
                ScrapeService.getTopRatedAnswer(relatedQuestion.id)
                    .then(res => res.text())
                    .then(topRatedAns => {
                        this.relatedQuestions[questionIndex].topRatedAnswerScore = topRatedAns;

                        if(this.currentOpenPopoverQuestionIndex === questionIndex) {
                            popoverBuilder.setTopRatedAnswer(topRatedAns);
                        }
                    });

                // scrape question information
                // ScrapeService.scrapeQuestion(relatedQuestion.id)
                //     .then(res => res.json())
                //     .then(scrapeInfo => {
                //         console.log(scrapeInfo);
                //     }).catch(err => {
                //     console.log(err);
                // });
            }

            this.currentOpenPopoverQuestionIndex = questionIndex;
        }
    }

    /**
     * Closes the currently open popover over the span of 300 ms
     */
    closePopover() {
        const questionIndex = this.currentOpenPopoverQuestionIndex;
        const popover = this.listDOM.children[questionIndex].querySelector('div.qe-popover');
        this.currentOpenPopoverQuestionIndex = -1;

        popover.classList.add('fading-out');
        setTimeout(() => {
            this.listDOM.children[questionIndex].removeChild(popover);
        }, 300);
    }

    getCurrentPopoverDOMReference() {
        return this.listDOM.children[this.currentOpenPopoverQuestionIndex].querySelector('div.qe-popover');
    }

    hasPopoverOpen() {
        return this.currentOpenPopoverQuestionIndex > -1;
    }

}