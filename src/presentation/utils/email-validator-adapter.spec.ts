import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter',() => {
  test('Should return false if EmailValidator returns false',() => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })
  test('Should return true if EmailValidator returns true',() => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })
  test('Should call EmailValidator with correct data',() => {
    const sut = new EmailValidatorAdapter()
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(validatorSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
