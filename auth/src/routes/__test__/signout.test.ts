import request from 'supertest'
import { app } from '../../app'
process.env.JWT_KEY = 'any_key'

it('clears the cookie after signin out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signout')
    .send({ })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
