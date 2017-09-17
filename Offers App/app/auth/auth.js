const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);

const config = require('../../config');
const hashGenerator = require('./hash-generator');

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
         data.users.findUserBy({ username: username })
            .then((foundUser) => {
                if (!foundUser) {
                    return done(null, false,
                        { message: 'User with that name does not exist. ' });
                }

                return hashGenerator.verify(password, foundUser.password)
                    .then((correctPassword) => {
                        if (correctPassword) {
                            return done(null, foundUser);
                        }
                        return done(null, false,
                            { message: 'Incorrect password.' });
                    });
            });
    }));

    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };
