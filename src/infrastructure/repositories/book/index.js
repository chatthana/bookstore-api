const toEntity = require('../../../domain/book');

module.exports = model => {

  const getAll = (...args) => {
    return model.find(...args)
      .then(entities => {
        console.log(entities, 'ENTITIES');
        return entities.map(entity => toEntity(entity));
      });
  }

  return {
    getAll
  }

}