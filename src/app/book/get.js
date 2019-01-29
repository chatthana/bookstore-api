module.exports = ({ userRepository }) => {
  const all = () => Promise
    .resolve()
    .then(() => {
      return userRepository.getAll();
    }).catch(error => {
      throw new Error(error);
    });
  
  return {
    all
  }
};