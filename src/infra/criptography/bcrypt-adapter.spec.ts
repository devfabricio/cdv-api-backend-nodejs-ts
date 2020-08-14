import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { Encrypter } from '../../data/protocols/encrypter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const makeSut = (): Encrypter => {
  const salt = 12
  return new BcryptAdapter(salt)
}

describe('Bcrypter Adapter', () => {
  test('Should BcrypterAdapter calls Bcrypter with correct value', async () => {
    const salt = 12
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toBeCalledWith('any_value', salt)
  })
  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toEqual('hash')
  })
})
