const axios = require('axios');
const _ = require('lodash');

module.exports = () => {
  const getAll = () => {
    return axios.get('https://scb-test-book-publisher.herokuapp.com/books')
      .then(response => {
        return response;
      }).catch(error => {
        throw new Error(error);
      });
  }

  const getOne = (id) => {
    return getAll().then(({ data }) => {
      return data.filter(book => book.id === id)[0];
    }).catch(error => {
      throw new Error(error);
    });
  }

  return {
    getAll,
    getOne
  }
};