import { AppError } from '@errors/AppErrors'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification Already Exists!')
    }

    await this.specificationRepository.create({
      name,
      description,
    })
  }
}
