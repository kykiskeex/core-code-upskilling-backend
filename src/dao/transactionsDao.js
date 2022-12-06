/* eslint-disable class-methods-use-this */
// Temporary disable. Will need to refactor below to use functions instead of class type
const { query, getConnection } = require('../database');

class TransactionDao {
  async getTransactions({ bank_account_origin, dateini, datefin }) {
    let sql = "SELECT t.*, (CASE t.type WHEN '1' THEN 'Income' WHEN '2' THEN 'Expense' ELSE 'OUT Transfer' END) type_text, \
        cat.description as cat_description, cur.description as cur_description, (t.amount * t.exchange_rate) as account_currency_amount, \
        (CASE t.type WHEN '2' THEN -amount ELSE amount END) amountsign FROM transactions t \
        LEFT JOIN categories cat ON t.category_id = cat.category_id \
        LEFT JOIN currencies cur ON t.currency_transaction = cur.currency_name  \
        WHERE t.bank_account_origin = ? UNION ALL \
        SELECT t.*, 'IN Transfer' type_text, \
        cat.description as cat_description, cur.description as cur_description, (t.amount * t.exchange_rate) as account_currency_amount, \
        t.amount as amountsign FROM transactions t \
        LEFT JOIN categories cat ON t.category_id = cat.category_id \
        LEFT JOIN currencies cur ON t.currency_transaction = cur.currency_name  \
        WHERE t.bank_account_destiny = ? AND type = '3'";

    if(dateini && datefin){
      sql += " AND t.date BETWEEM ? AND ?";
      const result = await query(sql, [bank_account_origin, dateini, datefin]);
      return result;
    }else{
      const result = await query(sql, [bank_account_origin, bank_account_origin]);
      return result;
    }

  }

  async getTransactionsTotal({ bank_account_origin }) {
    let sql = "SELECT FORMAT(SUM(total),2) totalamount, cu.symbol FROM (select IFNULL(SUM((CASE type WHEN '2' THEN -amount ELSE amount END) * exchange_rate), 0) total from transactions where bank_account_origin = ? and type IN (1,2) \
            UNION ALL  select IFNULL(SUM(-amount * exchange_rate), 0) total from transactions where bank_account_origin = ? and type IN (3) \
            UNION ALL select IFNULL(SUM(amount * exchange_rate), 0) total from transactions where bank_account_destiny = ? and type IN (3)) T \
            LEFT JOIN bank_accounts ba \
            ON ba.bank_account = ? \
            LEFT JOIN currencies cu \
            ON ba.currency = cu.currency_name";

      const result = await query(sql, [bank_account_origin, bank_account_origin, bank_account_origin, bank_account_origin]);
      return result;
  }

  
  async addTransaction({ bank_account_origin, amount, type, category_id, currency_transaction, date, bank_account_destiny }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      console.log('bank_account_destiny', bank_account_destiny);
      console.log('currency_transaction', currency_transaction);
      console.log('type', type);

      if(type === '3'){
        console.log('Si entro');
        await con.query(
          `insert into transactions (bank_account_origin, amount, type, category_id, date, bank_account_destiny, currency_transaction, exchange_rate) \
            select ?, ?, ?, ?, NOW(), ?, (select currency from bank_accounts where bank_account = ?), er.rate from exchange_rates er
            where er.currency_origin = (select currency from bank_accounts where bank_account = ?) and er.currency_exchange = (select currency from bank_accounts where bank_account = ?)
          `,
          [bank_account_origin, amount, type, category_id, bank_account_destiny, bank_account_destiny, bank_account_origin, bank_account_destiny ]
        );
      }else{
        await con.query(
        `insert into transactions (bank_account_origin, amount, type, category_id, currency_transaction, date, exchange_rate) \
            select ?, ?, ?, ?, ?, NOW(), er.rate from exchange_rates er
            inner join bank_accounts ba
            on ba.bank_account = ? and er.currency_origin = ba.currency and er.currency_exchange = ?
          `,
          [bank_account_origin, amount, type, category_id, currency_transaction, bank_account_origin, currency_transaction]
          );
      }

      // Commit transaction
      await con.commit();

      const newEntry = await this.getTransactions({ bank_account_origin });

      return newEntry;
    } catch (e) {
      await con.rollback();
      console.log("Error: " + e)
      throw e;
    } finally {
      await con.release();
    }
  }

  async deleteTransaction({ bank_account_origin, idtransaction }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `DELETE FROM transactions WHERE idtransaction = ?`,
        [idtransaction]
      );

      // Commit audit transaction
      await con.commit();

      const newEntry = await this.getTransactions({ bank_account_origin });

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }
}

module.exports = TransactionDao;
