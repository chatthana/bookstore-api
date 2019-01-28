const t = require('tcomb');
const { compose } = require('ramda');
const { cleaned } = require('../utilities');

const Book = t.struct({
  id: t.Number,
  book_name: t.String,
  author_name: t.String,
  price: t.Number
});

module.exports = compose(cleaned, Book)

