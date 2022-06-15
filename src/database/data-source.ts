import 'reflect-metadata'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'soul-of-cinder',
  synchronize: false,
  logging: false,
  entities: [],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
})

export function createConnection(host = 'soul-of-cinder'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
