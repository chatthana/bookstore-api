const t = require('tcomb');
const { compose } = require('ramda');
const { cleaned } = require('../utilities');
const OrderItem = require('./OrderItem');

const Order = t.struct({
  guid: t.String,
  user_id: t.Number,
  items: t.Array
});

Order.prototype.addOrderItem = function(book_id, price) {
  const item = OrderItem({ book_id, price });
  this.items.push(item);
};

Order.prototype.calculateTotalPrice = function() {
  let totalPrice = 0;
  this.items.map(item => totalPrice += item.price);
  return totalPrice;
}

module.exports = compose(cleaned, Order);