const toEntity = require('../../../domain/book');

module.exports = model => {

  const getAll = (...args) => {
    return model.getAll(...args)
      .then(({ data }) => {
        return data.map(entity => toEntity(entity));
      });
    }

  const getById = (...args) => {
    return model.getOne(...args)
      .then(book => {
        return toEntity(book);
      });
  }

  return {
    getAll,
    getById
  }

}