import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  group: string
  country: any
  role: number
  status: number
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
