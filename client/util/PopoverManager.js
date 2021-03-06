/**
 * PopoverManager receives instructions from the explorer.js entry point script.
 * It opens popovers with the help of PopoverBuilder, keeps track of the currently open popover,
 * and closes popovers as instructed by an event listener in explorer.js.
 */
class PopoverManager {

    /**
     * @param relatedQuestions list of RelatedQuestion objects
     * @param listDOM reference to <ul> DOM element storing list of related question links
     */
    constructor(relatedQuestions, listDOM) {
        this.relatedQuestions = relatedQuestions;
        this.listDOM = listDOM;
        this.currentOpenPopoverQuestionIndex = -1;
        this.popoversCurrentlyLoadingData = new Set();
    }

    /**
     * Given a question id, open a popover above the question by directly appending HTML to the DOM
     * @param questionId the string id of the question
     */
    openPopover(questionId) {
        const questionIndex = this.relatedQuestions.map(rq => rq.id).indexOf(questionId);
        const questionLi = this.listDOM.children[questionIndex];
        if(!questionLi.querySelector('div#qe-popover')) { // check that there isn't already a popover open here
            const relatedQuestion = this.relatedQuestions[questionIndex];

            const popoverBuilder = new PopoverBuilder(questionLi);
            popoverBuilder.setTitle(relatedQuestion.title);
            popoverBuilder.setViewButtonUrl('https://quora.com/' + relatedQuestion.id);
            if(relatedQuestion.hasData()) {
                // build popover using data
                popoverBuilder.setNumAnswers(relatedQuestion.numAnswers);
                popoverBuilder.setTopRatedAnswer(relatedQuestion.topRatedAnswerScore);
            } else {
                popoverBuilder.indicateLoadingState();

                if(!this.popoversCurrentlyLoadingData.has(relatedQuestion.id)) {
                    this.popoversCurrentlyLoadingData.add(relatedQuestion.id);

                    // scrape answer count
                    QuestionScraper.getAnswerCount("https://quora.com/" + relatedQuestion.id)
                        .then(count => {
                            // update data in RelatedQuestion state object
                            this.relatedQuestions[questionIndex].numAnswers = count;

                            // if popover still open, update num answers with the new data
                            if(this.currentOpenPopoverQuestionIndex === questionIndex) {
                                popoverBuilder.setNumAnswers(count);
                                const predictedLoadTime = this.predictLoadTimeFromAnswerCount(count);
                                popoverBuilder.startLoadBar(predictedLoadTime);

                                // conclude data load if 0 answers
                                if(count === '0') {
                                    setTimeout(() => {
                                        popoverBuilder.fadeOutLoadBar();
                                        popoverBuilder.setTopRatedAnswer('--');
                                    }, 500);
                                }
                            }
                        });

                    // scrape top rated answer
                    ScrapeService.getTopRatedAnswer(relatedQuestion.id)
                        .then(res => res.text())
                        .then(topRatedAns => {
                            this.relatedQuestions[questionIndex].topRatedAnswerScore = topRatedAns;

                            if(this.currentOpenPopoverQuestionIndex === questionIndex) {
                                popoverBuilder.fadeOutLoadBar();
                                popoverBuilder.setTopRatedAnswer(topRatedAns);
                            }
                        }).catch(err => {
                            console.log(err);
                            if(this.currentOpenPopoverQuestionIndex === questionIndex) {
                                popoverBuilder.fadeOutLoadBar();
                                popoverBuilder.setTopRatedAnswer('--');
                            }
                        }).then(() => {
                            this.popoversCurrentlyLoadingData.delete(relatedQuestion.id);
                    });
                } else {
                    // still waiting for data, so set timeout to run that constantly checks arrival of data
                    // for given question while popover is still open.  clear timeout on popover close/retrieval of top rated answer
                    let hasSetAnswers = false;
                    const dataCheckInterval = setInterval(() => {
                        if(!this.currentOpenPopoverQuestionIndex === questionIndex) {
                            clearInterval(dataCheckInterval);
                        }

                        if(!hasSetAnswers && this.relatedQuestions[questionIndex].numAnswers) {
                            popoverBuilder.setNumAnswers(this.relatedQuestions[questionIndex].numAnswers);
                            hasSetAnswers = true;
                        }

                        if(this.relatedQuestions[questionIndex].topRatedAnswerScore) {
                            popoverBuilder.setTopRatedAnswer(this.relatedQuestions[questionIndex].topRatedAnswerScore);
                            clearInterval(dataCheckInterval);
                        }
                    }, 50);
                }
            }

            this.currentOpenPopoverQuestionIndex = questionIndex;
        }
    }

    /**
     * Closes the currently open popover over the span of 300 ms
     */
    closePopover() {
        const questionIndex = this.currentOpenPopoverQuestionIndex;
        const popover = this.listDOM.children[questionIndex].querySelector('div#qe-popover');
        this.currentOpenPopoverQuestionIndex = -1;

        popover.classList.add('fading-out');
        setTimeout(() => {
            this.listDOM.children[questionIndex].removeChild(popover);
        }, 300);
    }

    getCurrentPopoverDOMReference() {
        return this.listDOM.children[this.currentOpenPopoverQuestionIndex].querySelector('div#qe-popover');
    }

    hasPopoverOpen() {
        return this.currentOpenPopoverQuestionIndex > -1;
    }

    /**
     * An artificial intelligence algorithm that efficiently approximates the amount of time
     * that will likely be required for the top rated answer computation given the answer count
     * @param ansCount number of answers for a given question
     * @returns {number} a value of milliseconds, which represent the amount of time to show the loading bar
     */
    predictLoadTimeFromAnswerCount(ansCount) {
        if(ansCount <= 7)
            return Config.shortLoadTime();

        else return Config.longLoadTime();
    }

}