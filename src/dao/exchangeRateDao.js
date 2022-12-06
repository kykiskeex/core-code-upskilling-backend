/* eslint-disable class-methods-use-this */
// Temporary disable. Will need to refactor below to use functions instead of class type
const { query, getConnection } = require('../database');

class ExchangeRateDao {
  async getExchangeRates() {
    const sql = 'SELECT `idexchange_rates`, `currency_origin`, `currency_exchange`, `rate` FROM exchange_rates';

    const result = await query(sql, []);
    return result;
  }

  async getExchangeRatesById({ idexchange_rates }) {
    const sql = 'SELECT `idexchange_rates`, `currency_origin`, `currency_exchange`, `rate` FROM exchange_rates WHERE idexchange_rates = ?';

    const result = await query(sql, [ idexchange_rates ]);
    return result;
  }

  
  async addExchangeRates({ idexchange_rates, currency_origin, currency_exchange, rate }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `insert into exchange_rates (idexchange_rates, currency_origin, currency_exchange, rate) \
          values (?, ?, ?, ?)`,
        [idexchange_rates, currency_origin, currency_exchange, rate]
      );

      // Commit transaction
      await con.commit();

      const newEntry = await this.getExchangeRates();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async updateExchangeRates({ idexchange_rates, currency_origin, currency_exchange, rate }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `update exchange_rates SET rate = ? WHERE idexchange_rates = ? `,
        [rate, idexchange_rates]
      );

      await con.commit();

      const newEntry = await this.getExchangeRates();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async deleteExchangeRates({ idexchange_rates }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `DELETE FROM exchange_rates WHERE idexchange_rates = ?`,
        [idexchange_rates]
      );

      await con.commit();

      const newEntry = await this.getExchangeRates();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }
}

module.exports = ExchangeRateDao;
