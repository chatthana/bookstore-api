const t = require('tcomb');
const { compose } = require('ramda');
const { cleaned } = require('../utilities');

const User = t.struct({
  guid: t.String,
  name: t.String,
  surname: t.String,
  username: t.String,
  email: t.String,
  passwordHash: t.String,
  passwordSalt: t.String,
  date_of_birth: t.String
});

module.exports = compose(cleaned, User);

