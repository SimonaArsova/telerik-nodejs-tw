const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
    }

    getAll() {
        return this.collection.find()
            .toArray()
            .then((models) => {
                if (this.ModelClass.toViewModel) {
                    return models.map(
                        (model) => this.ModelClass.toViewModel(model)
                    );
                }

                return models;
            });
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }
        return this.collection.insert(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    removeById(model) {
        return this.collection.remove({
            _id: model._id,
        }, model);
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model._id,
        }, model);
    }


    _isModelValid(model) {
        if (typeof this.validator === 'undefined'||
            typeof this.validator.isValid !== 'function') {
                return true;
            }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
