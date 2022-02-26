import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
  process.env.JWT_KEY = 'any_key'
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password'
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  process.env.JWT_KEY = 'any_key'
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testexample.com',
      password: 'password'
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  process.env.JWT_KEY = 'any_key'
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'pas'
    })
    .expect(400)
})
