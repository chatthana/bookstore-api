const request = require('supertest')
const chai = require('chai')
const container = require('../src/container')
const server = container.resolve('server')
const config = container.resolve('config')

global.expect = chai.expect;
global.app = container;
global.request = request(server.app);
global.config = config;
