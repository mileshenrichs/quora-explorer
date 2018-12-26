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
            '                <span class="info-chunk__number">0</span>' +
            '                <span class="info-chunk__label">answers</span>' +
            '            </div>' +
            '' +
            '            <div class="info-chunk">' +
            '                <span class="info-chunk__number">0</span>' +
            '                <span class="info-chunk__label">top rated</span>' +
            '            </div>' +
            '        </div>' +
            '' +
            '        <a href="https://quora.com" class="view-question-button">view</a>' +
            '    </div>' +
            '' +
            '    <div class="qe-loading-bar-wrapper">' +
            '        <div class="qe-loading-bar-fill load-0"></div>' +
            '    </div>' +
            '</div>';
    }

    /**
     * @returns {string} markup for pre-data info chunks
     */
    static getDetailSectionLoadingState() {
        return '<div class="question-data">' +
            '    <div class="info-chunk">' +
            '        <div class="info-chunk-loading answers-loading">' +
            '            <div></div>' +
            '        </div>' +
            '        <span class="info-chunk__label">answers</span>' +
            '    </div>' +
            '' +
            '    <div class="info-chunk">' +
            '        <div class="info-chunk-loading toprated-loading">' +
            '            <div></div>' +
            '        </div>' +
            '        <span class="info-chunk__label">top rated</span>' +
            '    </div>' +
            '</div>';
    }

    /**
     * @param val data to occupy an info chunk
     * @returns {string} a number chunk containing the given value
     */
    static getNumberChunkContainingValue(val) {
        return '<span class="info-chunk__number">' + val + '</span>';
    }

}