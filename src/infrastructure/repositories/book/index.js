const toEntity = require('../../../domain/book');

module.exports = model => {

  const getAll = (...args) =>
    model.find(...args)
      .then(entities =>
        entities.map(entity => toEntity(entity)))

  return {
    getAll
  }

}