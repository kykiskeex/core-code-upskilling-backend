const winston = require('winston');
const config = require('../config');

const logger = winston.createLogger({
  transports: [new winston.transports.Console(config.logging)],
});

module.exports = logger;
