import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../test/setup'
import mongoose from 'mongoose'

it('returns a 404 if the provided id does not exist', async () => {
  const cookie = signin()
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Some title',
      price: 300
    })
    .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'Some title',
      price: 300
    })
    .expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
  const cookie = signin()
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Some title',
      price: 300
    })

  const newCookie = signin()
  await request(app)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', newCookie)
    .send({
      title: 'Update title',
      price: 300
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = signin()
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Some title',
      price: 300
    })

  await request(app)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: -10
    })
    .expect(400)
})

it('updates the ticket provided valid inputs', async () => {

})
