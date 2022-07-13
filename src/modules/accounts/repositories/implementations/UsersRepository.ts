import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/entities/User'
import { getRepository, Repository } from 'typeorm'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email: email,
      },
    })

    return user
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    })

    await this.repository.save(user)
  }
}
