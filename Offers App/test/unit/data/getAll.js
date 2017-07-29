const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base-data');

describe('BaseData.getAll()', () => {
    const db = {
        collection: () => { },
    };
    let offers = [];

    let ModelClass = null;
    const validator = null;
    let data = null;

    const toArray = () => {
        return Promise.resolve(offers);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    describe('when there are offers in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                offers = [1, 2, 3, 4];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { find };
                    });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return offers', () => {
                return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(offers);
                    });
            });
        });

        describe('with custom toViewModel', () => {
            beforeEach(() => {
                offers = [1, 2, 3, 4];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { find };
                    });
                ModelClass.toViewModel = (model) => {
                    return model + '1';
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return offers', () => {
                return data.getAll()
                    .then((models) => {
                        offers.forEach((offer) => {
                            const viewModel = offer + '1';
                            expect(models).to.contain(viewModel);
                        });
                    });
            });
        });
    });
});
