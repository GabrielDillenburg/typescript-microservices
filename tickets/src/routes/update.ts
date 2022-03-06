/* eslint-disable @typescript-eslint/no-misused-promises */
import { NotFoundError, validateRequest, requireAuth, NotAuthorizedError } from '@gdmtech/common'
import express, { Request, Response } from 'express'
import { Ticket } from '../models/tickets'
import { body } from 'express-validator'

const router = express.Router()

router.put('/api/tickets/:id', requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFoundError()
  }

  if (ticket.userId !== req.currentUser.id) {
    throw new NotAuthorizedError()
  }

  res.send(ticket)
})

export { router as updateTicketRouter }
