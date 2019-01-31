const toEntity = require('../../../domain/user');
const { comparePassword } = require('../../encryption/password');

module.exports = model => {

  const getOne = (...args) => {
    return model.findOne(...args)
      .then(user => {
        if (!user) throw new Error('Unable to find the user');
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
    return model.deleteMany(...args);
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