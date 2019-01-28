const { createContainer, asFunction, asValue } = require('awilix');

// Import dependencies
const Config = require('../config');
const Database = require('./infrastructure/database');

const container = createContainer();

container.register({
  db: asFunction(Database).singleton(),
  config: asValue(Config)
});

module.exports = container;

