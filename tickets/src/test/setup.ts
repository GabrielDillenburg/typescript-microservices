import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, { })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

export const signin = (): [string] => {
  // build a JWT payload. { id, email }
  const payload = {
    id: 'any_id',
    email: 'test@example.com'
  }

  // create JWT token
  const token = jwt.sign(payload, process.env.JWT_KEY)

  // build session Objetc { jwt: MY_JTW }
  const session = { jwt: token }

  // turn the session into JSONWEBTOKEN
  const sessionJSON = JSON.stringify(session)

  // encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`]
}
