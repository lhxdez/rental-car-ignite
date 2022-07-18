import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppErrors'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Desc',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand Name',
      category_id: 'Category Id',
    })

    expect(car).toHaveProperty('id')
  })

  it('Should not be able to create a car with an existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Name',
        description: 'Car Desc',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand Name',
        category_id: 'Category Id',
      })

      await createCarUseCase.execute({
        name: 'Car Name2',
        description: 'Car Desc',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand Name',
        category_id: 'Category Id',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Desc',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand Name',
      category_id: 'Category Id',
    })

    expect(car.available).toBe(true)
  })
})
