
const logger = require('../helpers/logger');
const { verifyAccessTokenAsync } = require('../auth/jwt');

const DEFAULT_PROFILE = { system_access: 'NA', user_nm: 'GUEST' };

const getUser = async (req, res) => {
  try {
    const decodedAccessToken = await verifyAccessTokenAsync(req.headers.authorization.replace('Bearer ', ''));
    const { givenName, lastName, sub: userID } = decodedAccessToken;
    const user = ''; //await getUserByID({ userID });
    if (!user[0]) {
      throw new Error('user profile does not exist in table');
    }

    const { system_access } = user[0];
    res.send({ id: userID, system_access, user_nm: `${givenName} ${lastName}` });
  } catch (e) {
    logger.error(`getUser Error: ${e.message}`);
    res.send(DEFAULT_PROFILE);
  }
};

module.exports = { getUser };
