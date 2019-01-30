const _ = require('lodash');

module.exports = ({ userRepository, orderRepository }) => {

  const get = ({ guid }) => {
    let _user;
    return Promise
    .resolve()
    .then(() => {
      return userRepository.getOne({ guid }, { passwordHash: 0, passwordSalt: 0 });
    }).then(user => {
      _user = user;
      return orderRepository.getAll({ user_id: guid });
    }).then(orders => {
      const items = orders.map(order => order.items.map(item => item.book_id));
      _user.books = _.uniq(_.flatten(items));
      return _user;
    }).catch(error => {
      throw new Error(error);
    });
  }

  return {
    get
  }
};