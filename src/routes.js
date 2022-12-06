const Router = require('express-promise-router');
const grantsController = require('./controllers/grantsController');
const userController = require('./controllers/userController');
const bankAccountController = require('./controllers/bankAccountController');
const categoriesController = require('./controllers/categoriesController');
const transactionsController = require('./controllers/transactionsController');
const exchangeRateController = require('./controllers/exchangeRateController');
const currenciesController = require('./controllers/currenciesController');
const usersController = require('./controllers/usersController');

const router = Router();

const token = require('./controllers/tokenController.js');
const verifyToken =require("./auth/jwt/verifyJWT.js");

/*Ruta para validacion de Token con Facebook*/
router.post('/token/gettoken',token.getToken);
router.post('/token/gettokenregister',token.getTokenAndRegister);

//optener nuevo token y Refresh Token 
router.post('/token/getnewtoken',verifyToken.verifyJWT());

router.get('/user/me', userController.getUser);

router.get('/categories/:category_id', categoriesController.getCategoriesDataById);
router.get('/categories', categoriesController.getCategoriesData);
router.post('/categories', categoriesController.addCategoriesData);
router.put('/categories', categoriesController.updateCategoriesData);
router.delete('/categories', categoriesController.deleteCategoriesData);

router.get('/exchangerate/:idexchange_rates', exchangeRateController.getExchangeRateDataById);
router.get('/exchangerate', exchangeRateController.getExchangeRateData);
router.post('/exchangerate', exchangeRateController.addExchangeRateData);
router.put('/exchangerate', exchangeRateController.updateExchangeRateData);
router.delete('/exchangerate', exchangeRateController.deleteExchangeRateData);

router.get('/currencies/:currency_name', currenciesController.getCurrenciesDataById);
router.get('/currencies', currenciesController.getCurrenciesData);
router.post('/currencies', currenciesController.addCurrenciesData);
router.put('/currencies', currenciesController.updateCurrenciesData);
router.delete('/currencies', currenciesController.deleteCurrenciesData);

router.get('/transactions/:bank_account_origin', transactionsController.getTransactionsData);
router.get('/transactionstotal/:bank_account_origin', transactionsController.getTransactionsTotalData);
router.get('/transactions', transactionsController.getTransactionsData);
router.post('/transactions', transactionsController.addTransactionsData);
router.delete('/transactions', transactionsController.deleteTransactionsData);


router.get('/bankaccounts/:username', bankAccountController.getbankAccountData);
router.get('/bankaccount/:bank_account', bankAccountController.getbankAccountDataById);
router.post('/bankaccount', bankAccountController.addBankAccountData);
router.put('/bankaccount', bankAccountController.updateBankAccountData);
router.delete('/bankaccount', bankAccountController.deleteBankAccountData);

router.get('/users/:username', usersController.getUsersDataById);
router.get('/users', usersController.getUsersData);
router.post('/users', usersController.addUsersData);
router.put('/users', usersController.updateUsersData);
router.delete('/users', usersController.deleteUsersData);

// No role based authZ required for grants endpoint
router.get('/grants', grantsController.listGrantsController);
router.get('/grants/applications', grantsController.listApplicationsController);
router.get('/grants/roles', grantsController.listRolesController);


module.exports = router;
