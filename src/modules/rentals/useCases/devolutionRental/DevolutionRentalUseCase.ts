import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

interface IRequest {
  id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    const minimum_daily = 1

    if (!rental) {
      throw new AppError('Rental does not exists!')
    }

    const dateNow = dayjs().toDate()

    const end_date_utc = dayjs(dayjs().toDate()).utc().local().format()

    const start_date_utc = dayjs(rental.start_date).utc().local().format()

    let daily = dayjs(end_date_utc).diff(start_date_utc, 'days')

    if (daily <= 0) {
      daily = minimum_daily
    }

    const delay = dayjs(rental.expected_return_date).diff(dateNow, 'days')

    let total = 0

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    rental.end_date = dayjs().toDate()
    rental.total = total

    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
