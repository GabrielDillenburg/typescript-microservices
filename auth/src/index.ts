import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentuserRouter, signoutRouter, signinRouter, signupRouter } from './routes/index'
import { errorHandler } from './middlewares/error-handler'

const app = express()
app.use(json())

app.use(currentuserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('listening on http://localhost:3000!!')
})
