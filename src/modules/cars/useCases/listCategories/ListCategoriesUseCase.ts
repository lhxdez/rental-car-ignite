import { Category } from '../../entities/Category'
import { ICategoryRepository } from '../../repositories/ICategoryRepository'

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list()

    return categories
  }
}
