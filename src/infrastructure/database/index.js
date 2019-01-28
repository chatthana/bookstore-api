const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = ({ config }) => {
  const db = mongoose.connect(config.db.mongodb.uri, {
    useNewUrlParser: true
  });

  const models = {};

  const baseDirectory = path.resolve(__dirname, './models');

  fs.readdirSync(baseDirectory).forEach(file => {
    const modelDirectory = path.resolve(baseDirectory, file);
    const model = require(modelDirectory);
    models[model.modelName] = model;
  });

  return {
    db,
    models
  };

}