const Menu = require('../models/menu');

module.exports = {
    async getMenusByUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const menus = await Menu.getMenusByUser(userId);
            return res.status(200).json(menus);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los menús',
                error: error
            });
        }
    }
};
