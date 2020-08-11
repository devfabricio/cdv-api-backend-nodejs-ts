export class ServerError extends Error {
  constructor () {
    super('Server internal error')
    this.name = 'ServerError'
  }
}
