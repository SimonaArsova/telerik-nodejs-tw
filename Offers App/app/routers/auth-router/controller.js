const hashGenerator = require('../../auth/hash-generator');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res, upload) {
        upload(req, res, (err) => {
            const bodyUser = req.body;
            // console.log(req.file);

            req.assert('username',
                'Username must be between 6 and 25 symbols.').len(6, 25);
            req.assert('username',
                'First name must be between 3 and 20 symbols.').len(3, 20);
            req.assert('username',
                'Last name must be between 3 and 20 symbols.').len(3, 20);
            req.assert('password',
                'Passsword must be at least 6 symbols.').len(6);
            req.assert('passwordConfirm',
                'Passwords do not match').equals(bodyUser.password);
            req.assert('email', 'Email is not valid.').isEmail();
            // req.checkBody('file').exists(); // Not working...
            // TODO: file validation

            return req.getValidationResult()
                .then((result) => {
                    if (!result.isEmpty()) {
                        return res.status(400).render('auth/sign-up', {
                            context: bodyUser,
                            errors: result.array(),
                        });
                    }

                    return this.data.users.findByUsername(bodyUser.username)
                        .then((dbUser) => {
                            if (dbUser) {
                                const errors = [];
                                errors.push({
                                    msg: `User with that 
                                    username already exists.` });
                                return res.render('auth/sign-up', {
                                    context: bodyUser,
                                    errors: errors,
                                });
                            }

                            return hashGenerator.generateHash(bodyUser.password)
                                .then((hashedPassword) => {
                                    bodyUser.password = hashedPassword;
                                    delete bodyUser.passwordConfirm;

                                    bodyUser.picture = req.file;
                                    return this.data.users.create(bodyUser);
                                })
                                .then(() => {
                                    return res.redirect('/auth/sign-in');
                                });
                        });
                });
        });
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init };
