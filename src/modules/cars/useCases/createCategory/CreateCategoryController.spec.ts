import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { Connection } from 'typeorm'
import createConnection from '@shared/infra/typeorm'
import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

let connection: Connection

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = uuid()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
          values('${id}', 'admin', 'admin@rental.com.br', '${password}', true, 'now()', 'XXXXXX')
        `,
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rental.com.br', password: 'admin' })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories/post-category')
      .send({
        name: 'Cat supertest',
        description: 'cat desc',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create an existing category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rental.com.br', password: 'admin' })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories/post-category')
      .send({
        name: 'Cat supertest',
        description: 'cat desc',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(400)
  })
})
