import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../test/setup'

it('has a router handler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})

  expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is singed in', async () => {
  await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
})

it('returns an status other than 401 if user is singed in', async () => {
  const cookie = signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({})
  console.log(response.status)
  expect(response.status).not.toEqual(401)
})

it('returns an error if an invelid title is provided', async () => {

})

it('returns an error if an invelid price is provided', async () => {

})

it('creates a ticket with valid inputs', async () => {

})
