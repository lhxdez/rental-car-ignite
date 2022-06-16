import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'

import { Router } from 'express'
import multer from 'multer'
const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/post-category', createCategoryController.handle)

categoriesRoutes.get('/list-categories', listCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
)

export { categoriesRoutes }
