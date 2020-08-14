import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  encrypter: Encrypter
  addAccountRepository: AddAccountRepository
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncrypter()
  const addAccountRepository = makeAddAccountRepository()
  return {
    encrypter: encrypter,
    addAccountRepository: addAccountRepository,
    sut: new DbAddAccount(encrypter, addAccountRepository)
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
  test('Should throw if Encrypter throws', async () => {
    const { encrypter, sut } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
      return reject(new Error())
    }))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      group: 'valid_id',
      country: {},
      role: 10,
      status: 1
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepository, sut } = makeSut()
    const addAccountRepositorySpy = jest.spyOn(addAccountRepository, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'hashed_password',
      group: 'valid_id',
      country: {},
      role: 10,
      status: 1
    }
    await sut.add(accountData)
    expect(addAccountRepositorySpy).toHaveBeenCalledWith(accountData)
  })
  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepository, sut } = makeSut()
    jest.spyOn(addAccountRepository, 'add').mockReturnValueOnce(new Promise((resolve, reject) => {
      return reject(new Error())
    }))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      group: 'valid_id',
      country: {},
      role: 10,
      status: 1
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
