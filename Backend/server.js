const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const io = require('socket.io')(server);

//---------------- RUTAS ----------------//

const users = require('./routes/usersRoutes');



//---------------------------------------//

const port = process.env.PORT || 3000;

pp.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

//----------------- LLAMAR A LAS RUTAS --------------//
users(app, upload);


server.listen(3000, '192.168.0.103' || 'localhost', function () {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}
