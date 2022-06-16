import { AppError } from '../../../../errors/AppErrors'
import { inject, injectable } from 'tsyringe'
import { ICategoryRepository } from '../../repositories/ICategoryRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    )

    if (categoryAlreadyExists) {
      throw new AppError('Category Already Exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}
