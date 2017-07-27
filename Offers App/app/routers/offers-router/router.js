const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

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

     app.get('/search', (req, res) =>{
        return res.render('offers/search');
     });

    app.get('/offers/search?title', (req, res) =>{
       return controller.searchOfferByTitle(req, res);
    });
};

module.exports = { attachTo };
