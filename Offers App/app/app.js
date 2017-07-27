const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);

    app.use(session({ cookie: { maxAge: 6000 } }));

    app.use(require('connect-flash')());
    app.use((req, res, next) =>{
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    app.use(expressValidator());

    require('./routers')
    .attachTo(app, data);


    return Promise.resolve(app);
};

module.exports = { init };
