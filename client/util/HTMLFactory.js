/**
 * Pumps out HTML templates as needed
 */
class HTMLFactory {

    /**
     * @returns {string} default pre-data state of popover
     */
    static getBasePopoverMarkup() {
        return '<div id="qe-popover">' +
            '    <h2 id="question-title"></h2>' +
            '' +
            '    <div id="question-detail-section">' +
            '        <div id="question-data">' +
            '            <div id="info-chunk-answers" class="info-chunk">' +
            '                <span id="info-chunk-answers__number">0</span>' +
            '                <span id="info-chunk-answers__label">answers</span>' +
            '            </div>' +
            '' +
            '            <div id="info-chunk-toprated" class="info-chunk">' +
            '                <span id="info-chunk-toprated__number">0</span>' +
            '                <span id="info-chunk-toprated__label">top rated</span>' +
            '            </div>' +
            '        </div>' +
            '' +
            '        <a href="https://quora.com" id="view-question-button">view</a>' +
            '    </div>' +
            '' +
            '    <div id="qe-loading-bar-wrapper">' +
            '        <div id="qe-loading-bar-fill" class="load-0"></div>' +
            '    </div>' +
            '</div>';
    }

    /**
     * @returns {string} markup for pre-data info chunks
     */
    static getDetailSectionLoadingState() {
        return '<div id="question-data">' +
            '    <div id="info-chunk-answers" class="info-chunk">' +
            '        <div id="info-chunk-loading-answers">' +
            '            <div></div>' +
            '        </div>' +
            '        <span id="info-chunk-answers__label">answers</span>' +
            '    </div>' +
            '' +
            '    <div id="info-chunk-toprated" class="info-chunk">' +
            '        <div id="info-chunk-loading-toprated">' +
            '            <div></div>' +
            '        </div>' +
            '        <span id="info-chunk-toprated__label">top rated</span>' +
            '    </div>' +
            '</div>';
    }

    /**
     * @param infoChunkSuffix either 'answer' or 'toprated', indicates which info chunk is needed
     * @param val data to occupy an info chunk
     * @returns {string} a number chunk containing the given value
     */
    static getNumberChunkContainingValue(infoChunkSuffix, val) {
        return '<span id="info-chunk-' + infoChunkSuffix + '__number">' + val + '</span>';
    }

}