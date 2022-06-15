import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export const categoriesRepository = null

export const listCategoriesUseCase = new ListCategoriesUseCase(
  categoriesRepository,
)

export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
)
