import { CustomError } from '../protocols/custom-error'

export class NotAuthorizedError extends CustomError {
  statusCode = 401

  constructor () {
    super('Not authorized')

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors (): any {
    return [{ message: 'Not authorized' }]
  }
}
