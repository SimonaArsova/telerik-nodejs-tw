class UserController {
    constructor(data) {
        this.data = data;
    }
}

const init = (data) => {
    return new UserController(data);
};

module.exports = { init };
