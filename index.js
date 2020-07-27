const rp = require('request-promise');
const $ = require('cheerio');
const pageParse = require('./pageParse');
const uriFactory = require('./uri.factory');
const stringify = require('csv-stringify');
const generate = require('csv-generate');
var fs = require('fs');

const campingParse = require('./campingParse');

const campingsPerPage = 15;

const host = 'https://www.vayacamping.net';
const country = 'espana';
const community = 'comunidad-valenciana';
const province = 'alicante';

const campingCount = 43;
const pageCount = Math.floor(campingCount / campingsPerPage) + 1;

/*campingParse('https://www.vayacamping.net/camping/el-carlitos')
    .then(
        camping => console.log(camping)
    ).catch(
        err => console.error(err)
    );*/


const pageUrls = [];
for (let page = 1; page <= pageCount; page++) {
    pageUrls.push(uriFactory(host, country, community, province, page));
}
Promise.all(
    pageUrls.map((url) => pageParse(url, host, country, community, province))
).then((data) => {
    flattenData = [].concat.apply([], data);
    console.log('Rendering data to CSV');
    console.log(flattenData);

    stringify(flattenData, function(err, output) {
        fs.writeFile('campings.csv', output, 'utf8', function(err) {
            if (err) {
                console.log('Error generating csv', err);
            } else {
                console.log('CSV generated!');
            }
        });
    });

});