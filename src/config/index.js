const env = 'development';
const config = require(`./${env.trim()}`);
const axiosConfig = require('../config/axiosConfig');

const CURRENT_APPLICATION = 'codecore';

axiosConfig();

config.env = env;
config.application = CURRENT_APPLICATION;
module.exports = Object.freeze(Object.assign({}, config));
