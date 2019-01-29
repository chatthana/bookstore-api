const { compose } = require('ramda');
const { models, repository } = require('../factory');
const userRepository = require('../../src/infrastructure/repositories/user');
const uuid = require('uuid/v4');

describe('Route => Authentication (Login)', () => {

  const URI = `/api/v${config.apiVersion}`;

  const userUseCase = compose(repository(userRepository), models)('users');

  beforeEach(done => {
    userUseCase.remove({})
    .then(() => {
      userUseCase.create({
        name: 'test001',
        guid: uuid(),
        surname: 'testcase',
        username: 'test001',
        email: 'test@test.com',
        passwordHash: '5e842175cd521bf6c17b75e3bcb5ee542afc7c463441730767d724b966aec6c2bf02ab54dabf24c865997a3acf46f7cb694f502c571b06d5ff9ba7a850807834',
        passwordSalt: '2ec73bd6e75899e111d6207d383282a2d5cc77e31af27beae7ecdd41b95922a29e56c9cd9689c3a6c36d4f6b2a93371827106e6e300439857bca0dd062b40f9e',
        date_of_birth: '1989/08/11'
      }).then(() => {
        done();
      });
    });
  });

  describe('[POST] Login', () => {
    it('should retrieved token', done => {
      console.log('ok')
      request.post(`${URI}/login`)
        .send({
          email: 'test@test.com',
          password: 'secret'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('token')
          done(err)
        });
    });
  });
})