class UserController {
    constructor(data) {
        this.data = data;
    }

    getUsersOffers(req, res) {
        return res.render('offers/users-offers', {
            context: req.user.offers || [],
        });
    }

    getMyUserProfile(req, res) {
        return res.render('user/my-profile', {
            context: req.user || [],
        });
    }

    getOtherUserProfile(req, res) {
        const username = req.params.username;

        return this.data.users.findByUsername(username)
            .then((user) => {
                return res.render('user/profile-other', {
                    context: user || [],
                });
            });
    }

    editMyUserProfile(req, res) {
        const userData = req.body;
        const user = req.user;

        user.firstname = userData.firstname;
        user.lastname = userData.lastname;
        user.email = userData.email;

        return this.data.users.updateUserByUsername(user)
            .then(() => {
                return res.redirect('/user/my-profile');
            });
    }

    sendMessage(req, res) {
        const username = req.params.username;
        const author = req.user;
        const sentMessage = req.body.message;
        const d = new Date();

        const message = {
            author: author.username,
            authorPicture: author.picture,
            text: sentMessage,
            receiver: username,
            date: d.toLocaleString(),
        };

        return this.data.users.findByUsername(username)
            .then((user) => {
                user.messages = user.messages || [];
                user.messages.push(message);
                user.hasUnreadMessages = true;

                return this.data.users.updateUserByUsername(user)
                    .then(() => {
                        author.messages = author.messages || [];
                        author.messages.push(message);
                        return this.data.users.updateUserByUsername(author);
                    });
            });
    }

    getUserMessages(req, res) {
        const user = req.user;
        user.hasUnreadMessages = false;

        return this.data.users.updateUserByUsername(user)
            .then(() => {
                return res.render('user/messages', {
                    context: user || [],
                });
            });
    }
}

const init = (data) => {
    return new UserController(data);
};

module.exports = { init };
