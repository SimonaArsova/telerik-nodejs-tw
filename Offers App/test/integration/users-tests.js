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
                .field('password', 'password')
                .field('password-confirm', 'password')
                .field('email', 'abv@abv.bg')
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
    });

    describe('POST /auth/sign-up', () => {
        it('expect to load /auth/sign-up if user already exists', (done) => {
            request(app)
                .post('/auth/sign-up')
                .field('username', 'user')
                .field('password', 'password')
                .field('password-confirm', '123')
                .field('email', 'abv@abv.bg')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return request(app)
                        .post('/auth/sign-up')
                        .field('username', 'user')
                        .field('password', 'password')
                        .field('password-confirm', '123')
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
    });
});
