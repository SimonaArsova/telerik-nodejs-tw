const multer = require('multer');
const upload = multer({ dest: 'static/images/uploads' }).array('image', 3);
const uploadPicture = multer({ dest: 'static/images/uploads' })
        .single('picture');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/', (req, res) =>{
        return controller.getHome(req, res);
    });

    app.get('/offers', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/offers/form', (req, res) => {
        return controller.getForm(req, res);
    });

    app.post('/offers', (req, res) => {
        return controller.create(req, res, upload);
    });

    app.get('/offers/:id', (req, res) => {
        return controller.getOfferById(req, res);
    });

    app.post('/offers/:id', (req, res) => {
        return controller.addComment(req, res);
    });

    app.delete('/api/offers/:id', (req, res) => {
        return controller.deleteOfferById(req, res);
    });

    app.post('/search', (req, res) =>{
       return controller.searchOfferByTitle(req, res);
    });

    app.get('/api/offers', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/api/upload', (req, res) =>{
       return controller.getUpload(req, res);
    });

    app.post('/api/my-profile/edit/:username/avatar', (req, res) =>{
       return controller.updateAvatar(req, res, uploadPicture);
    });
};

module.exports = { attachTo };
