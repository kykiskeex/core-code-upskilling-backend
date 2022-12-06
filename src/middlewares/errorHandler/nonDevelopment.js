const { CODE } = require('../../helpers/errors');

const errorHandler = (err, req, res, next) => {
  const { code = CODE.DEFAULT, message, type = 'error' } = err;
  let status;

  switch (err.code) {
    case CODE.NOT_FOUND:
      status = 404;
      break;
    case CODE.NOT_UPDATED:
      status = 400;
      break;
    default:
      status = 500;
  }

  res.status(status);
  res.send({ code, message, type });
};

module.exports = errorHandler;
