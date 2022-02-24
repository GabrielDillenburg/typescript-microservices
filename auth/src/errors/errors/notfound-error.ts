import { CustomError } from '../protocols/custom-error'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor () {
    super('Route not found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors (): any {
    return [{ message: 'Not Foud' }]
  }
}
