module.exports = ({ server, authenticator }) => {
  return {
    start: () =>
      Promise.resolve()
      .then(server.run)
  }
};