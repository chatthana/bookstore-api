const toEntity = require('../../../domain/user');

module.exports = model => {

  const getById = (...args) =>
    model.findOne(...args)
    .then(user => {
      toEntity(user);
    }).catch(error => {
      throw new Error(error);
    });

  return {
    getById
  }
}