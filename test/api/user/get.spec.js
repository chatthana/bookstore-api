const { compose } = require('ramda');
const { models, repository } = require('../../factory');
const userRepository = require('../../../src/infrastructure/repositories/user');

console.log(models('User'), 'Model');

describe('GET Current User', () => {
  const BASE_URI = `/api/v${config.version}`;

  const UserUseCase = compose(
    repository(userRepository),
    models
  )('User');

  console.log(UserUseCase, 'use case');

  const tokeniser = app.resolve('tokeniser');
  let token;

  beforeEach((done) => {
    // we need to add user before we can request our token
    UserUseCase
      .destroy({})
      .then(() =>
        UserUseCase.create({
          name: 'test001',
          guid: uuid(),
          surname: 'testcase',
          username: 'test001',
          email: 'test@test.com',
          passwordHash: '5e842175cd521bf6c17b75e3bcb5ee542afc7c463441730767d724b966aec6c2bf02ab54dabf24c865997a3acf46f7cb694f502c571b06d5ff9ba7a850807834',
          passwordSalt: '2ec73bd6e75899e111d6207d383282a2d5cc77e31af27beae7ecdd41b95922a29e56c9cd9689c3a6c36d4f6b2a93371827106e6e300439857bca0dd062b40f9e',
          date_of_birth: '1989/08/11'
        })
      ).then((user) => {
        token = 
          tokeniser.generate({
            guid: user.guid,
            name: user.name,
            surname: user.surname,
            email: user.email
        });
        done();
      })
  })

  describe('Should return users', () => {
    it('should return all users', (done) => {
      request.get(`${BASE_URI}/users`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).to.have.length(2)
        done(err)
      })
    })

    it('should return unauthorized if no token', (done) => {
      request.get(`${BASE_URI}/users`)
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.equals('Unauthorized')
        done(err)
      })
    })
  })
})