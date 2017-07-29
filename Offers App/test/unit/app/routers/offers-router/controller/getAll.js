const { expect } = require('chai');

const { init } = require(
    '../../../../../../app/routers/offers-router/controller'
);

describe('items controller', () => {
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
});
