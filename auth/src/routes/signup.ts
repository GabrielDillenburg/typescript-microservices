import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError, BadRequestError } from '../errors/index'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be provided'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
], async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const { email, password } = req.body
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = User.build({ email, password })
  await user.save()

  // Generate JWT
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  },
  process.env.JWT_KEY
  )

  // Store it on session object
  req.session = {
    jwt: userJwt
  }
  console.log(req.session)

  res.status(201).send(user)
})

export { router as signupRouter }
