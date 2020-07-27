const rp = require('request-promise');
const $ = require('cheerio');

const campingParse = function(url) {
    return rp(url)
        .then(function(html) {
            console.log('Parsing camping ' + url);
            let lines = $('.camping_item_finfo > .line', html).length;
            const info = [];
            for (let line = 0; line < lines; line++) {
                let lineHtml = $('.camping_item_finfo > .line', html)[line];
                let title = $('.title', lineHtml).text().replace('  ', '').trim();
                let content = $('.content', lineHtml).text().replace('  ', '').trim();
                info.push({ title: title, content: content });
            }
            return info;
        })
        .catch(function(err) {
            console.error(err);
        });
};
module.exports = campingParse;