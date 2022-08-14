import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'
import { resolve } from 'path'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/errors/AppError'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as date from '@shared/container/providers/DateProvider/IDateProvider'
import * as mail from '@shared/container/providers/MailProvider/IMailProvider'
dayjs.extend(utc)

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('EtherealMailProvider')
    private etherealMailProvider: mail.IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    )

    if (!user) {
      throw new AppError('User does not exists!')
    }

    const token = uuidV4()

    const expires_date = dayjs().add(3, 'hour').toDate()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    }

    await this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    )
  }
}
