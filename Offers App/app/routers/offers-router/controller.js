class OffersController {
    constructor(data) {
        this.data = data;
    }

    getHome(req, res) {
        return this.data.offers.findLastOffers()
            .then((offers) => {
                return res.render('home', {
                    context: offers || [],
                });
            });
    }

    getAll(req, res) {
        return this.data.offers.getAll()
            .then((offers) => {
                return res.render('offers/all', {
                    context: offers || [],
                });
            });
    }
    getForm(req, res) {
        return Promise.resolve()
            .then(() => {
                return res.render('offers/form');
            });
    }

    getOfferById(req, res) {
        const id = req.params.id;
        return this.data.offers.findById(id)
            .then((offer) => {
                return res.render('offers/description',
                    {
                        context: offer || [],
                        user: req.user,
                    });
            });
    }

    deleteOfferById(req, res) {
        const id = req.params.id;
        return this.data.offers.findById(id)
            .then((offer) => {
                return Promise
                    .all([
                        this.data.users.removeOfferByOfferId(
                            req.user.username, id
                        ),
                        this.data.offers.removeById(offer),
                    ]);
            });
    }

    create(req, res, upload) {
        upload(req, res, (err) => {
            const offer = req.body;
            const user = req.user;

            req.assert('title',
                'Title must be between 2 and 15 symbols.').len(2, 15);
            // req.assert('image1',
            //     'Image link is required.').notEmpty();
            req.assert('description',
                'Description is required.').notEmpty();
            req.assert('price',
                'Price is required.').notEmpty();

            return req.getValidationResult()
                .then((result) => {
                    if (!result.isEmpty()) {
                        return res.status(400).render('offers/form', {
                            context: offer,
                            errors: result.array(),
                        });
                    }

                    offer.images = req.files;

                    offer.user = {
                        id: user._id,
                        username: user.username,
                    };

                    return Promise
                        .all([
                            this.data.offers.create(offer),
                        ])
                        .then(([dbOffer]) => {
                            user.offers = user.offers || [];
                            user.offers.push({
                                _id: dbOffer._id,
                                title: dbOffer.title,
                                images: dbOffer.images,
                                description: dbOffer.description,
                                price: dbOffer.price,
                            });

                            return Promise.all([
                                this.data.offers.updateById(dbOffer),
                                this.data.users.updateById(user),
                            ])
                                .then(() => {
                                    return res.redirect('/offers/' + dbOffer._id);
                                });
                        })

                        .catch((er) => {
                            req.flash('error', er);
                            return res.redirect('/offers/form');
                        });
                });
        });
    }

    searchOfferByTitle(req, res) {
        const title = req.body.value;
        return this.data.offers.getByTitle(title)
            .then((offers) => {
                return res.render('offers/search', {
                    context: offers || [],
                });
            });
    }

    addComment(req, res) {
        const id = req.params.id;
        const comment = {
            comment: req.body.comment,
            user: req.user.username,
            picture: req.user.picture,
        };

        return this.data.offers.findById(id)
            .then((offer) => {
                offer.comments = offer.comments || [];
                offer.comments.push(comment);
                return this.data.offers.updateById(offer)
                    .then(() => {
                        return res.redirect('/offers/' + id);
                    });
            });
    }
        
    updateAvatar(req, res, uploadPicture) {
        uploadPicture(req, res, (err) => {
            const username = req.params.username;

            // if (!req.user || req.user.username !== username) {
            //     return res.redirect('/error');
            // }

            const picture = req.file;

            return this.data.users.findByUsername(username)
                .then((user) => {
                    this.data.users.updateAvatar(
                        req.user.username, picture
                    );

                    return res.redirect('/user/my-profile');
                });
        });
    }
}

const init = (data) => {
    return new OffersController(data);
};

module.exports = { init };
