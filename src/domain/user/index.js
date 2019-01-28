const t = require('tcomb');
const { compose } = require('ramda');
const { cleaned } = require('../utilities');

const User = t.struct({
  username: t.String,
  password: t.String,
  date_of_birth: t.String
});

module.exports = compose(cleaned, User);

