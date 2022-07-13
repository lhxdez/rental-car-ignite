import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { AppError } from '@shared/errors/AppErrors'

@injectable()
export class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists!')
    }

    const passwordHash = await hash(password, 11)

    await this.usersRepository.create({
      name,
      password: passwordHash,
      driver_license,
      email,
    })
  }
}
