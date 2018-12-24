/**
 * Pumps out HTML templates as needed
 */
class HTMLFactory {

    /**
     * @returns {string} default pre-data state of popover
     */
    static getNoDataPopoverMarkup() {
        return '<div class="qe-popover">' +
            '    <h2 class="question-title">What don\'t people tell you about working at a top tech company?</h2>' +
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
            '        <a href="#" class="view-question-button">view</a>' +
            '    </div>' +
            '</div>';
    }
    
}