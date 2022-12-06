const BankAccountDao = require('../dao/bankAccountDao');

const bankAccountDao = new BankAccountDao();

const getbankAccountData = async (req, res, next) => {
  let result;
  result = await bankAccountDao.getBankAccounts(req.params);
  res.send(result !== undefined ? result : []);
  return result;
};

const getbankAccountDataById = async (req, res, next) => {
  let result;
  result = await bankAccountDao.getBankAccountsById(req.params);
  res.send(result !== undefined ? result[0] : {});
  return result;
};

const addBankAccountData = async (req, res, next) => {
  let result;
  result = await bankAccountDao.addBankAccount(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const updateBankAccountData = async (req, res, next) => {
  let result;
  result = await bankAccountDao.updateBankAccount(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const deleteBankAccountData = async (req, res, next) => {
  let result;
  result = await bankAccountDao.deleteBankAccount(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

module.exports = { getbankAccountData, addBankAccountData, updateBankAccountData, deleteBankAccountData, getbankAccountDataById };
