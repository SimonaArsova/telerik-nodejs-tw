class Offer {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.title === 'string' &&
            model.title.length > 3;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Offer();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[[prop]];
            });
        return viewModel;
    }
}

module.exports = Offer;
