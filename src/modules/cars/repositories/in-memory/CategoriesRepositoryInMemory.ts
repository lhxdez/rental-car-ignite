import { Category } from '@modules/cars/entities/Category'
import { ICategoryRepository, ICreateCategoryDTO } from '../ICategoryRepository'

export class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)

    return category
  }
  async list(): Promise<Category[]> {
    const all = this.categories

    return all
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }
}
