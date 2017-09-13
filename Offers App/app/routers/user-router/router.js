const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/user/my-offers', (req, res) => {
        return controller.getUsersOffers(req, res);
    });

    app.get('/user/my-profile', (req, res) => {
        return controller.getMyUserProfile(req, res);
    });

    app.get('/user/messages', (req, res) => {
        return controller.getUserMessages(req, res);
    });

    app.get('/user/:username', (req, res) => {
        return controller.getOtherUserProfile(req, res);
    });

    app.post('/user/:username/messages', (req, res) => {
        return controller.sendMessage(req, res);
    });
};

module.exports = { attachTo };

