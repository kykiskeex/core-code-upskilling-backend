/* eslint-disable class-methods-use-this */
// Temporary disable. Will need to refactor below to use functions instead of class type
const { query, getConnection } = require('../database');

class BankAccountDao {
  async getBankAccounts({ username }) {
    const sql = 'SELECT bank_account, owner_name, `username`, currency FROM bank_accounts WHERE username = ?';

    const result = await query(sql, [username]);
    return result;
  }

  async getBankAccountsById({ bank_account }) {
    const sql = 'SELECT bank_account, owner_name, `username`, currency FROM bank_accounts WHERE bank_account = ?';

    const result = await query(sql, [bank_account]);
    return result;
  }
  
  async addBankAccount({ bank_account, owner_name, username, currency }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `insert into bank_accounts (bank_account, owner_name, username, currency) \
          values (?, ?, ?, ?)`,
        [bank_account, owner_name, username, currency]
      );

      // Commit transaction
      await con.commit();

      const newEntry = await this.getBankAccounts({ username });

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async updateBankAccount({ bank_account, owner_name, username }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `update bank_accounts SET owner_name = ? WHERE bank_account = ? AND username = ?`,
        [owner_name, bank_account, username]
      );

      await con.commit();

      const newEntry = await this.getBankAccounts({ username });

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async deleteBankAccount({ bank_account, username }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `DELETE FROM bank_accounts WHERE bank_account = ? AND username = ?`,
        [bank_account, username]
      );

      // Commit audit transaction
      await con.commit();

      const newEntry = await this.getBankAccounts({ username });

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }
}

module.exports = BankAccountDao;
