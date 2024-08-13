const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/api/users/getAll', UsersController.getAll);

    
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);



}