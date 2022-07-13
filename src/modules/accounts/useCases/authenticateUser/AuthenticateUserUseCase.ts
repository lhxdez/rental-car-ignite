import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@errors/AppErrors'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    email: string
    name: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, '8c2efd7ca4af720addf5f6ca15fe300d', {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }

    return tokenReturn
  }
}
