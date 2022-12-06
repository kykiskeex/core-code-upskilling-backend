const ExchangeRateDao = require('../dao/exchangeRateDao');

const exchangeRateDao = new ExchangeRateDao();

const getExchangeRateData = async (req, res, next) => {
  let result;
  result = await exchangeRateDao.getExchangeRates();
  res.send(result !== undefined ? result : []);
  return result;
};

const getExchangeRateDataById = async (req, res, next) => {
  let result;
  result = await exchangeRateDao.getExchangeRatesById(req.params);
  res.send(result !== undefined ? result[0] : []);
  return result;
};

const addExchangeRateData = async (req, res, next) => {
  let result;
  result = await exchangeRateDao.addExchangeRates(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const updateExchangeRateData = async (req, res, next) => {
  let result;
  result = await exchangeRateDao.updateExchangeRates(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const deleteExchangeRateData = async (req, res, next) => {
  let result;
  result = await exchangeRateDao.deleteExchangeRates(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

module.exports = { getExchangeRateData, addExchangeRateData, updateExchangeRateData, deleteExchangeRateData, getExchangeRateDataById };
