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

  const getUseCase = get({ userRepository: useCase, orderRepository: orderUseCase });
  const postUseCase = post({ userRepository: useCase });
  const destroyUseCase = destroy({ userRepository: useCase });
  const placeOrderUseCase = placeOrder({ orderRepository: orderUseCase, bookRepository: bookUseCase});
  
  /**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     description: User Authentication Endpoint
 *     security:
 *       - Bearer: []
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        description: UserBody
 *        required: true
 *     responses:
 *       200:
 *         description: Token
 *         schema:
 *           type: array
 *       502:
 *         description: Error
 */
  router.post('/', (req, res) => {
    postUseCase.create({ requestBody: req.body })
    .then(response => {
      return res.json({
        status: '000',
        message: 'Successfully created the user account'
      });
    }).catch(error => {
      return res.status(400).json({
        status: '400',
        message: 'Unable to create the user',
        error: error.message
      });
    });
  });

  router.use(authenticator.authenticate());

  /**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Current user
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User information
 *         schema:
 *           type: array
 */
  router.get('/', (req, res) => {
    getUseCase.get({ guid: req.user.guid })
    .then(user => {
      return res.json({
        status: '000',
        message: 'Successfully retrieved the logged in user',
        data: user
      });
    }).catch(error => {
      return res.status(400).json({
        status: '400',
        message: 'Unable to read the user information',
        error: error.message
      });
    });
  });

 /**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     description: User order endpoints (Based on requirement)
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Token
 *       502:
 *         description: Error
 */
  router.post('/orders', (req, res) => {
    placeOrderUseCase.placeOrder({ user_id: req.user.guid, orders: req.body.orders })
      .then(response => {
        return res.json({
          status: '000',
          message: 'Successfully placed the order',
          data: response
        });
      }).catch(error => {
        return res.status(400).json({
          status: '400',
          message: 'Failed to place the order',
          error: error.message
        })
      });
  });

   /**
 * @swagger
 * /api/v1/users:
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete user
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Token
 *         schema:
 *           type: array
 *       502:
 *         description: Error
 */

  router.delete('/', (req, res) => {
    destroyUseCase.destroy({ guid: req.user.guid })
    .then(() => {
      return res.json({
        status: '000',
        message: 'Successfully deleted the current user. You will no longer be able to use this account'
      });
    }).catch(error => {
      return res.status(400).json({
        status: '400',
        message: 'Unable to delete the current user',
        error: error.message
      });
    });
  });

  return router;
}