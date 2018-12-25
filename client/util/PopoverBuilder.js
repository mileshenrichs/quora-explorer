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

    indicateLoadingState() {
        const domParser = new DOMParser().parseFromString(HTMLFactory.getDetailSectionLoadingState(), 'text/xml');
        const detailSectionLoading = domParser.firstChild;

        const detailSection = this.popoverDivDOMReference.querySelector('div.question-detail-section');
        detailSection.insertBefore(detailSectionLoading, detailSection.firstChild);
        detailSection.removeChild(detailSection.children[1]);
    }

    setNumAnswers(numAnswers) {
        console.log('setting num answers to ' + numAnswers);
        this.setChunkData(0, numAnswers);
    }

    setTopRatedAnswer(topRated) {
        console.log('setting top rated answer with upvote count ' + topRated);
        this.setChunkData(1, topRated);
    }

    setChunkData(chunkIndex, data) {
        const domParser = new DOMParser().parseFromString(HTMLFactory.getNumberChunkContainingValue(data), 'text/xml');
        const answerChunk = domParser.firstChild;

        const infoChunk = this.popoverDivDOMReference.querySelectorAll('div.info-chunk')[chunkIndex];
        infoChunk.insertBefore(answerChunk, infoChunk.firstChild);
        infoChunk.removeChild(infoChunk.children[1]);
    }

    followQuestionLink() {
        // "this" is a reference to the "view" button (<a> element)
        window.location.href = this.attributes.href.value;
    }

}