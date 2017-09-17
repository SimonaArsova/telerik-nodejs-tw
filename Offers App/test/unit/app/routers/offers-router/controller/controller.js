const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require(
    '../../../../../../app/routers/offers-router/controller'
);

describe('offers controller', () => {
    let data = null;
    let controller = null;
    const offers = [1, 2, 3, 4];
    const users = ['username'];

    let req = null;
    let res = null;

    const offerObj = {
        _id: 'id',
        title: 'Paris',
        image1: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/France/Paris/paris-attractions-large.jpg',
        image2: '',
        image3: '',
        description: 'sdfsd',
        rating: '1',
        user: {
            username: 'username',
        },
    };

    beforeEach(() => {
        data = {
            offers: {
                getAll() {
                    return Promise.resolve(offers);
                },
                findLastOffers() {
                    return Promise.resolve(offers);
                },
                findById(id) {
                    return Promise.resolve(offers);
                },
                getByTitle(title) {
                    return Promise.resolve(offers);
                },
                removeById(offer) {
                    return Promise.resolve(offers);
                },
                updateById(offer) {
                     return Promise.resolve(offers);
                },
            },
            users: {
                removeOfferByOfferId(username, id) {
                    return Promise.resolve(users);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expect get all to return offers', () => {
        return controller.getAll(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: offers,
                });
                expect(res.viewName).to.be.equal('offers/all');
            });
    });

    it('expect get home to return home', () => {
        return controller.getHome(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: offers,
                });
                expect(res.viewName).to.be.equal('home');
            });
    });

    it('expect get form to return form', () => {
        return controller.getForm(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('offers/form');
            });
    });

    // it('expect get get offer by id to return offer', () => {
    //     req = require('../../../../req-res').getRequestMock({
    //         user: {
    //             username: '123456',
    //             password: '123456',
    //             'passwordConfirm': '123456',
    //             email: 'ab.ab@abv.bg',
    //             offers:
    //             [{
    //                 title: 'Paris',
    //                 image1: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/France/Paris/paris-attractions-large.jpg',
    //                 image2: '',
    //                 image3: '',
    //                 description: 'sdfsd',
    //                 rating: '1',
    //             }],
    //         },
    //     });
    //     controller.getUsersOffers(req, res);
    //     return expect(res.viewName).to.be.equal('offers/users-offers');
    // });

    it('expect get users offers to return the offers of the users', () => {
        req = require('../../../../req-res').getRequestMock({
            params: {
                id: 'id',
            },
        });

        sinon.stub(data.offers, 'finById').returns(offerObj);

        return controller.getOfferById(req, res)
            .then(() => {
                sinon.assert.expose(offerObj);
            });
    });

    it('expect search offer by title to return searched offers', () => {
        req = require('../../../../req-res').getRequestMock({
            body: {
                value: 'Paris',
            },
        });

        return controller.searchOfferByTitle(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: offers,
                });
                expect(res.viewName).to.be.equal('offers/search');
            });
    });

    // it('expect add commend to add comment', () => {
    //     req = require('../../../../req-res').getRequestMock({
    //         params: {
    //             id: 'id',
    //         },
    //         body: {
    //             comment: 'comment',
    //         },
    //     });

    //     sinon.stub(data.offers, 'findById').withArgs(req.params.id).returns(offerObj);

    //     const updateSpy = sinon.spy(data.offers, 'updateById');

    //     return controller.getOfferById(req, res)
    //         .then(() => {
    //             sinon.assert.calledWith(updateSpy, offerObj);
    //         });
    // });


    // it('expect delete offer by id to delete offer', () => {
    //     req = require('../../../../req-res').getRequestMock({
    //         params: {
    //             id: 'id',
    //         },
    //         user: {
    //             username: 'username',
    //         },
    //     });

    //     sinon.stub(data.offers, 'findById').returns(offerObj);
    //     sinon.stub(data.offers, 'removeById').withArgs(offerObj);
    //     sinon.stub(data.users, 'removeOfferByOfferId').withArgs(
    //         req.user.username, req.params.id
    //     );

    //     return controller.deleteOfferById(req, res)
    //         .then(() => {
    //             expect(data.offers.removeById)
    //                 .to.have.been.called.with(offerObj);
    //             expect(data.users.removeOfferByOfferId)
    //                 .to.have.been.called.with(
    //                 req.user.username, req.params.id
    //                 );
    //         });
    // });
});
