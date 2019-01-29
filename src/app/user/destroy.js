module.exports = ({ userRepository }) => {
  const destroy = ({ guid }) => {
    return Promise
      .resolve()
      .then(() => {
        return userRepository.destroy({ guid })
      });
  }

  return {
    destroy
  }
}