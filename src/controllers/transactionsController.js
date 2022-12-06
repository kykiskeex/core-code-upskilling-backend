const TransactionsDao = require('../dao/transactionsDao');

const transactionDao = new TransactionsDao();

const getTransactionsData = async (req, res, next) => {
  let result = [];
  if(req.params && req.params.bank_account_origin){
    result = await transactionDao.getTransactions(req.params);
    res.send(result !== undefined ? result : []);
  }else{
    res.send(result);
  }
  return result;
};

const getTransactionsTotalData = async (req, res, next) => {
  let result = {};
  if(req.params && req.params.bank_account_origin){
    result = await transactionDao.getTransactionsTotal(req.params);
    res.send(result !== undefined ? result[0] : {});
  }else{
    res.send(result);
  }
  return result;
};


const addTransactionsData = async (req, res, next) => {
  let result;
  result = await transactionDao.addTransaction(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const deleteTransactionsData = async (req, res, next) => {
  let result;
  result = await transactionDao.deleteTransaction(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

module.exports = { getTransactionsData, addTransactionsData, deleteTransactionsData, getTransactionsTotalData };
