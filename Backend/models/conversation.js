const db = require('../config/config');

const Conversation = {};

Conversation.getAll = () => {
    const sql = `
        SELECT
            *
        FROM
            tbv_get_conversations
    `;

    return db.manyOrNone(sql);
}

module.exports = Conversation;