import { container } from 'tsyringe'
import 'reflect-metadata'
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository'

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
