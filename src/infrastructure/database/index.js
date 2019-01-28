const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const db = mongoose.connect('mongodb://localhost:27017/bookstore-api', {
    useNewUrlParser: true
  });

  const models = {};

  const baseDirectory = path.resolve(__dirname, './models');

  fs.readdirSync(baseDirectory).forEach(file => {
    const modelDirectory = path.resolve(baseDirectory, file);
    const model = require(modelDirectory);
    console.log(model.modelName);
    models[model.modelName] = model;
  });

  return {
    db,
    models
  };

}