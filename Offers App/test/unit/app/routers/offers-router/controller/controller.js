const { expect } = require('chai');

const { init } = require(
    '../../../../../../app/routers/offers-router/controller'
);

describe('offers controller', () => {
    let data = null;
    let controller = null;
    const offers = [1, 2, 3, 4];

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            offers: {
                getAll() {
                    return Promise.resolve(offers);
                },
                findLastOffers() {
                    return Promise.resolve(offers);
                },
            },
            users: {

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


    describe('offers controller', () => {
        it('expect get users offers to return the offers of the users', () => {

            return controller.getUsersOffers(req, res)
                .then(() => {
                    req.user = {
                        username: 'test',
                    };
                    expect(res.context).to.be.deep.equal({
                        context: req.user.offers,
                    });
                    expect(res.viewName).to.be.equal('offers/users-offers');
                });
        });
    });
});
