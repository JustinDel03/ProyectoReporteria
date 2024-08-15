const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM
        users
    `;

    return db.manyOrNone(sql);
}

User.findByName = (name) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        phone,
        image,
        password,
        session_token,
        refresh_token
    FROM
        users
    WHERE
        name = $1`;

    return db.oneOrNone(sql, [name]);
};

User.updateToken = (idUser, accessToken, refreshToken = null) => {
    const sql = `
    UPDATE
        users
    SET
        session_token = $2,
        refresh_token = COALESCE($3, refresh_token)
    WHERE
        id_user = $1
    `;

    return db.none(sql, [idUser, accessToken, refreshToken]);
};

User.findById = (idUser) => {
    const sql = `
    SELECT
        *
    FROM
        users
    WHERE
        id_user = $1`;

    return db.oneOrNone(sql, idUser);
};


User.create = async (user) => {
    // Generar un salt y hash para la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const sql = `
    INSERT INTO
        users(
            id_rol,
            email,
            name,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_user
    `;

    return db.oneOrNone(sql, [
        user.id_rol,
        user.email,
        user.name,
        user.phone,
        user.image,
        hashedPassword,  // Contraseña hasheada con bcrypt
        new Date(),
        new Date()
    ]);
};


User.isPasswordMatched = async (userPassword, hash) => {
    return await bcrypt.compare(userPassword, hash);
};

module.exports = User;