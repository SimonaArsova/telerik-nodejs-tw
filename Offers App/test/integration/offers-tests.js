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

    describe('POST /offers', () => {
        // it('expect to redirect /offers/:id', (done) => {
        //     request(app)
        //         .post('/offers')
        //         .field('title', 'title')
        //         .field('image', 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg')
        //         .field('description', 'some description')
        //         .field('price', '123')
        //         .end((err, res) => {
        //             if (err) {
        //                 return done(err);
        //             }
        //             return request(app)
        //                 .get('/offers/:id')
        //                 .expect(200)
        //                 .end((er, re) => {
        //                     if (err) {
        //                         return done(er);
        //                     }
        //                     return done();
        //                 });
        //         });
        // });
        it('expect to return 400 if title is incorrect', (done) => {
            request(app)
                .post('/offers')
                .field('title', 't')
                .field('image', 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg')
                .field('description', 'some description')
                .field('price', '123')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect to return 400 if description is empty', (done) => {
            request(app)
                .post('/offers')
                .field('title', 'title')
                .field('image', 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg')
                .field('description', '')
                .field('price', '123')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
            it('expect to return 400 if price is empty', (done) => {
            request(app)
                .post('/offers')
                .field('title', 'title')
                .field('image', 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg')
                .field('description', 'some description')
                .field('price', '')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
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
