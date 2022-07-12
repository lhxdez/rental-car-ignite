import { AppError } from '../../../../errors/AppErrors'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUsersUseCase } from '../createUser/CreateUsersUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRpositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUsersUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRpositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRpositoryInMemory,
    )
    createUserUseCase = new CreateUsersUseCase(usersRpositoryInMemory)
  })

  it('Should be able to auth an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '12312323',
      email: 's@email.com',
      password: 'fgrgf',
      name: 'Test User',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '12312323',
        email: 's@email.com',
        password: '1234',
        name: 'Test User',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'Incorrect',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
