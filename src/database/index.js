const mysql = require('promise-mysql');

let pool;
initPool();

async function initPool() {
  pool = await mysql.createPool({
    host: '192.168.56.1',
    user: 'root',
    password: 'p@ssw0rd3',
    database: 'codecodeproject',
    connectionLimit: 10,
    debug: true,
  });
}

const query = (sql, data) => {
  return pool.query(sql, data);
};

const getConnection = () => {
  return pool.getConnection();
};

module.exports = {
  getConnection,
  query,
};
