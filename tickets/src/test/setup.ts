import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo: any

beforeAll(async () => {
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

export const signin = async (): Promise<string[]> => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie
}
