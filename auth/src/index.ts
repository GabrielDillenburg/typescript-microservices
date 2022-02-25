import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import { currentuserRouter, signoutRouter, signinRouter, signupRouter } from './routes/index'
import { errorHandler } from './middlewares/error-handler'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true)
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
app.use(json())
app.use(currentuserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(errorHandler)

const start = async (): Promise<void> => {
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
