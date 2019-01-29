const { Router } = require('express');
const container = require('../../../../container');
const userRepository = require('../../../../infrastructure/repositories/book');

module.exports = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('OKAY');
  });

  return router;
}