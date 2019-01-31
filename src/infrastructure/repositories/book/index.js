const toEntity = require('../../../domain/book');
const container = require('../../../container');
const _ = require('lodash');

module.exports = model => {

  const { cache } = container.cradle;

  const getAll = (...args) => {
    return new Promise((resolve, reject) => {
      cache.get('books:all', (err, result) => {
        if (err) reject(err);
        if(result) {
          resolve(JSON.parse(result));
        } else {
          resolve(null);
        }
      });
    }).then(cachedBooks => {
      if(cachedBooks) {
        return cachedBooks.map(entity => toEntity(entity));
      } else {
        return model.getAll(...args)
          .then(({ data }) => {
            cache.set('books:all', JSON.stringify(data), 'EX', 3600);
            return data.map(entity => toEntity(entity));
          });
      }
    });
  }

  const getById = (id) => {
    return getAll()
      .then(books => {
        const targetBook = _.find(books, { id });
        return toEntity(targetBook);
      }).catch(error => {
        throw new Error(error);
      });
  }

  return {
    getAll,
    getById
  }

}