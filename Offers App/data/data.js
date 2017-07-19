const OffersData = require('./offers-data');
const UsersData = require('./users-data');

const init = (db) => {
    return Promise.resolve({
        offers: new OffersData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };


