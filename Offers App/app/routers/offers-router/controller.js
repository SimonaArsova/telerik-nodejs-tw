const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.offers.getAll()
                .then((offers) => {
                    return res.render('offers/all', {
                        context: offers,
                    });
                });
        },
        getOfferById(req, res) {
            const id = req.params.id;
            return data.offers.findById(id)
                .then((offer) => {
                    return res.render('offers/description',
                        {
                            context: offer,
                        });
                });
        },
    };

    return controller;
};

module.exports = { init };
