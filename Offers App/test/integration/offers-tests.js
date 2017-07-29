const request = require('supertest');

describe('/offers tests', () => {
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

    describe('GET /', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /offers', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/offers')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /offers/form', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/offers/form')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('POST /offers/form', () => {
        it('expect to redirect /offers/:id', (done) => {
            request(app)
                .post('/offers/form')
                .field('title', 'title')
                .field('image1', 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg')
                .field('description', 'some description')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                return request(app)
                        .get('/offers/:id')
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

    describe('POST /offers/:id', () => {
        it('expect to return 200', (done) => {
            request(app)
                .post('/offers/:id')
                .field('comment', 'comment')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                return request(app)
                        .get('/offers/:id')
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
});
