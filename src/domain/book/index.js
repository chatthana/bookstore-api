const t = require('tcomb');
const { compose, complement, pickBy, isNil } = require('ramda');

const cleaned = entity => pickBy(compose(complement(isNil)), entity);

const Book = t.struct({
  id: t.Number,
  book_name: t.String,
  author_name: t.String,
  price: t.Number
});

module.exports = compose(cleaned, Book);

