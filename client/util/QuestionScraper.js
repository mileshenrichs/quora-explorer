// todo: delete this class and remove import from manifest if able to solve scraping on backend
class QuestionScraper {

    static scrapeQuestion(qUrl) {
        return new Promise((resolve, reject) => {
            const scrapeResult = {};
            fetch(qUrl).then(res => res.text())
                .then(pageHtml => {
                    // parse HTML response
                    const html = document.createElement('html');
                    html.innerHTML = pageHtml;

                    // get answer count
                    const answerCountString = html.querySelector('div.answer_count').innerText;
                    scrapeResult.ansCount = this.getAnswerCount(answerCountString);

                    // find top voted answer
                    const pageItems = html.querySelectorAll('div.pagedlist_item');
                    console.log(pageItems);

                    resolve({
                       ansCount: scrapeResult.ansCount,
                       topScore: 100
                    });
                }).catch(err => {
                    reject(err);
                });
        });
    }

    static getAnswerCount(ansCountStr) {
        let number = '';
        let i = 0;
        while(ansCountStr.charAt(i) !== ' ') {
            number += ansCountStr.charAt(i);
            i++;
        }

        return parseInt(number, 10);
    }

}