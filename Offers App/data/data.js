const OffersData = require('./offers-data');

const init = (db) => {
    return Promise.resolve({
        offers: new OffersData(db),
    });
};

module.exports = { init };


