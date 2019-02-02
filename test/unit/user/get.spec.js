const { expect } = require('chai');
const { compose } = require('ramda');
const uuid = require('uuid/v4');
const { repository, models } = require('../../factory');
const getUseCase = require('../../../src/app/user/get');
const userRepository = require('../../../src/infrastructure/repositories/user');
const orderRepository = require('../../../src/infrastructure/repositories/order');

const tokeniser = app.resolve('tokeniser');

describe('Application => User => GET', () => {

  let _token;
  let _decodedUser;

  const userUseCase = compose(
    repository(userRepository),
    models
  )('User');

  const orderUseCase = compose(
    repository(orderRepository),
    models
  )('Order');

  const appGetUseCase = getUseCase({
    userRepository: userUseCase,
    orderRepository: orderUseCase
  });

  describe('Retrieve the users successfully', () => {

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
      
      userUseCase.destroy({})
      .then(() => {
        return userUseCase.create(userObject);
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
        _decodedUser = tokeniser.verify(_token);
        expect(_decodedUser).to.have.own.property('email');
        expect(_decodedUser).to.have.own.property('name');
        expect(_decodedUser).to.have.own.property('surname');
        expect(_decodedUser).to.have.own.property('guid');
        done();
      });

      it('Should get the current user with the book list they ordered', done => {
        _decodedUser = tokeniser.verify(_token);
        appGetUseCase.get({ guid: _decodedUser.guid })
        .then(user => {
          console.log(typeof user.books);
          expect(user.name).to.equal(_decodedUser.name);
          expect(user.surname).to.equal(_decodedUser.surname);
          expect(user.email).to.equal(_decodedUser.email);
          expect(user.books instanceof Array).to.be.true;
          done();
        });
      });
    });
  });

  describe('Unsuccessfully get the users', () => {
  });
  
});