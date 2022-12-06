const CurrenciesDao = require('../dao/currenciesDao');

const currenciesDao = new CurrenciesDao();

const getCurrenciesData = async (req, res, next) => {
  let result;
  result = await currenciesDao.getCurrencies();
  res.send(result !== undefined ? result : []);
  return result;
};

const getCurrenciesDataById = async (req, res, next) => {
  let result;
  result = await currenciesDao.getCurrenciesById(req.params);
  res.send(result !== undefined ? result[0] : []);
  return result;
};

const addCurrenciesData = async (req, res, next) => {
  let result;
  result = await currenciesDao.addCurrencies(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const updateCurrenciesData = async (req, res, next) => {
  let result;
  result = await currenciesDao.updateCurrencies(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const deleteCurrenciesData = async (req, res, next) => {
  let result;
  result = await currenciesDao.deleteCurrencies(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

module.exports = { getCurrenciesData, addCurrenciesData, updateCurrenciesData, deleteCurrenciesData, getCurrenciesDataById };
