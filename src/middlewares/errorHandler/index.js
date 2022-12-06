const development = require('./development');
const nonDevelopment = require('./nonDevelopment');

module.exports = isDevelopmentMode => {
  if (isDevelopmentMode) {
    return development;
  }
  return nonDevelopment;
};
