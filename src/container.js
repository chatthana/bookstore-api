const { createContainer, asFunction, asValue } = require('awilix');

// Import dependencies
const Config = require('../config');
const App = require('./app');
const Database = require('./infrastructure/database');
const Router = require('./interfaces/http/router');
const Server = require('./interfaces/http/server');

const container = createContainer();

container.register({
  db: asFunction(Database).singleton(),
  app: asFunction(App).singleton(),
  router: asFunction(Router).singleton(),
  server: asFunction(Server).singleton(),
  config: asValue(Config)
});

module.exports = container;

