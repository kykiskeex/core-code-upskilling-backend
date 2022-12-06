/*  eslint-disable no-unused-vars */
// Maintain standard middleware signature for readability
const { NotImplementedError } = require('../helpers/errors');

const notImplementedController = (req, res) => {
  throw new NotImplementedError('Route is pending implementation');
};

module.exports = notImplementedController;
