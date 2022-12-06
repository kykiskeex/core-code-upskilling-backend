module.exports = (res, response) => {
  res.status(response.statusCode);
  res.send(response.body);
};
