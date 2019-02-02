const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  guid: String,
  name: String,
  surname: String,
  username: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  date_of_birth: String,
  books: [Number]
}, {
  versionKey: false
});

module.exports = model('User', UserSchema);



