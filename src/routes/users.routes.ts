import uploadConfig from '../config/upload'
import { Router } from 'express'
import multer from 'multer'
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { CreateUsersController } from '@modules/accounts/useCases/createUser/CreateUsersController'

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUsersController = new CreateUsersController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUsersController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)
