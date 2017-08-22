const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
};

module.exports = { attachTo };

