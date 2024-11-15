const http = require('http');
const express = require('express');

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');


const app = express();
const server = http.createServer(app);
const SysConfig = require('./config');

app.set('port', SysConfig.ServerPort); // Asegúrate de que el puerto sea 3000
app.set('json spaces', 2);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'JFHg84FMB870Kr93Kr854g',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.message = req.flash('message');
  res.locals.user = req.user;
  next();
});

app.use('/api/', require('../routes/api'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

async function cfePlataforma() {
  await server.listen(app.get('port'));
  console.log(`${SysConfig.ServerName} Iniciado en el Puerto:`.yellow, app.get('port'));
}

cfePlataforma();
