const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const deleteUsecase = require('../../../src/app/user/destroy')

use(sinonChai)

describe('App => User => DELETE', () => {
  let useCase
  let method

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: () => {}
      }

      method = sinon.spy(MockRepository, 'destroy')
      useCase = deleteUsecase({
        userRepository: MockRepository
      })
    })

    it('should have called delete method of userRepository', async () => {
      await useCase.destroy({ id: 1999 })
      expect(method).to.have.been.called
    })
  });
})