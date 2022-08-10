import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import auth from '@config/auth'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'

dayjs.extend(utc)

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Users does not exists')
    }

    const token = uuidV4()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: dayjs().add(3, 'hours').toDate(),
    })

    await this.etherealMailProvider.sendMail(
      email,
      'key rec',
      `o link é ${token}`,
      '',
    )
  }
}
