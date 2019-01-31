const chai = require('chai')
const container = require('../src/container')
const config = container.resolve('config')

global.expect = chai.expect;
global.app = container;
global.config = config;

