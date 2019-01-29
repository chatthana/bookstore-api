const { Router } = require('express');
const container = require('../../../../container');
const userRepository = require('../../../../infrastructure/repositories/user');
const { post } = require('../../../../app/login');
const { compose } = require('ramda');

module.exports = () => {
  const router = Router();

  const { db, tokeniser } = container.cradle;

  const useCase = compose(userRepository)(db.models.User);

  const postUseCase = post({ userRepository: useCase, tokeniser });

  router.post('/', (req, res) => {
    postUseCase.validate({ requestBody: req.body })
    .then(response => {
      return res.json({
        status: '000',
        message: 'Successfully logged the user in',
        token: response
      });
    }).catch(error => {
      return res.status(403).json({
        status: '403',
        message: 'Unable to log the user in'
      });
    });
  });

  return router;
}