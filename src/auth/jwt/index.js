const AES = require('crypto-js/aes');
const UTF8Encoder = require('crypto-js/enc-utf8');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const { jwksUri } = require('../../config');

const ACCESS_TOKEN = 'accessToken';
const client = jwksClient({
  cache: true,
  cacheMaxEntries: 10,
  rateLimit: true,
  jwksUri,
});

if (!process.env.AUTH_TOKEN_SECRET) {
  throw new Error('[FATAL] AUTH_TOKEN_SECRET environment variable is required for auth setup');
}

const decryptTokens = encryptedTokens => {
  const decryptedTokens = JSON.parse(AES.decrypt(encryptedTokens, process.env.AUTH_TOKEN_SECRET).toString(UTF8Encoder));
  if (!(ACCESS_TOKEN in decryptedTokens)) {
    throw new Error('unable to decrypt token');
  }

  return decryptedTokens;
};

const decodeAccessToken = encodedAccessToken => {
  return jwt.decode(encodedAccessToken, { complete: true });
};

const verifyAccessTokenAsync = async encodedAccessToken => {
  const decodedAccessToken = decodeAccessToken(encodedAccessToken);
  const {
    header: { kid },
  } = decodedAccessToken;
  if (!kid) {
    throw new Error('invalid access token');
  }

  const { publicKey } = await client.getSigningKeyAsync(kid);
  if (!publicKey) {
    throw new Error('unable to acquire signing key');
  }

  return jwt.verify(encodedAccessToken, publicKey);
};

module.exports = {
  ACCESS_TOKEN,
  decryptTokens,
  decodeAccessToken,
  verifyAccessTokenAsync,
};
