function validateSignUpForm() {
    let errors = [];

    const username = document.forms["signUp"]["username"].value;

    if (username.length < 6 || username.length > 25) {
        errors.push('Username must be between 6 and 25 symbols.');
    }

    const firstName = document.forms["signUp"]["firstname"].value;
    
    if (firstName.length < 3 || firstName.length > 20) {
        errors.push('First name must be between 3 and 20 symbols.');
    }
        
    const lastName = document.forms["signUp"]["lastname"].value;
    
    if (lastName.length < 3 || lastName.length > 20) {
        errors.push('Last name must be between 3 and 20 symbols.');
    }

    const password = document.forms["signUp"]["password"].value;

    if (password.length < 6) {
        errors.push('Passsword must be at least 6 symbols.');
    }

    const passwordConfirm = document.forms["signUp"]["passwordConfirm"].value;

    if (passwordConfirm !== password) {
        errors.push('Passwords do not match.');
    }

    const email = document.forms["signUp"]["email"].value;

    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        errors.push('Email is not valid.');
    }

    const picture = document.forms["signUp"]["picture"].value;

    if (picture == '') {
        errors.push('Profile picture is required.');
    }

    if (errors.length > 0) {
        $('#validation-errors').empty();
        for (let i = 0; i < errors.length; i++) {
            $('<p></p>').appendTo('#validation-errors').text(errors[i]);
        }

        $('#validation-errors').addClass('alert alert-danger');
        return false;
    } else {
        return true;
    }
};

function validateSignInForm() {
    let errors = [];

    const username = document.forms["signIn"]["username"].value;

    if (username.length < 6 || username.length > 25) {
        errors.push('Invalid username.');
    }

    const password = document.forms["signIn"]["password"].value;

    if (password.length < 6) {
        errors.push('invalid password.');
    }

    if (errors.length > 0) {
        $('#validation-errors').empty();
        for (let i = 0; i < errors.length; i++) {
            $('<p></p>').appendTo('#validation-errors').text(errors[i]);
        }

        $('#validation-errors').addClass('alert alert-danger');
        return false;
    } else {
        return true;
    }
};

function validateUserUpdate() {
    let errors = [];

    const firstName = document.forms["userDetails"]["firstname"].value;
    
    if (firstName.length < 3 || firstName.length > 20) {
        errors.push('First name must be between 3 and 20 symbols.');
    }
        
    const lastName = document.forms["userDetails"]["lastname"].value;
    
    if (lastName.length < 3 || lastName.length > 20) {
        errors.push('Last name must be between 3 and 20 symbols.');
    }

    const email = document.forms["userDetails"]["email"].value;

    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        errors.push('Email is not valid.');
    }

    if (errors.length > 0) {
        $('#validation-errors').empty();
        for (let i = 0; i < errors.length; i++) {
            $('<p></p>').appendTo('#validation-errors').text(errors[i]);
        }

        $('#validation-errors').addClass('alert alert-danger');
        return false;
    } else {
        return true;
    }
};

function validateOffersForm() {
    let errors = [];

    const title = document.forms["createOffer"]["title"].value;

    if (title.length < 2 || title.length > 15) {
        errors.push('Title must be between 2 and 15 symbols.');
    }

    const imageCount = parseInt($("input[type='file']").get(0).files.length);

    if (imageCount < 1 || imageCount > 3) {
        errors.push('You should upload between one and three images.');
    }

    const description = document.forms["createOffer"]["description"].value;

    if (description === '') {
        errors.push('Description is required.');
    }

    const price = document.forms["createOffer"]["price"].value;

    if (price === '') {
        errors.push('Price is required.');
    }

    if (errors.length > 0) {
        $('#validation-errors').empty();
        for (let i = 0; i < errors.length; i++) {
            $('<p></p>').appendTo('#validation-errors').text(errors[i]);
        }

        $('#validation-errors').addClass('alert alert-danger');
        return false;
    } else {
        return true;
    }
};
