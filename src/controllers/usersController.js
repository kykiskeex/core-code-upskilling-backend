const UsersDao = require('../dao/usersDao');

const usersDao = new UsersDao();

const getUsersData = async (req, res, next) => {
  let result;
  result = await usersDao.getUsers();
  res.send(result !== undefined ? result : []);
  return result;
};

const getUsersDataById = async (req, res, next) => {
  let result;
  result = await usersDao.getUsersById(req.params);
  res.send(result !== undefined ? result[0] : []);
  return result;
};

const addUsersData = async (req, res, next) => {
  let result;
  result = await usersDao.addUsers(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const updateUsersData = async (req, res, next) => {
  let result;
  result = await usersDao.updateUsers(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

const deleteUsersData = async (req, res, next) => {
  let result;
  result = await usersDao.deleteUsers(req.body);
  res.send(result !== undefined ? result : []);
  return result;
};

module.exports = { getUsersData, addUsersData, updateUsersData, deleteUsersData, getUsersDataById };
