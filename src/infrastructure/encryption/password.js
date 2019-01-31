const crypto = require('crypto');

exports.comparePassword = (plainPassword, encodedPassword, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(plainPassword);
  return hash.digest('hex') === encodedPassword;
};