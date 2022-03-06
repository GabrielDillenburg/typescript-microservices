/* eslint-disable @typescript-eslint/no-misused-promises */
import { NotFoundError, validateRequest, requireAuth, NotAuthorizedError } from '@gdmtech/common'
import express, { Request, Response } from 'express'
import { Ticket } from '../models/tickets'
import { body } from 'express-validator'

const router = express.Router()

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
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
