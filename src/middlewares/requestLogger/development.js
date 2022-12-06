const expressWinston = require('express-winston');
const winston = require('winston');
const config = require('../../config');

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console(config.logging)],
  // optional: control whether you want to log the meta data about the request (default to true)
  meta: true,
  // optional: customize the default logging message.
  // E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  msg: 'Incoming request: HTTP {{req.method}} {{req.url}}',
  // Use the default Express/morgan request formatting.
  // Enabling this will override any msg if true. Will only output colors with colorize set to true
  expressFormat: true,
});

module.exports = requestLogger;
