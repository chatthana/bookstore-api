const toEntity = require('../../../domain/order');

module.exports = model => {
  const getAll = (...args) => {
    return model.find(...args)
      .then(orders => {
        return orders.map(order => toEnity(order));
      }).catch(error => {
        throw new Error(error);
      });
  }

  const create = (...args) => {
    return model.create(...args)
      .then(order => {
        return toEntity(order)
      }).catch(error => {
        throw new Error(error);
      });
  }

  return {
    getAll,
    create
  }
};