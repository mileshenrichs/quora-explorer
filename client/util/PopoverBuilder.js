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
    }

    initNewPopover() {
        const domParser = new DOMParser().parseFromString(HTMLFactory.getBasePopoverMarkup(), 'text/xml');
        const popoverContent = domParser.firstChild;
        this.liDOMReference.appendChild(popoverContent);
    }

}