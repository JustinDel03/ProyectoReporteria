const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

// Rutas
const usersRoutes = require('./routes/usersRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Configuración de Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));

// Desactivar la cabecera X-Powered-By por motivos de seguridad
app.disable('x-powered-by');

// Configuración de las rutas
usersRoutes(app);  // Cargar las rutas de usuarios
menuRoutes(app);   // Cargar las rutas de menús

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        success: false,
        message: err.message,
        error: err.stack
    });
});

// Inicializar el servidor en el puerto especificado
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', function () {
    console.log(`Aplicación de Node.js iniciada en el puerto ${port}...`);
});

module.exports = { app, server };
