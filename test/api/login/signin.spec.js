/* eslint-env mocha */
const { compose } = require('ramda');
const uuid = require('uuid/v4');
const { models, repository } = require('../../factory');
const userRepository = require('../../../src/infrastructure/repositories/user');
const post = require('../../../src/app/login/post');

describe('Signin', () => {

  const UserUseCase = compose(
    repository(userRepository),
    models
  )('User')

  const LoginUseCase = post({ userRepository: UserUseCase, tokeniser: app.resolve('tokeniser') })

  let userCreationRequest = {
    guid: uuid(),
    name: 'test001',
    surname: 'testsuite',
    email: 'test@dummy.com',
    passwordHash: '5f3d69afd8e41dfc3b2e4f6ff57363c33fa170303c7fc979eba5b8847b1ab910cd89aa39795bba2b356638c5abd2622ab8db1fd3b0231c31749b1e3e3bc98527',
    passwordSalt: '58277141136a9fced3e8ca9baa6b23ff36bfeb713aa30282fec058b8118ecb06996695bfcaed7b1a5ecc7b460a4c98d2a85b6c282e31bb8174c71f04e54ca14f',
    username: 'test001x',
    date_of_birth: '2019/01/01'
  };

  beforeEach((done) => {
    // we need to add user before we can request our token
    UserUseCase
      .destroy({})
      .then(() =>
        UserUseCase.create(userCreationRequest)
      ).then(() => done())
  })

  describe('POST to Login (Authentication)', () => {
    it('Should get the token', async () => {
      const body = {
        username: userCreationRequest.username,
        password: 'secret'
      };

      const response = await LoginUseCase.validate({ requestBody: body });
      expect(response).to.be.not.null;
    });

    it('Should return Unauthorised on invalid request', async () => {
      const body = {
        username: userCreationRequest.username,
        password: 'secretxxx'
      };

      let _err;

      try {
        const response = await LoginUseCase.validate({ requestBody: body });
      } catch(exception) {
        _err = exception.message;
      }

      expect(_err).to.equal('Invalid credentials, please try again with different ones');
    })
  });
})