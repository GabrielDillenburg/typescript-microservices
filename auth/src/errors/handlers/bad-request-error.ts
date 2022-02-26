import { CustomError } from '../protocols/custom-error'

export class BadRequestError extends CustomError {
  statusCode = 400

  constructor (public message: string) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors (): any {
    return [{ message: this.message }]
  }
}
