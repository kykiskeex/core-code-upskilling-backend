const CODE = Object.freeze({
  NOT_FOUND: 1,
  NOT_IMPLEMENTED: 2,
  DEFAULT: 3,
  NOT_UPDATED: 4,
});

class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.code = CODE.NOT_IMPLEMENTED;
    this.type = 'error';
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = CODE.NOT_FOUND;
    this.type = 'error';
  }
}

class NotUpdatedError extends Error {
  constructor(message) {
    super(message);
    this.code = CODE.NOT_UPDATED;
    this.type = 'error';
  }
}

module.exports = { CODE, NotImplementedError, NotFoundError, NotUpdatedError };
