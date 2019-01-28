const { Schema, model } = require('mongoose');

const OrderItem = Schema({
  book_id: Number,
  price: Number
});

const OrderSchema = Schema({
  guid: { type: String, unique: true },
  user_id: Number,
  items: [ OrderItem ]
}, {
  versionKey: false
});

module.exports = model('Order', OrderSchema);