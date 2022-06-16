import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppErrors'

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
      '8c2efd7ca4af720addf5f6ca15fe300d',
    ) as IPayload

    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    next()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}
