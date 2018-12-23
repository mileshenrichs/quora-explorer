class PopoverManager {

    /**
     * @param relatedQuestions list of RelatedQuestion objects
     * @param listDOM reference to <ul> DOM element storing list of related question links
     */
    constructor(relatedQuestions, listDOM) {
        this.relatedQuestions = relatedQuestions;
        this.listDOM = listDOM;
    }

    openPopover(questionId) {
        const questionIndex = this.relatedQuestions.map(rq => rq.id).indexOf(questionId);
        const questionLi = this.listDOM.children[questionIndex];
        if(!questionLi.querySelector('div.qe-popover')) {
            const popup = document.createElement('div');
            popup.className = 'qe-popover';

            questionLi.appendChild(popup);

            const relatedQuestion = this.relatedQuestions[questionIndex];
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

            this.relatedQuestions[questionIndex].isPopoverOpen = true;
        }
    }

    closePopover(questionId) {
        const questionIndex = this.relatedQuestions.map(rq => rq.id).indexOf(questionId);
        const popup = this.listDOM.children[questionIndex].querySelector('div.qe-popover');
        this.relatedQuestions[questionIndex].isPopoverOpen = false;

        popup.classList.add('fading-out');
        setTimeout(() => {
            if(!this.relatedQuestions[questionIndex].isPopoverOpen) {
                this.listDOM.children[questionIndex].removeChild(popup);
            }
        }, 300);
    }

}