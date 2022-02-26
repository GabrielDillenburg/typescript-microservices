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
