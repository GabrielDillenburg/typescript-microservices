import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../test/setup'

process.env.JWT_KEY = 'any_key'

it('response with details about the current user', async () => {
  const cookie = await signin()

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)
  expect(response.body.currentUser.email).toEqual('test@test.com')
})
