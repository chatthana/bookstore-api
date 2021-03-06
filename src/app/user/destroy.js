module.exports = ({ userRepository }) => {
  const destroy = ({ guid }) => {
    return Promise
      .resolve()
      .then(() => {
        return userRepository.destroy({ guid })
      }).catch(error => {
        throw new Error(error);
      });
  }

  return {
    destroy
  }
}