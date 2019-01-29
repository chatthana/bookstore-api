const { Router } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const buildController = require('./utils/buildController');

module.exports = ({ config }) => {

  const router = Router();

  const apiRouter = Router();

  apiRouter.use(cors()).use(bodyParser.json());

  apiRouter.use('/users', buildController('user'));
  apiRouter.use('/books', buildController('book'));
  apiRouter.use('/login', buildController('login'));
  apiRouter.use('/orders', buildController('order'));

  router.use(`/api/v${config.apiVersion}`, apiRouter);

  return router;

}