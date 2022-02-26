import mongoose from 'mongoose'
import { app } from './app'

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
