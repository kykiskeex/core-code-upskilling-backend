/* eslint-disable class-methods-use-this */
// Temporary disable. Will need to refactor below to use functions instead of class type
const { query, getConnection } = require('../database');

class CurrenciesDao {
  async getCurrencies() {
    const sql = 'SELECT `currency_name`, description, `symbol` FROM currencies';

    const result = await query(sql, []);
    return result;
  }

  async getCurrenciesById({ currency_name }) {
    const sql = 'SELECT currency_name, description, symbol FROM currencies WHERE currency_name = ?';

    const result = await query(sql, [ currency_name ]);
    return result;
  }

  
  async addCurrencies({ description, currency_name, symbol }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `insert into currencies (currency_name, description, symbol) \
          values (?, ?, ?)`,
        [currency_name, description, symbol]
      );

      // Commit transaction
      await con.commit();

      const newEntry = await this.getCurrencies();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async updateCurrencies({ description, currency_name, symbol }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `update currencies SET description = ?, symbol = ? WHERE currency_name = ?`,
        [description, symbol, currency_name]
      );

      await con.commit();

      const newEntry = await this.getCurrencies();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async deleteCurrencies({ currency_name }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `DELETE FROM currencies WHERE currency_name = ?`,
        [currency_name]
      );

      await con.commit();

      const newEntry = await this.getCurrencies();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }
}

module.exports = CurrenciesDao;
