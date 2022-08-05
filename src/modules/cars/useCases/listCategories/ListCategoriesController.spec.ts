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

  it('should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rental.com.br', password: 'admin' })

    const { token } = responseToken.body

    await request(app)
      .post('/categories/post-category')
      .send({
        name: 'Cat supertest',
        description: 'cat desc',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const response = await request(app).get('/categories/list-categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Cat supertest')
  })
})
