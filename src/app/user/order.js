const uuid = require('uuid/v4');
const OrderEntity = require('../../domain/order');

module.exports = ({ orderRepository, bookRepository }) => {
  const placeOrder = ({ user_id, book_ids }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const booksTobeOrdered = await Promise.all(book_ids.map(id => bookRepository.getById(id)));
        const orderObject = {
          guid: uuid(),
          user_id,
          items: []
        };

        const orderEntity = OrderEntity(orderObject);
        booksTobeOrdered.map(book => orderEntity.addOrderItem(book.id, book.price));
        
        const placedOrder = await orderRepository.create(orderEntity);

        resolve({ price: orderEntity.calculateTotalPrice() });
        
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    placeOrder
  }

};