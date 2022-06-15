import { ICategoryRepository } from '../../repositories/ICategoryRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    )

    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}
