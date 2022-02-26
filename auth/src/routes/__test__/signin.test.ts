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

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: 'other_password'
    })
    .expect(400)
})

it('reponse with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: 'password'
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
