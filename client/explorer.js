console.log('Quora explorer is running.');

const relatedQuestions = [];
let popupManager;

const relatedQuestionsDiv = document.querySelector('div.RelatedQuestions');
if(relatedQuestionsDiv) {
    const relatedQuestionsUl = relatedQuestionsDiv.querySelector('ul.list_contents');
    const relatedQuestionLinks = relatedQuestionsUl.querySelectorAll('ul.list_contents li a');
    relatedQuestionLinks.forEach(link => {
        link.addEventListener('mouseenter', triggerQuestionPopover);
        link.addEventListener('mouseleave', closeQuestionPopover);
        relatedQuestions.push(new RelatedQuestion(link.innerText, link.href));
    });

    popupManager = new PopupManager(relatedQuestions, relatedQuestionsUl);
}

function triggerQuestionPopover(hoverEvent) {
    const qId = relatedQuestions.map(q => q.url).indexOf(hoverEvent.target.href);
    popupManager.openPopover(qId);
}

function closeQuestionPopover(hoverEvent) {
    const qId = relatedQuestions.map(q => q.url).indexOf(hoverEvent.target.href);
    popupManager.closePopover(qId);
}