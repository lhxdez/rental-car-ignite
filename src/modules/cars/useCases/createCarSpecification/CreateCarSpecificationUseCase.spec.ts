import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
    )
  })

  it('should not be able to add new specification to a non existing car', async () => {
    expect(async () => {
      const car_id = '1234'
      const specifications_id = ['54321']

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add new specification to the car', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Car Desc',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand Name',
      category_id: 'Category Id',
    })

    const specifications_id = ['54321']

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })
  })
})
