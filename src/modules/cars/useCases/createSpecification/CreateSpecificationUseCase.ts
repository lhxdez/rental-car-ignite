import { inject, injectable } from 'tsyringe'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

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

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationRepository.findByName(
      name,
    )

    if (specificationAlreadyExists) {
      throw new Error('Specification Already Exists!')
    }

    this.specificationRepository.create({
      name,
      description,
    })
  }
}
