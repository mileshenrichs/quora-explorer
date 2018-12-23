console.log('Quora explorer is running.');

const relatedQuestions = [];
let popoverManager;

const relatedQuestionsDiv = document.querySelector('div.RelatedQuestions');
if(relatedQuestionsDiv) {
    const relatedQuestionsUl = relatedQuestionsDiv.querySelector('ul.list_contents');
    const relatedQuestionLinks = relatedQuestionsUl.querySelectorAll('ul.list_contents li a');
    relatedQuestionLinks.forEach(link => {
        link.addEventListener('mouseenter', triggerQuestionPopover);
        link.addEventListener('mouseleave', closeQuestionPopover);
        relatedQuestions.push(new RelatedQuestion(link.innerText, link.href));
    });

    popoverManager = new PopoverManager(relatedQuestions, relatedQuestionsUl);
}

function triggerQuestionPopover(hoverEvent) {
    const qId = hoverEvent.target.href.substring(22);
    popoverManager.openPopover(qId);
}

function closeQuestionPopover(hoverEvent) {
    const qId = hoverEvent.target.href.substring(22);
    popoverManager.closePopover(qId);
}