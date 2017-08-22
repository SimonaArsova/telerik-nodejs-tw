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

    getUsersOffers(req, res) {
        return res.render('offers/users-offers', {
            context: req.user.offers || [],
        });
    }

    getUserProfile(req, res) {
        return res.render('user/profile', {
            context: req.user || [],
        });
    }

    getEditUserProfile(req, res) {
        return res.render('user/edit', {
            context: req.user || [],
        });
    }

    editUserProfile(req, res) {
        const username = req.params.username;
        const user = req.body;

        return this.data.users.findByUsername(username)
            .then((u)=>{
                u.picture = user.picture;
                return this.data.users.updateUserByUsername(u);
            })
            .then(()=>{
                return res.redirect('/my-profile');
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

    create(req, res) {
        const offer = req.body;
        const user = req.user;

        req.assert('title',
            'Title must be between 2 and 15 symbols.').len(2, 15);
        req.assert('image1',
            'Image link is required.').notEmpty();
        req.assert('description',
            'Description is required.').notEmpty();
        req.assert('rating',
            'Rating must be a number between 1 and 5.').notEmpty().isInt();

        return req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    return res.status(400).render('offers/form', {
                        context: offer,
                        errors: result.array(),
                    });
                }

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
                            image1: dbOffer.image1,
                            image2: dbOffer.image2,
                            image3: dbOffer.image3,
                            description: dbOffer.description,
                            rating: dbOffer.rating,
                        });

                        return Promise.all([
                            this.data.offers.updateById(dbOffer),
                            this.data.users.updateById(user),
                        ])
                            .then(() => {
                                return res.redirect('/offers/' + dbOffer._id);
                            });
                    })

                    .catch((err) => {
                        req.flash('error', err);
                        return res.redirect('/offers/form');
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
}

const init = (data) => {
    return new OffersController(data);
};

module.exports = { init };
