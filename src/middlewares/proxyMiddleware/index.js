const router = require('express-promise-router')();
const controllerCreator = require('./controllerCreator');
const paramValidation = require('./paramValidation');

const proxyProcessor = options => {
  paramValidation(options);

  const { method, path, destination, authorization, headerList = ['content-type', 'accept'] } = options;

  const methodLower = method.toLowerCase();

  const controller = controllerCreator(destination, headerList, authorization)[methodLower];

  if (!controller) {
    throw new Error(`Method "${method}" is not implemented`);
  }

  router[methodLower](path, controller);
};

module.exports = routes => {
  routes.forEach(proxyProcessor);
  return router;
};
