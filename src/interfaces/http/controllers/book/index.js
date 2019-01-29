const { Router } = require('express');
const container = require('../../../../container');
const userRepository = require('../../../../infrastructure/repositories/book');
const { get } = require('../../../../app/book');
const { compose } = require('ramda');

module.exports = () => {
  const router = Router();

  const { db, authenticator } = container.cradle;

  const useCase = compose(userRepository)(db.models.Book);

  const getUseCase = get({ userRepository: useCase });

  router.use(authenticator.authenticate());

  router.get('/', (req, res) => {
    getUseCase.all((req, res))
    .then(books => {
      res.json({
        status: '000',
        message: 'Success',
        data: books
      });
    });
  });

  return router;
}