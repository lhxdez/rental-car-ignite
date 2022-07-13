import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { inject, injectable } from 'tsyringe'
import { Category } from '../../infra/typeorm/entities/Category'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}
