const { Schema, model } = require('mongoose');

const BookSchema = Schema({
  id: { type: Number, unique: true },
  book_name: String,
  author_name: String,
  price: Number
}, {
  versionKey: false
});

module.exports = model('Book', BookSchema);