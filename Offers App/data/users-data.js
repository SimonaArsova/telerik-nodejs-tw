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

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }

   removeOfferByOfferId(username, id) {
        return this.collection.update(
            { },
            { $pull: { offers: { _id: new ObjectID(id) } } },
            { multi: true }
        );
    }
}

module.exports = UsersData;
