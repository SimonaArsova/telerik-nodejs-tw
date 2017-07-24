const BaseData = require('./base/base-data');
const Offer = require('../models/offer-model');

class OffersData extends BaseData {
    constructor(db) {
        super(db, Offer, Offer);
    }
}

module.exports = OffersData;
