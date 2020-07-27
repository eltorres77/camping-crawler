const rp = require('request-promise');
const $ = require('cheerio');
const campingParse = require('./campingParse');


const pageParse = function(url) {
    console.log('Request to page ' + url);
    return rp(url)
        .then(function(html) {
            console.log('Parsing page ' + url);
            //console.log($('.camping_item_finfo > .line > .title', html));
            const itemPath = 'a.more_info';
            let campings = $(itemPath, html).length;
            console.log($(itemPath, html).length);
            const campingUrls = [];
            for (let camping = 0; camping < campings; camping++) {
                campingUrls.push($(itemPath, html)[camping].attribs.href);
            }
            return Promise.all(
                campingUrls.map(function(url) {
                    return campingParse('https://www.vayacamping.net' + url);
                })
            );
        })
        .then(function(pages) {
            console.log(pages);
        })
        .catch(function(err) {
            console.error(err);
        });
};
module.exports = pageParse;