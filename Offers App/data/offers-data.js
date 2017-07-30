const BaseData = require('./base/base-data');
const Offer = require('../models/offer-model');

class OffersData extends BaseData {
    constructor(db) {
        super(db, Offer, Offer);
    }

    findLastOffers() {
        return this.collection
            .find()
            .sort({ $natural: -1 })
            .limit(3)
            .toArray();
    }
}

module.exports = OffersData;
