const fs = require('fs');
const path = require('path');

module.exports = {
    privateKey: fs.readFileSync(path.resolve(__dirname, 'private.pem'), 'utf8'),
    publicKey: fs.readFileSync(path.resolve(__dirname, 'public.pem'), 'utf8')
};