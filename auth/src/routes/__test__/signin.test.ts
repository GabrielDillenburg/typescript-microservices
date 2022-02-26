import request from 'supertest'
import { app } from '../../app'
process.env.JWT_KEY = 'any_key'

it('fails when a email does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: 'password'
    })
    .expect(400)
})
