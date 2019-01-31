const redis = require('redis');

module.exports = ({ config }) => {

  const client = redis.createClient(config.cache.redis.uri);

  return client;

}