const db = require('../config/config');

const Menu = {};

Menu.getMenusByUser = (userId) => {
    const sql = `
        SELECT * FROM get_user_menus($1)
    `;
    return db.manyOrNone(sql, userId);
};

module.exports = Menu;
