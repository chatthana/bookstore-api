const t = require('tcomb');
const { compose } = require('ramda');
const { cleaned } = require('../utilities');

const User = t.struct({
  guid: t.String,
  name: t.String,
  surname: t.String,
  username: t.String,
  email: t.String,
  passwordHash: t.maybe(t.String),
  passwordSalt: t.maybe(t.String),
  date_of_birth: t.String
});

module.exports = compose(cleaned, User);

