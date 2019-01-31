const { transferSort } = require('../../infrastructure/utils/book');

module.exports = ({ bookRepository }) => {
  const all = () => Promise
    .resolve()
    .then(() => {
      return bookRepository.getAll();
    }).then(books => {
      return transferSort(books);
    }).catch(error => {
      throw new Error(error);
    });
  
  return {
    all
  }
};