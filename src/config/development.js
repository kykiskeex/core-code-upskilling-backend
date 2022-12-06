const baseUrl = 'http://localhost:3000';
module.exports = {
  port: 3000,
  basePath: '/api',
  cors: {
    origin: /.*\.*\.*/,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Correlation-Id, T-Session-Token',
    credentials: true,
  },
  logging: {
    prettyPrint: true,
    level: 'debug',
    stringify: false,
    humanReadableUnhandledException: true,
    json: true,
    colorize: true,
    timestamp: true,
  },
  debug: true
};
