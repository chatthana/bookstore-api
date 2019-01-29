const express = require('express');
const logger = require('morgan');

module.exports = ({ config, router, authenticator }) => {
  const app = express();

  app.use(logger('dev'));
  app.use(authenticator.initialise());
  app.use(express.static('public'));
  app.use(router);

  app.use((req, res, next) => {
    return res.status(404).json({
      message: 'Not found'
    });
  });

  return {
    app,
    run: () => Promise.resolve().then(() => {
      const http = app.listen(config.port, () => {
        const { port } = http.address();
        console.log(`🤘 The API is initialised on the port ${port}`);
      });
    })
  };
};