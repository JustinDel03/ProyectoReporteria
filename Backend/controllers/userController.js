// Asegúrate de que las importaciones están en la parte superior del archivo
const User = require('../models/user'); // Importación del modelo User
const jwt = require('jsonwebtoken'); // Importación de JWT
const keys = require('../config/keys'); // Importación de las llaves para JWT

// Asegúrate de que todo el código que depende de las importaciones viene después de ellas
module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(200).json(data);
        } catch (error) {
            console.error(`Error al obtener los usuarios: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los usuarios',
                error: error.message
            });
        }
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El usuario no fue encontrado'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const accessToken = jwt.sign({ idUser: myUser.id_user, email: myUser.email }, keys.secretOrKey, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ idUser: myUser.id_user, email: myUser.email }, keys.secretOrKey, { expiresIn: '7d' });

                const data = {
                    idUser: myUser.id_user,
                    name: myUser.name,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${accessToken}`,
                    roles: myUser.roles
                };

                await User.updateToken(myUser.id_user, `JWT ${accessToken}`, refreshToken);

                console.log(`USUARIO ENVIADO ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    message: 'El usuario ha sido autenticado'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },

    async refreshToken(req, res, next) {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(403).json({ message: 'No se proporcionó un token' });
            }

            const decoded = jwt.verify(token, keys.secretOrKey);
            const myUser = await User.findById(decoded.id_user);

            if (!myUser) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const newAccessToken = jwt.sign({ idUser: myUser.id_user, email: myUser.email }, keys.secretOrKey, { expiresIn: '15m' });

            await User.updateToken(myUser.id_user, `JWT ${newAccessToken}`);

            return res.status(200).json({
                accessToken: newAccessToken
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(403).json({
                message: 'Token no válido',
                error: error
            });
        }
    },

    async logout(req, res, next) {
        try {
            const idUser = req.body.idUser;
            await User.updateToken(idUser, null, null);
            return res.status(200).json({
                success: true,
                message: 'La sesión del usuario se ha cerrado correctamente'
            });
        } catch (error) {
            console.error(`Error al cerrar sesión: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al momento de cerrar sesión',
                error: error.message
            });
        }
    },

    async register(req, res, next) {
        try {
            const user = req.body;
            const data = await User.create(user);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente, ahora inicia sesión',
                data: data.idUser
            });

        } catch (error) {
            console.error(`Error al registrar usuario: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error.message
            });
        }
    }
};
