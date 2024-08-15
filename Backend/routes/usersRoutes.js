const UserController = require('../controllers/userController');

module.exports = (app) => {

    app.get('/api/users/getAll', UserController.getAll);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.post('/api/users/refreshToken', UserController.refreshToken);

    
};