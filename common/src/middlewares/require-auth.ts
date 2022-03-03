import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors'

export const requireAuth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  next()
}
