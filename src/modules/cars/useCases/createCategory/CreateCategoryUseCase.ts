import { AppError } from '@shared/errors/AppErrors'
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { inject, injectable } from 'tsyringe'
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
