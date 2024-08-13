const db = require('../config/config');
const crypto = require('crypto');
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


User.findByEmail = (email) => {
    const sql = `
    SELECT
        U.id_usuario,
        U.email,
        U.name,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id_rol', R.id_rol,
                'name', R.name,
                'image', R.image,
            )
        ) AS roles
    FROM 
        usuarios AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, email);
}


User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}

User.updateToken = (idUsuario, token) => {
    const sql = `
    UPDATE
        usuarios
    SET
        session_token = $2
    WHERE
        id_usuario = $1
    `;

    return db.none(sql, [
        idUsuario,
        token
    ]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;