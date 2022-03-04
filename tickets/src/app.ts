import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@gdmtech/common'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.all('*', async (_req, _res): Promise<void> => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
