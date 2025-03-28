const express = require('express');
const passport = require('passport');

const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/**
 * Importar rutas
 */

const usersRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by'); //disable the x-powered-By header in responses

app.set('port', port);

/**
 * Llamando a las rutas
 */
usersRoutes(app);

//direccion ip V4 de la maquina, consultar con ipconfig
server.listen(3000, '192.168.20.16' || 'localhost', function() {
    console.log('App NodeJs ' + process.pid + ' ejecutando en ' + server.address().address + ':' + server.address().port);
});

/**RUTAS */
app.get('/', (req, res) => {
    res.send('Estas en la ruta raiz del backend.');
});

app.get('/test', (req, res) => {
    res.send('Estas en la ruta TEST');
});

//Manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});