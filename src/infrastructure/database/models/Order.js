const { Schema, model } = require('mongoose');

const OrderItem = Schema({
  book_id: Number,
  price: Number
});

const OrderSchema = Schema({
  guid: { type: String, unique: true },
  user_id: String,
  items: [ OrderItem ]
}, {
  versionKey: false
});

module.exports = model('Order', OrderSchema);