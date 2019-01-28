const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  username: String,
  password: String,
  date_of_birth: String
}, {
  versionKey: false
});

module.exports = model('User', UserSchema);





