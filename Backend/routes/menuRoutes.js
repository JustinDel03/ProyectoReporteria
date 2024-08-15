const MenuController = require('../controllers/menuController');

module.exports = (app) => {
    app.get('/api/menus/:userId', MenuController.getMenusByUser);
};
