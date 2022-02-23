import { NextFunction, Request, Response } from 'express'
import { RequestValidationError, DatabaseConnectionError } from '../errors/index'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const errorHandler = (
  err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RequestValidationError) {
    console.log('handling this error as a request validation error')
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('handling this error as a database connection error')
  }

  res.status(400).send({
    message: err.message
  })
}
