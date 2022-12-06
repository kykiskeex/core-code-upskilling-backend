const { query } = require('../database');

const listGrants = async () => {
  const sql = `SELECT role, resource, action \
  FROM genesys_membership.grants
  WHERE application = 'genesys'`;

  const result = await query(sql, []);

  return result;
};
const listApplications = async () => {
  const sql = `SELECT distinct application \
  FROM genesys_membership.grants`;

  const result = await query(sql, []);
  return result;
};
const listRoles = async ({ application }) => {
  const sql = `SELECT distinct  role \
  FROM genesys_membership.grants
  WHERE application = ?`;

  const result = await query(sql, [application]);
  return result;
};

module.exports = { listGrants, listApplications, listRoles };
