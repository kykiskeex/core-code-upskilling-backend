const propRequired = options => prop => {
  if (options[prop] === undefined) {
    throw new ReferenceError(`${prop} is required`);
  }
};

module.exports = options => {
  const checker = propRequired(options);
  checker('method');
  checker('path');
  checker('destination');
};
