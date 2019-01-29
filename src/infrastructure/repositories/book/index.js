const toEntity = require('../../../domain/book');

module.exports = model => {

  const getAll = (...args) => {
    return model.find(...args)
      .then(entities => {
        return entities.map(entity => toEntity(entity));
      });
  }

  return {
    getAll
  }
  
}