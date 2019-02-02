const express = require('express');
const logger = require('morgan');
const { notFoundHandler, exceptionHandler } = require('./middlewares/handlers');

module.exports = ({ config, router, authenticator }) => {
  const app = express();

  app.use(logger('dev'));
  app.use(authenticator.initialise());
  app.use(express.static('public'));
  app.use(router);

  app.use(notFoundHandler);
  app.use(exceptionHandler);

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