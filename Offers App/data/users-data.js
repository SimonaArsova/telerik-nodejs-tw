const BaseData = require('./base/base-data');
const User = require('../models/user-model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    findByUserName(username) {
        return this.filterBy({
            username: new RegExp(username, 'i'),
        });
    }

    checkPassword(username, password) {
        return this.findByUserName(username)
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
}

module.exports = UsersData;
