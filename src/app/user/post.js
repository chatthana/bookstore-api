const UserEntity = require('../../domain/user');
const hasher = require('../../infrastructure/encryption/hasher');
const uuid = require('uuid/v4');

module.exports = ({ userRepository }) => {
  const create = ({ requestBody }) => {
    return Promise
      .resolve()
      .then(() => {
        const hashResult = hasher(requestBody.password);
        requestBody.guid = uuid();
        requestBody.passwordHash = hashResult.hashed;
        requestBody.passwordSalt = hashResult.salt;
        const entity = UserEntity(requestBody);
        return userRepository.create(entity);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  return {
    create
  }
};