const path = require('path');

const uriFactory = (host, country, community, province, page) => {
    return host + '/' + country + '/' + community + '/' + province + '?page=' + page;
}
module.exports = uriFactory;