const rp = require('request-promise');
const $ = require('cheerio');
const pageParse = require('./pageParse');
const uriFactory = require('./uri.factory');

const host = 'https://www.vayacamping.net';
const country = 'espana';
const community = 'catalunya-cataluna';
const province = 'barcelona';
const pageCount = 1;


/*rp(url)
    .then(function(html) {
        //success!

        //console.log($('.camping_item_finfo > .line > .title', html));
        let lines = $('.camping_item_finfo > .line', html).length;
        for (let line = 0; line < lines; line++) {
            let lineHtml = $('.camping_item_finfo > .line', html)[line];
            let title = $('.title', lineHtml).text().trim();
            let content = $('.content', lineHtml).text().trim();
            console.log(title, content);
        }
    })
    .catch(function(err) {
        console.error(err);
    });*/

//console.log($('.camping_item_finfo > .line > .title', html));
const pageUrls = [];
for (let page = 1; page <= pageCount; page++) {
    pageUrls.push(uriFactory(host, country, community, province, page));
}
Promise.all(
    pageUrls.map((url) => pageParse(url))
).then((page) => {
    console.log('\n\n¡¡Terminado!!\n\n');
    console.log(page);
});