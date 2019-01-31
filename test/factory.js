const { curry } = require('ramda')

const models = (name) => app.resolve('db').models[name];

const repository = curry((repo, model) => {
  return repo(model);
})

module.exports = {
  models,
  repository
}