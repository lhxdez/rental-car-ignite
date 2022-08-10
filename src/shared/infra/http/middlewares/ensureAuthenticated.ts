import auth from '@config/auth'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token Missing!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload

    const usersRepository = new UsersTokensRepository()

    const user = await usersRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    )

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    req.user = {
      id: user_id,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}
