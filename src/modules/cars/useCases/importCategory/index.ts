import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ImportCategoryController } from './ImportCategoryController'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

export const categoriesRepository = null

export const importCategoryUseCase = new ImportCategoryUseCase(
  categoriesRepository,
)

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
)
