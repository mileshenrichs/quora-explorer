/**
 * Interface to build/manipulate parts of a popover.
 * Instantiate an instance of PopoverBuilder by passing a DOM reference to the <li> of a related question.
 * When new PopoverBuilder() constructor is called, it will insert an empty popover.
 * Use setX() methods to populate the popover with data as it becomes available.
 */
class PopoverBuilder {

    constructor(liDOMReference) {
        this.initNewPopover(liDOMReference);
        this.popoverDivDOMReference = liDOMReference.querySelector('div#qe-popover');
    }

    initNewPopover(liDOMReference) {
        const domParser = new DOMParser().parseFromString(HTMLFactory.getBasePopoverMarkup(), 'text/xml');
        const popoverContent = domParser.firstChild;
        liDOMReference.appendChild(popoverContent);

        // view link click listener to prompt browser navigation to question (for some reason link href doesn't work)
        popoverContent.querySelector('a#view-question-button').addEventListener('click', this.followQuestionLink);
    }

    setTitle(title) {
        const h2 = this.popoverDivDOMReference.querySelector('h2#question-title');
        h2.innerHTML = title;
    }

    setViewButtonUrl(urlHref) {
        const btn = this.popoverDivDOMReference.querySelector('a#view-question-button');
        btn.setAttribute('href', urlHref);
    }

    indicateLoadingState() {
        const domParser = new DOMParser().parseFromString(HTMLFactory.getDetailSectionLoadingState(), 'text/xml');
        const detailSectionLoading = domParser.firstChild;

        const detailSection = this.popoverDivDOMReference.querySelector('div#question-detail-section');
        detailSection.insertBefore(detailSectionLoading, detailSection.firstChild);
        detailSection.removeChild(detailSection.children[1]);
    }

    startLoadBar(loadTime) {
        const NUMBER_OF_TICKS = 20;

        const timePerTick = loadTime / NUMBER_OF_TICKS;
        const percentagePerTick = 100 / NUMBER_OF_TICKS;
        let tickCount = 0;
        const tickTimeout = setInterval(() => {
            if(tickCount < NUMBER_OF_TICKS) {
                // obviously a disgusting way to do animation but for some reason I can't access
                // the style attribute on the loading bar DOM element
                tickCount++;
                this.popoverDivDOMReference.querySelector('div#qe-loading-bar-fill').classList.remove('load-' + (tickCount - 1));
                this.popoverDivDOMReference.querySelector('div#qe-loading-bar-fill').classList.add('load-' + tickCount);
            } else {
                this.fadeOutLoadBar();
                clearInterval(tickTimeout);
            }
        }, timePerTick);
    }

    fadeOutLoadBar() {
        const loadBar = this.popoverDivDOMReference.querySelector('div#qe-loading-bar-fill');
        if(loadBar) {
            loadBar.classList.add('load-20');
            loadBar.classList.add('all-done');
        }
    }

    setNumAnswers(numAnswers) {
        this.setChunkData(0, numAnswers);
    }

    setTopRatedAnswer(topRated) {
        this.setChunkData(1, topRated);
    }

    /**
     * Replace loading state of info chunk with data as provided in parameters
     * @param chunkIndex index of chunk to set (i.e. 0 = answer count, 1 = top rated answer score)
     * @param data string/number value to occupy the space
     */
    setChunkData(chunkIndex, data) {
        const infoChunkSuffix = chunkIndex === 0 ? 'answers' : 'toprated';
        const domParser = new DOMParser().parseFromString(HTMLFactory.getNumberChunkContainingValue(infoChunkSuffix, data), 'text/xml');
        const answerChunk = domParser.firstChild;

        const infoChunk = this.popoverDivDOMReference.querySelectorAll('div.info-chunk')[chunkIndex];
        infoChunk.insertBefore(answerChunk, infoChunk.firstChild);
        infoChunk.removeChild(infoChunk.children[1]);
    }

    /**
     * Redirects the browser to the related question whose "view" button was clicked.
     * This is a workaround for the view button's <a> element, who for some reason does nothing when clicked.
     */
    followQuestionLink() {
        // "this" is a reference to the "view" button (<a> element)
        window.location.href = this.attributes.href.value;
    }

}