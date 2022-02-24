import { ValidationError } from 'express-validator'
import { CustomError } from '../protocols/custom-error'

export class RequestValidationError extends CustomError {
  statusCode: 400
  constructor (public errors: ValidationError[]) {
    super('Invalid request parameters')

    // only because we are extending a built in class:
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors (): any {
    return this.errors.map(err => {
      return { message: err.msg, fied: err.param }
    })
  }
}
