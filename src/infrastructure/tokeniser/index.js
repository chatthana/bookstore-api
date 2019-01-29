const jwt = require('jsonwebtoken');

module.exports = ({ config }) => {

  const {
    authentication: {
      jwt: {
        algorithm,
        issuer,
        audience,
        privateKey,
        publicKey
      }
    }
  } = config;

  const configuration = {
    algorithm,
    issuer,
    audience
  };

  const toRSA = rawKey => {
    return Buffer.from(rawKey, 'base64').toString('ascii');
  }

  const generate = payload => {
    return jwt.sign(payload, toRSA(privateKey), configuration);
  }

  const verify = token => {
    return jwt.verify(token, toRSA(publicKey), configuration);
  }

  return {
    generate,
    verify
  };

};