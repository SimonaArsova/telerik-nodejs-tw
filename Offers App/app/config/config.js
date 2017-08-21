/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const session = require('express-session');
const expressValidator = require('express-validator');

const applyTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../node_modules');
    app.use('/libs', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../../static');
    app.use('/static', express.static(staticsPath));

    app.use(cookieParser('keyboard cat'));

    // app.use(session({ cookie: { maxAge: 6000 } }));

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    app.use(expressValidator());
};

module.exports = { applyTo };
