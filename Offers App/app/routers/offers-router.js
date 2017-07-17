const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.render('home');
    });


    app.get('/offers', (req, res) => {
        return data.offers.getAll()
            .then((offers) => {
                return res.render('offers/all', {
                    context: offers,
                });
            });
    });

    app.get('/offers/form', (req, res) => {
        return res.render('offers/form');
    });

    app.post('/offers', (req, res) => {
        const offer = req.body;

        // validation

        return data.offers.create(offer)
            .then((dbOffer) => {
                return res.redirect('/offers/' + dbOffer.id);
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('offers/form');
            });
    });
};

module.exports = { attachTo };
