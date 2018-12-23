console.log('Quora explorer is running.');

const relatedQuestions = [];
let popoverManager;

const relatedQuestionsDiv = document.querySelector('div.RelatedQuestions');
if(relatedQuestionsDiv) {
    const relatedQuestionsUl = relatedQuestionsDiv.querySelector('ul.list_contents');
    const relatedQuestionLinks = relatedQuestionsUl.querySelectorAll('ul.list_contents li a');
    relatedQuestionLinks.forEach(link => {
        relatedQuestions.push(new RelatedQuestion(link.innerText, link.href));
    });

    popoverManager = new PopoverManager(relatedQuestions, relatedQuestionsUl);

    relatedQuestionLinks.forEach(link => {
        link.addEventListener('mouseenter', e => {
            if(!popoverManager.hasPopoverOpen()) {
                triggerQuestionPopover(e);
            }
        });
    });
}

function triggerQuestionPopover(hoverEvent) {
    const qId = hoverEvent.target.href.substring(22);
    popoverManager.openPopover(qId);
    document.addEventListener('mousemove', onMouseMoveWhilePopoverOpen);
}

function onMouseMoveWhilePopoverOpen(e) {
    if(!popoverShouldRemainOpen(e.target)) {
        console.log('time to close!');

        document.removeEventListener('mousemove', onMouseMoveWhilePopoverOpen);
        popoverManager.closePopover();
    }
}

function popoverShouldRemainOpen(target) {
    if(target.tagName === 'A') // mouse is on related question link
        return true;

    if(target.tagName === 'SPAN' && target.className === 'ui_qtext_rendered_qtext') // mouse is on question text span
        return true;

    if(popoverManager.getCurrentPopoverDOMReference().contains(target)) // mouse is inside open popover
        return true;

    return false;
}