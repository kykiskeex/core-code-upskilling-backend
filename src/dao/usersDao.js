/* eslint-disable class-methods-use-this */
// Temporary disable. Will need to refactor below to use functions instead of class type
const { query, getConnection } = require('../database');

class UsersDao {
  async getUsers() {
    const sql = 'SELECT username, name, email, rol FROM users';

    const result = await query(sql, []);
    return result;
  }

  async getUsersById({ username }) {
    const sql = 'SELECT username, name, email, rol FROM users WHERE username = ?';

    const result = await query(sql, [ username ]);
    return result;
  }

  async getUsersByIdAndPass({ username, password }) {
    const sql = 'SELECT username, name, email, rol FROM users WHERE username = ? and password = ?';

    const result = await query(sql, [ username, password ]);
    return result;
  }
  
  async addUsers({ password, username, name, email, rol }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `insert into users (username, password, name, email, rol) \
          values (?, ?, ?, ?, ?)`,
        [username, password, name, email, rol]
      );

      // Commit transaction
      await con.commit();

      const newEntry = await this.getUsers();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async updateUsers({ password, username, name, email, rol }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `update users SET email = ?, name = ?, rol = ? WHERE username = ?`,
        [email, name, username, rol]
      );

      await con.commit();

      const newEntry = await this.getUsers();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async deleteUsers({ username }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `DELETE FROM users WHERE username = ?`,
        [username]
      );

      await con.commit();

      const newEntry = await this.getUsers();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }
}

module.exports = UsersDao;
