import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@gdmtech/common'
import { body } from 'express-validator'

const router = express.Router()

router.post('/api/tickets', requireAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('Price').isFloat({ gt: 0 }).isEmpty().withMessage('Price is required and greater than zero')
], validateRequest, (req: Request, res: Response) => {
  res.sendStatus(200)
})

export { router as createTicketRouter }
