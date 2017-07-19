const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/offers', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/offers/form', (req, res) => {
        return res.render('offers/form');
    });

    app.post('/offers', (req, res) => {
        const offer = req.body;

        // validation

        return data.offers.create(offer)
            .then((dbOffer) => {
                return res.redirect('/offers' + dbOffer.id);
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/offers/form');
            });
    });
};

module.exports = { attachTo };
