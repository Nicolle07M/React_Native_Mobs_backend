const express = require('express');
const session = require('express-session'); // En la configuración de express-session, el campo secret se utiliza para firmar la cookie de sesión y protegerla contra manipulaciones. Debes proporcionar una cadena única y segura como valor para este campo.
const passport = require('passport');
const multer = require('multer'); //Agregado para FireBase

const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/**
* Importar rutas
*/
const usersRoutes = require('./routes/usersRoutes');

const port = process.env.PORT || 3202;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');
app.set('port', port);

// Configura express-session
app.use(session({
    secret: '3e1acd58068f2ba18699adc43e83808f5cb035aeca98386ec20cf1f304aba6b6',
    resave: false,
    saveUninitialized: false
  }));

// Configura Passport después de express-session
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by'); // disable the X-Powered-By header in responses

app.set('port', port);

//Agregado para FireBase
const upload = multer({
    storage: multer.memoryStorage()
});

/**
* LLamando las rutas
*/
usersRoutes(app);

//direccion ip V4 de la maquina, consultar con ipconfig
server.listen(3202, '192.168.20.174' || 'localhost', function() {
 console.log('Aplicación de NodeJS ' + process.pid + ' inicio en el puerto ' + port);
});

/* RUTAS */
app.get('/', (req, res) => {
 res.send('Ruta raiz del Backend');
});

app.get('/test', (req, res) => {

  res.send('Estas en la ruta TEST');
  
  });

//Error handler
app.use((err, req, res, next) => {
 console.log(err);
 res.status(err.status || 500).send(err.stack);
}); 
