import { SignupController } from './signup'

describe('Signup Controller', () => {
  // Test: No Name provided
  test('Should return 400 if no name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        group: 'any_id',
        country: {},
        role: 10,
        status: 1
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  // Test: No E-mail provided
  test('Should return 400 if no email is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        group: 'any_id',
        country: {},
        role: 10,
        status: 1
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  // Test: No Group provided
  test('Should return 400 if no group is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        country: {},
        role: 10,
        status: 1
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
