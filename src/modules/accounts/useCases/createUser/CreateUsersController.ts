import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUsersUseCase } from './CreateUsersUseCase'

export class CreateUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, driver_license, email } = req.body

    const createUsersUseCase = container.resolve(CreateUsersUseCase)

    await createUsersUseCase.execute({
      name,
      password,
      driver_license,
      email,
    })

    return res.status(201).send()
  }
}
