import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)
