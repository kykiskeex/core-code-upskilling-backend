const CategoriesDao = require('../dao/categoriesDao');

const categoriesDao = new CategoriesDao();

const getCategoriesData = async (req, res, next) => {
  let result;
  result = await categoriesDao.getCategories();
  res.send(result !== undefined ? result : []);
  return result;
};

const getCategoriesDataById = async (req, res, next) => {
  let result;
  result = await categoriesDao.getCategoriesById(req.params);
  res.send(result !== undefined ? result[0] : []);
  return result;
};

const addCategoriesData = async (req, res, next) => {
  let result;
  result = await categoriesDao.addCategories(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const updateCategoriesData = async (req, res, next) => {
  let result;
  result = await categoriesDao.updateCategories(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const deleteCategoriesData = async (req, res, next) => {
  let result;
  result = await categoriesDao.deleteCategories(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

module.exports = { getCategoriesData, addCategoriesData, updateCategoriesData, deleteCategoriesData, getCategoriesDataById };
