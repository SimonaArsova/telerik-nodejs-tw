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
    };

    return controller;
};

module.exports = { init };
