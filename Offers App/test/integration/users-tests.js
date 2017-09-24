const request = require('supertest');

describe('/users tests', () => {
    const connectionString = 'mongodb://localhost/offers-db-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /auth/sign-up', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/auth/sign-up')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /auth/sign-in', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/auth/sign-in')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('POST /auth/sign-out', () => {
        it('expect to redirect /', (done) => {
            request(app)
                .post('/auth/sign-out')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return request(app)
                        .get('/')
                        .expect(200)
                        .end((er, re) => {
                            if (err) {
                                return done(er);
                            }
                            return done();
                        });
                });
        });
    });

    describe('POST /auth/sign-up', () => {
        it('expect to redirect /auth/sign-in if result is correct', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'password')
                .field('passwordConfirm', 'password')
                .field('email', 'abv@abv.bg')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return request(app)
                        .get('/auth/sign-in')
                        .expect(200)
                        .end((er, re) => {
                            if (err) {
                                return done(er);
                            }
                            return done();
                        });
                });
        });

        it('expect to load /auth/sign-up if user already exists', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'password')
                .field('passwordConfirm', '123')
                .field('email', 'abv@abv.bg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return request(app)
                        .post('/auth/sign-up')
                        .field('username', 'username')
                        .field('password', 'password')
                        .field('passwordConfirm', '123')
                        .field('email', 'abv@abv.bg')
                        .end((e, r) => {
                            if (e) {
                                return done(e);
                            }
                            return request(app)
                                .get('/auth/sign-up')
                                .expect(200)
                                .end((er, re) => {
                                    if (er) {
                                        return done(er);
                                    }
                                    return done();
                                });
                        });
                });
        });

        it('expect to load / when user sign-in', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'password')
                .field('passwordConfirm', 'password')
                .field('email', 'abv@abv.bg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return request(app)
                        .post('/auth/sign-in')
                        .field('username', 'username')
                        .field('password', 'password')
                        .end((e, r) => {
                            if (e) {
                                return done(e);
                            }
                            return request(app)
                                .get('/')
                                .expect(200)
                                .end((er, re) => {
                                    if (er) {
                                        return done(er);
                                    }
                                    return done();
                                });
                        });
                });
        });


        it('expect to return 400 if  username is incorrect', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', '')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'password')
                .field('passwordConfirm', 'password')
                .field('email', 'abv@abv.bg')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('expect to return 400 if passord is incorrect', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'pas')
                .field('passwordConfirm', 'pas')
                .field('email', 'abv@abv.bg')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('expect to return 400 if passords are different', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'pasword')
                .field('passwordConfirm', 'pass123')
                .field('email', 'abv@abv.bg')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('expect to return 400 if email is not valid', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', 'lastname')
                .field('password', 'pasword')
                .field('passwordConfirm', 'password')
                .field('email', 'abv')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect to return 400 if firstname is empty', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', '')
                .field('lastname', 'lastname')
                .field('password', 'pasword')
                .field('passwordConfirm', 'password')
                .field('email', 'abv')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect to return 400 if lastname is empty', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'username')
                .field('firstname', 'firstname')
                .field('lastname', '')
                .field('password', 'pasword')
                .field('passwordConfirm', 'password')
                .field('email', 'abv')
                .field('picture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvw9YL-DivF60XP4FOOQMEFA8r1ABCcgR_ZOk7TbUds-LK6dni9Oqfg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
