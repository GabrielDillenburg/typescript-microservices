import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import { currentuserRouter, signoutRouter, signinRouter, signupRouter } from './routes/index'
import { errorHandler } from './middlewares/error-handler'
import cookieSession from 'cookie-session'
import { NotFoundError } from './errors/handlers/not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
app.use(currentuserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.all('*', async (_req, _res): Promise<void> => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async (): Promise<void> => {
  if (!process.env.JWT_KEY) {
    throw new Error(' JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('mongodb connected')
  } catch (error) {
    console.error(error)
  }
}

app.listen(3000, () => {
  console.log('listening on http://localhost:3000!!')
})

void start()
