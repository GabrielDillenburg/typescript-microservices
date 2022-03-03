import { CustomError } from '../protocols/custom-error'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = 'Error connecting to database!'
  constructor () {
    super('error database connection')
    // only because we are extending a built in class:
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors (): any {
    return { message: this.reason }
  }
}
