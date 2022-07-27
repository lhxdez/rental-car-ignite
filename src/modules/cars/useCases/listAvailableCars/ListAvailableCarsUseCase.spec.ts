import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'desc',
      daily_rate: 100,
      license_plate: 'ABC-100',
      fine_amount: 50,
      brand: 'car_brand',
      category_id: 'cate_id',
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'desc',
      daily_rate: 100,
      license_plate: 'ABC-100',
      fine_amount: 50,
      brand: 'car_brand_test',
      category_id: 'cate_id',
    })

    const cars = await listCarsUseCase.execute({
      brand: 'car_brand_test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1_test',
      description: 'desc',
      daily_rate: 100,
      license_plate: 'ABC-100',
      fine_amount: 50,
      brand: 'car_brand_test',
      category_id: 'cate_id',
    })

    const cars = await listCarsUseCase.execute({
      name: 'Car1_test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1_test',
      description: 'desc',
      daily_rate: 100,
      license_plate: 'ABC-100',
      fine_amount: 50,
      brand: 'car_brand_test',
      category_id: 'cate_id_test',
    })

    const cars = await listCarsUseCase.execute({
      category_id: 'cate_id_test',
    })

    expect(cars).toEqual([car])
  })
})
