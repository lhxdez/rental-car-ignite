import { Router } from 'express'
import uploadConfig from '../../../../config/upload'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController'
import multer from 'multer'

export const carsRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadAvatar.array('images'),
  uploadCarImagesController.handle,
)
