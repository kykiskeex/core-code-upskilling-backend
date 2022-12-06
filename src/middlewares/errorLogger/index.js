const expressWinston = require('express-winston');

module.exports = logger => expressWinston.errorLogger({ winstonInstance: logger });
