import auth from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface IPayload {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      )

    if (!userToken) {
      throw new AppError('Refresh token does not exist!')
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const expires_date = dayjs()
      .add(auth.expires_refresh_token_days, 'days')
      .toDate()

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    })

    await this.usersTokensRepository.create({
      refresh_token,
      user_id,
      expires_date,
    })

    return refresh_token
  }
}
