import request from 'supertest'
import app from '../app'

describe('Backend validation middleware', () => {
  test('POST /api/v1/auth/register rejects invalid body', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'J', email: 'not-an-email', password: '1' })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })

  test('POST /api/v1/auth/login rejects missing email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ password: 'somepassword' })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })

  test('POST /api/v1/support rejects invalid body without message', async () => {
    const response = await request(app)
      .post('/api/v1/support')
      .send({ name: 'Ana', email: 'ana@example.com' })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })

  test('GET /api/v1/products rejects invalid query params', async () => {
    const response = await request(app)
      .get('/api/v1/products?page=abc&limit=xyz')
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })
})
