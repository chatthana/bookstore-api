module.exports = ({ userRepository }) => {

  const get = ({ guid }) => {
    return Promise
    .resolve()
    .then(() => {
      return userRepository.getOne({ guid }, { passwordHash: 0, passwordSalt: 0 });
    }).catch(error => {
      throw new Error(error);
    });
  }

  return {
    get
  }
};