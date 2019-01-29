const { Router } = require('express');
const container = require('../../../../container');
const userRepository = require('../../../../infrastructure/repositories/user');
const bookRepository = require('../../../../infrastructure/repositories/book');
const orderRepository = require('../../../../infrastructure/repositories/order');
const bookWebService = require('../../../../infrastructure/web_services/book');
const { get, post, destroy, placeOrder } = require('../../../../app/user');
const { compose } = require('ramda');

module.exports = () => {
  const router = Router();

  const { db, authenticator } = container.cradle;

  const useCase = compose(userRepository)(db.models.User);
  const bookUseCase = compose(bookRepository)(bookWebService());
  const orderUseCase = compose(orderRepository)(db.models.Order);

  const getUseCase = get({ userRepository: useCase });
  const postUseCase = post({ userRepository: useCase });
  const destroyUseCase = destroy({ userRepository: useCase });
  const placeOrderUseCase = placeOrder({ userRepository: useCase, orderRepository: orderUseCase, bookRepository: bookUseCase});
  
  router.post('/', (req, res) => {
    postUseCase.create({ requestBody: req.body })
    .then(response => {
      return res.json({
        status: '000',
        message: 'Successfully created the user account'
      });
    }).catch(error => {
      return res.status(502).json({
        status: '502',
        message: 'Unable to create the user',
        error: error.message
      });
    });
  });

  router.use(authenticator.authenticate());

  router.get('/', (req, res) => {
    getUseCase.get({ guid: req.user.guid })
    .then(user => {
      return res.json({
        status: '000',
        message: 'Successfully retrieved the logged in user',
        data: user
      });
    }).catch(error => {
      return res.status(502).json({
        status: '502',
        message: 'Unable to read the user information',
        error: error.message
      });
    });
  });

  router.post('/orders', (req, res) => {
    placeOrderUseCase.placeOrder({ user_id: req.user.guid, book_ids: req.body.book_ids })
      .then(response => {
        return res.json({
          status: '000',
          message: 'Successfully placed the order',
          price: response
        });
      }).catch(error => {
        return res.status(502).json({
          status: '502',
          message: 'Failed to place the order',
          error: error.message
        })
      });
  });

  router.delete('/', (req, res) => {
    destroyUseCase.destroy({ guid: req.user.guid })
    .then(() => {
      return res.json({
        status: '000',
        message: 'Successfully deleted the current user. You will no longer be able to use this account'
      });
    }).catch(error => {
      return res.status(502).json({
        status: '502',
        message: 'Unable to delete the current user',
        error: error.message
      });
    });
  });

  return router;
}