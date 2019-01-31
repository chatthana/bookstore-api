const { expect } = require('chai');
const { compose } = require('ramda');
const { repository, models } = require('../../factory');
const postUseCase = require('../../../src/app/user/post');


describe('Application => User => POST', () => {

  let useCase;

  describe('Create user', () => {

    beforeEach(done => {

      const mockedRepository = {
        create: (data) => data
      };

      useCase = postUseCase({
        userRepository: mockedRepository
      });
      
      done();
    });

    it('Should successfully created the user with correct information', async () => {
      const body = {
        "email": "pattamawan_lookpla@tripetch-isuzu.com",
        "username": "lookpla001",
        "name": "Pattamawan",
        "surname": "Sangkaphan",
        "password": "secret",
        "date_of_birth": "1989/07/15"
      };

      const user = await useCase.create({ requestBody: body });

      expect(user.name).to.equal(body.name);
      expect(user.surname).to.equal(body.surname);
      expect(user.passwordHash).to.not.be.null;
      expect(user.passwordSalt).to.not.be.null;
      expect(user.email).to.equal(body.email);
      expect(user.date_of_birth).that.equal(body.date_of_birth);
    })
  });
});