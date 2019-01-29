const { Router } = require('express');
const container = require('../../../../container');
const bookRepository = require('../../../../infrastructure/repositories/book');
const bookWebService = require('../../../../infrastructure/web_services/book');
const { get } = require('../../../../app/book');
const { compose } = require('ramda');

module.exports = () => {
  const router = Router();

  const { db, authenticator } = container.cradle;

  const useCase = compose(bookRepository)(bookWebService());

  const getUseCase = get({ bookRepository: useCase });

  router.get('/', (req, res) => {
    getUseCase.all((req, res))
    .then(books => {
      return res.json({
        status: '000',
        message: 'Successfully retrieve the book list',
        data: books
      });
    }).catch(error => {
      return res.status(502).json({
        status: '502',
        message: 'Unable to retrieve the book list',
        error: error.message
      });
    });
  });

  return router;
}