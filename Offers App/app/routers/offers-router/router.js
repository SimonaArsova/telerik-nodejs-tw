const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const errorsController = require('../../errors-controller')();

    app.get('/offers', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/offers/form', (req, res) => {
        return controller.getForm(req, res);
    });

    app.get('/offers/my-offers', (req, res) => {
        return controller.getUsersOffers(req, res);
    });

    app.post('/offers', (req, res) => {
        return controller.create(req, res);
    });

    app.get('/offers/:id', (req, res) => {
        return controller.getOfferById(req, res);
    });

    app.delete('/offers/:id', (req, res) => {
        return controller.deleteOfferById(req, res);
    });

    app.post('/offers/search', (req, res) =>{
       return controller.searchOfferByTitle(req, res);
    });

    app.get('/error', errorsController.show);
};

module.exports = { attachTo };
