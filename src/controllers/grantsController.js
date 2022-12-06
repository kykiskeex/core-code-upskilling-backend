const { listGrants, listApplications, listRoles } = require('../dao/grantsDao');

const listGrantsController = async (req, res) => {
  const grants = await listGrants();

  if (grants) {
    res.send(grants);
  } else {
    res.status(404);
    res.send({
      code: 1,
      message: `No grants found`,
      type: 'error',
    });
  }
};
const listApplicationsController = async (req, res) => {
  const apps = await listApplications();

  if (apps) {
    res.send(apps);
  } else {
    res.status(404);
    res.send({
      code: 1,
      message: `No apps found`,
      type: 'error',
    });
  }
};
const listRolesController = async (req, res) => {
  let result = [];
  if (typeof req.query.application !== 'undefined') {
    const { application } = req.query;
    result = await listRoles({ application });
    if (result) {
      res.send(result);
    } else {
      res.status(404);
      res.send({
        code: 1,
        message: `No roles found`,
        type: 'error',
      });
    }
  }
};

module.exports = { listGrantsController, listApplicationsController, listRolesController };
