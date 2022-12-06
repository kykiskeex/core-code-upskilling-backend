const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

process.env.AUTH_TOKEN_SECRET = 'secret'

const passport = require('passport');

const requestLogger = require('./middlewares/requestLogger');
const errorLogger = require('./middlewares/errorLogger');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const routes = require('./routes');
const logger = require('./helpers/logger');

const app = express();

// readiness check for OpenShift
app.get('/version', (req, res) => {
  res.json({ version: '1.0' });
});

app.disable('x-powered-by');
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestLogger(config.debug));
app.use(config.basePath, routes);

app.use(errorLogger(logger));
app.use(errorHandler(config.debug));

app.use(passport.initialize());

module.exports = app;
