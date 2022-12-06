const _ = require('lodash');
const { get, post } = require('request-promise');
const responseHandler = require('./responseHandler');

const controllerCreator = (destination, headerList = ['content-type', 'accept'], authorization) => ({
  post: async (req, res) => {
    const headers = _.pick(req.headers, headerList);
    if (authorization) {
      headers.authorization = authorization;
    }
    const response = await post(destination, {
      headers,
      body: req.body,
      strictSSL: false,
      rejectUnauthorized: false,
      simple: false,
      resolveWithFullResponse: true,
      qs: req.query,
      json: typeof req.body !== 'string',
    });
    responseHandler(res, response);
  },
  get: async (req, res) => {
    const headers = _.pick(req.headers, headerList);
    if (authorization) {
      headers.authorization = authorization;
    }
    const response = await get(destination, {
      headers,
      qs: req.query,
      strictSSL: false,
      rejectUnauthorized: false,
      simple: false,
      resolveWithFullResponse: true,
      json: typeof req.body !== 'string',
    });
    responseHandler(res, response);
  },
  delete: async (req, res) => {
    const headers = _.pick(req.headers, headerList);
    if (authorization) {
      headers.authorization = authorization;
    }
    const response = await post(destination, {
      headers,
      body: req.body,
      strictSSL: false,
      rejectUnauthorized: false,
      simple: false,
      resolveWithFullResponse: true,
      qs: req.query,
      json: typeof req.body !== 'string',
    });
    responseHandler(res, response);
  },
});

module.exports = controllerCreator;
