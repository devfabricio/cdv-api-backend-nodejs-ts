import { HttpRequest, HttpResponse, EmailValidator, Controller } from './signup-protocols'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { AddAccount } from '../../../domain/usecases/add-account'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'group', 'country', 'role', 'status']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = this.addAccount.add({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password,
        group: httpRequest.body.group,
        country: httpRequest.body.country,
        role: httpRequest.body.role,
        status: httpRequest.body.status
      })
      return success(account)
    } catch (error) {
      return serverError()
    }
  }
}
