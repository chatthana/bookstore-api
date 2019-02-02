const uuid = require('uuid/v4');
const OrderEntity = require('../../domain/order');

module.exports = ({ userRepository, orderRepository, bookRepository }) => {
  const placeOrder = ({ user_id, orders }) => {
    
    return new Promise(async (resolve, reject) => {

      try {

        const booksTobeOrdered = await Promise.all(
          orders.map(id => bookRepository.getById(id)
        ));

        const orderObject = {
          guid: uuid(),
          user_id,
          items: []
        };

        const orderEntity = OrderEntity(orderObject);

        booksTobeOrdered.map(book => orderEntity.addOrderItem(book.id, book.price));
        
        await orderRepository.create(orderEntity);
        await userRepository.update({ guid: user_id }, {
          $addToSet: {
            books: { $each: orders }
          }
        });

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