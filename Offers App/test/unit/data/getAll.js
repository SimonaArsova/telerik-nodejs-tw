const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base-data');

describe('BaseData', () => {
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

    describe('Get all when there are offers in db', () => {
        beforeEach(() => {
            offers =[1, 2, 3, 4];

            const find = () => {
                return {
                    toArray,
                };
            };

            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });
        });

        describe('with default toViewModel', () => {
            beforeEach(() => {
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

    describe('Filter by', () => {
        beforeEach(() => {
            offers = [1, 2, 3, 4];
            const find = (props) => {
                return {
                    toArray,
                };
            };

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

        it('expect to filter offers', () => {
            return data.filterBy('$gt: 3')
                .then((found) => {
                    expect(found).to.include(4);
                });
        });
    });
});
