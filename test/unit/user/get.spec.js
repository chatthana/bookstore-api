const { expect } = require('chai');
const { compose } = require('ramda');
const uuid = require('uuid/v4');
const { repository, models } = require('../../factory');
const userRepository = require('../../../src/infrastructure/repositories/user');

const tokeniser = app.resolve('tokeniser');

describe('Application => User => GET', () => {

  const useCase = compose(
    repository(userRepository),
    models
  )('User');

  let _token;

  beforeEach(done => {

    const userObject = {
      guid: uuid(),
      name: 'test001',
      surname: 'testsuite',
      email: 'test@dummy.com',
      passwordHash: '5f3d69afd8e41dfc3b2e4f6ff57363c33fa170303c7fc979eba5b8847b1ab910cd89aa39795bba2b356638c5abd2622ab8db1fd3b0231c31749b1e3e3bc98527',
      passwordSalt: '58277141136a9fced3e8ca9baa6b23ff36bfeb713aa30282fec058b8118ecb06996695bfcaed7b1a5ecc7b460a4c98d2a85b6c282e31bb8174c71f04e54ca14f',
      username: 'test001x',
      date_of_birth: '2019/01/01'
    };
    
    useCase.destroy({})
    .then(() => {
      return useCase.create(userObject);
    }).then(user => {
      _token = tokeniser.generate({
        guid: userObject.guid,
        name: userObject.name,
        surname: userObject.surname,
        email: userObject.email
      });
      done();
    });
  });

  describe('Should return logged in user with correct information', () => {
    it('The decoded JWT must represent the current logged in user', done => {
      let decoded = tokeniser.verify(_token);
      expect(decoded).to.have.own.property('email');
      expect(decoded).to.have.own.property('name');
      expect(decoded).to.have.own.property('surname');
      expect(decoded).to.have.own.property('guid');
      done();
    });
  })
});