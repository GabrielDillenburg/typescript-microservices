import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../test/setup'

const createTicket = async (): Promise<any> => {
  const cookie = signin()
  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Some Title',
      price: 200
    })
}

it('can fetch a list of tickets', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

  expect(response.body.length).toEqual(3)
})
