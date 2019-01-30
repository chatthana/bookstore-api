module.exports = ({ userRepository, tokeniser }) => {

  const validate = ({ requestBody }) => {

    return new Promise(async (resolve, reject) => {
      try {
        const { username, password } = requestBody;

        const user = await userRepository.getOne({ username });

        const isPasswordValid = userRepository.validatePassword(password, user.passwordHash, user.passwordSalt);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials, please try again with different ones');
        }

        resolve(tokeniser.generate({
          guid: user.guid,
          name: user.name,
          surname: user.surname,
          email: user.email
        }));
      } catch (error) {
        reject(error);
      }
    });

  }

  return {
    validate
  }
}