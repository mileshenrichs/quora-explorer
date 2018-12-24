/**
 * Interface to build/manipulate parts of a popover.
 * Instantiate an instance of PopoverBuilder by passing a DOM reference to the <li> of a related question.
 * When new PopoverBuilder() constructor is called, it will insert an empty popover.
 * Use setX() methods to populate the popover with data as it becomes available.
 */
class PopoverBuilder {

    constructor(liDOMReference) {
        this.liDOMReference = liDOMReference;
        this.initNewPopover();
        this.popoverDivDOMReference = this.liDOMReference.querySelector('div.qe-popover');
    }

    initNewPopover() {
        const domParser = new DOMParser().parseFromString(HTMLFactory.getBasePopoverMarkup(), 'text/xml');
        const popoverContent = domParser.firstChild;
        this.liDOMReference.appendChild(popoverContent);

        // view link click listener to prompt browser navigation to question (for some reason link href doesn't work)
        popoverContent.querySelector('a.view-question-button').addEventListener('click', this.followQuestionLink);
    }

    setTitle(title) {
        const h2 = this.popoverDivDOMReference.querySelector('h2.question-title');
        h2.innerHTML = title;
    }

    setViewButtonUrl(urlHref) {
        const btn = this.popoverDivDOMReference.querySelector('a.view-question-button');
        btn.setAttribute('href', urlHref);
    }

    followQuestionLink() {
        // "this" is a reference to the "view" button (<a> element)
        window.location.href = this.attributes.href.value;
    }

}