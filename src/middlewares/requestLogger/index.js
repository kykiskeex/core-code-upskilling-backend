const expressWinston = require('express-winston');
const developmentLogger = require('./development');

module.exports = debugMode => {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');

  return developmentLogger;
};
