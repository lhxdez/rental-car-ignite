import createCategoryController from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'

import { Router } from 'express'
import multer from 'multer'
const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post('/post-category', (req, res) => {
  return createCategoryController().handle(req, res)
})

categoriesRoutes.get('/list-categories', (req, res) => {
  return listCategoriesController.handle(req, res)
})

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
