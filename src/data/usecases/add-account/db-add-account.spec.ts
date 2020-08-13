import { AddAccount } from '../../../domain/usecases/add-account'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  encrypter: Encrypter
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncrypter()
  return {
    encrypter: encrypter,
    sut: new DbAddAccount(encrypter)
  }
}

describe('DBAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypter, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      group: 'valid_id',
      country: {},
      role: 10,
      status: 1
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
