/* eslint-disable class-methods-use-this */
// Temporary disable. Will need to refactor below to use functions instead of class type
const { query, getConnection } = require('../database');

class CategoriesDao {
  async getCategories() {
    const sql = 'SELECT category_id, description FROM categories';

    const result = await query(sql, []);
    return result;
  }

  async getCategoriesById({ category_id }) {
    const sql = 'SELECT category_id, description FROM categories WHERE category_id = ?';

    const result = await query(sql, [ category_id ]);
    return result;
  }

  
  async addCategories({ description, category_id }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `insert into categories (category_id, description) \
          values (?, ?)`,
        [category_id, description]
      );

      // Commit transaction
      await con.commit();

      const newEntry = await this.getCategories();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async updateCategories({ description, category_id }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `update categories SET description = ? WHERE category_id = ?`,
        [description, category_id]
      );

      await con.commit();

      const newEntry = await this.getCategories();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }

  async deleteCategories({ category_id }) {
    const con = await getConnection();
    try {
      await con.beginTransaction();

      await con.query(
        `DELETE FROM categories WHERE category_id = ?`,
        [category_id]
      );

      await con.commit();

      const newEntry = await this.getCategories();

      return newEntry;
    } catch (e) {
      await con.rollback();
      throw e;
    } finally {
      await con.release();
    }
  }
}

module.exports = CategoriesDao;
