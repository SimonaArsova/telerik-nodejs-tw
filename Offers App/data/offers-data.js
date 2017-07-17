const BaseData = require('./base/base-data');
const Offer = require('../models/offer-model');

class OffersData extends BaseData {
    constructor(db) {
        super(db, Offer, Offer);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = OffersData;
