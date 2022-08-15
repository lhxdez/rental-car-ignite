import uploadConfig from '../../../../config/upload'
import { Router } from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { CreateUsersController } from '@modules/accounts/useCases/createUser/CreateUsersController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController'

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUsersController = new CreateUsersController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUsersController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)
