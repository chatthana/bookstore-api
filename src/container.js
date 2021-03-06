const { createContainer, asFunction, asValue } = require('awilix');

// Import dependencies
const Config = require('../config');
const App = require('./app');
const Database = require('./infrastructure/database');
const Cache = require('./infrastructure/cache');
const Router = require('./interfaces/http/router');
const Server = require('./interfaces/http/server');
const Tokeniser = require('./infrastructure/tokeniser');
const Authenticator = require('./interfaces/http/middlewares/auth');

const container = createContainer();

container.register({
  db: asFunction(Database).singleton(),
  cache: asFunction(Cache).singleton(),
  app: asFunction(App).singleton(),
  router: asFunction(Router).singleton(),
  server: asFunction(Server).singleton(),
  tokeniser: asFunction(Tokeniser).singleton(),
  authenticator: asFunction(Authenticator).singleton(),
  config: asValue(Config)
});

module.exports = container;

