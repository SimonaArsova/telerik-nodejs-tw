const BaseData = require('./base/base-data');
const User = require('../models/user-model');
const { ObjectID } = require('mongodb');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    updateUserByUsername(model) {
        return this.collection.updateOne({
            username: model.username,
        }, model);
    }

    login(username, password) {
        return this.collection
            .findOne({ username: username, password: password });
    }

   removeOfferByOfferId(username, id) {
        return this.collection.update(
            { },
            { $pull: { offers: { _id: new ObjectID(id) } } },
            { multi: true }
        );
    }

    updateAvatar(username, avatar) {
        this.collection.update(
            { username: username },
            { $set: { picture: avatar } }
        );
    }
}

module.exports = UsersData;
