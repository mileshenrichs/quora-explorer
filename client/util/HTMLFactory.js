/**
 * Pumps out HTML templates as needed
 */
class HTMLFactory {

    /**
     * @returns {string} default pre-data state of popover
     */
    static getBasePopoverMarkup() {
        return '<div class="qe-popover">' +
            '    <h2 class="question-title"></h2>' +
            '' +
            '    <div class="question-detail-section">' +
            '        <div class="question-data">' +
            '            <div class="info-chunk">' +
            '                <span class="info-chunk__number">49</span>' +
            '                <span class="info-chunk__label">answers</span>' +
            '            </div>' +
            '' +
            '            <div class="info-chunk">' +
            '                <span class="info-chunk__number">55.1k</span>' +
            '                <span class="info-chunk__label">top rated</span>' +
            '            </div>' +
            '        </div>' +
            '' +
            '        <a href="https://quora.com" class="view-question-button">view</a>' +
            '    </div>' +
            '</div>';
    }

    static getLoadingStateInfoChunk() {
        return '<span class="info-chunk__number loading">' +
            '    <img src="assets/loader.gif" alt="..."/>' +
            '</span>';
    }

}