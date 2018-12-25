/**
 * Scrapes a Quora question page.
 * Only used to get answer count.
 */
class QuestionScraper {

    static getAnswerCount(qUrl) {
        return new Promise((resolve, reject) => {
            fetch(qUrl).then(res => res.text())
                .then(pageHtml => {
                    // parse HTML response
                    const html = document.createElement('html');
                    html.innerHTML = pageHtml;

                    // get answer count
                    let count = '0';
                    const answerCountDiv = html.querySelector('div.answer_count');
                    if(answerCountDiv) {
                        const ansCountStr = answerCountDiv.innerText;
                        count = ansCountStr.substring(0, ansCountStr.indexOf(' '));
                    }

                    resolve(count);
                }).catch(err => {
                    reject(err);
                });
        });
    }

}