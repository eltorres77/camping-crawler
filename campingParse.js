const rp = require('request-promise');
const $ = require('cheerio');

const parseLine = function(string) {
    return string.split('  ').join('').split('\n').join('').trim();
}

const parseField = function(title, infoArray) {
    const entry = infoArray.filter(entry => entry.title == title);
    return entry.length > 0 ? entry[0].content : null;
}

const campingParse = function(url, host, country, community, province) {
    console.log('Request to camping ' + url);
    return rp(url)
        .then(function(html) {

            console.log('Parsing camping ' + url);


            camping = {
                url: url,
                country: country,
                community: community,
                province: province
            };

            camping.name = $('.camping_title > h1', html).text();
            camping.zone = $('.short_bar > .location', html).text();

            let lines = $('.camping_item_finfo > .line', html).length;
            const mainInfo = [];
            for (let line = 0; line < lines; line++) {
                let lineHtml = $('.camping_item_finfo > .line', html)[line];
                let title = parseLine($('.title', lineHtml).text());
                let content = parseLine($('.content', lineHtml).text());
                mainInfo.push({ title: title, content: content });
            }
            camping.mail = parseField('E-mail', mainInfo);
            camping.mail = camping.mail && camping.mail.includes('Pedir información') ? null : camping.mail;
            camping.phone = parseField('Teléfono', mainInfo);
            camping.web = parseField('Página web', mainInfo);
            return camping;
        })
        .catch(function(err) {
            console.error('Error parsing ' + url, err);
        });
};
module.exports = campingParse;