const t = require('tcomb');

const OrderItem = t.struct({
  book_id: t.Number,
  price: t.Number
});

module.exports = OrderItem;