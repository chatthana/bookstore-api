const toEntity = require('../../../domain/user');
const { comparePassword } = require('../../encryption/password');

module.exports = model => {

  const getOne = (...args) => {
    return model.findOne(...args)
      .then(user => {
        return toEntity(user);
      }).catch(error => {
        throw new Error(error);
      });
  }

  const create = (...args) => {
    return model.create(...args)
      .then(createdUser => {
        return toEntity(createdUser);
      }).catch(error => {
        throw new Error(error);
      });
  }

  const destroy = (...args) => {
    return model.remove(...args);
  }

  const validatePassword = (password, encodedPassword, salt) =>
    comparePassword(password, encodedPassword, salt);

  return {
    getOne,
    create,
    destroy,
    validatePassword
  }
}