class PopupManager {

    /**
     * @param relatedQuestions list of RelatedQuestion objects
     * @param listDOM reference to <ul> DOM element storing list of related question links
     */
    constructor(relatedQuestions, listDOM) {
        this.relatedQuestions = relatedQuestions;
        this.listDOM = listDOM;
    }

    openPopover(questionId) {
        const questionLi = this.listDOM.children[questionId];
        if(!questionLi.querySelector('div.qe-popover')) {
            const popup = document.createElement('div');
            popup.className = 'qe-popover';

            questionLi.appendChild(popup);

            const relatedQuestion = this.relatedQuestions[questionId];
            if(relatedQuestion.numAnswers === undefined && relatedQuestion.topRatedAnswerScore === undefined) {
                // todo: show loading indicator

                // scrape question information
                // QuestionScraper.scrapeQuestion(relatedQuestion.url)
                //     .then(({ ansCount, topScore }) => {
                //         console.log('ansCount: ' + ansCount);
                //         console.log('topScore: ' + topScore);
                //     }).catch(err => {
                //         console.log(err);
                //     });

                ScrapeService.scrapeQuestion(relatedQuestion.url)
                    .then(res => res.json())
                    .then(scrapeInfo => {
                        console.log(scrapeInfo);
                    }).catch(err => {
                        console.log(err);
                    });
            }
        }
    }

    closePopover(questionId) {
        const popup = this.listDOM.children[questionId].querySelector('div.qe-popover');

        popup.classList.add('fading-out');
        setTimeout(() => {
            this.listDOM.children[questionId].removeChild(popup);
        }, 300);
    }

}