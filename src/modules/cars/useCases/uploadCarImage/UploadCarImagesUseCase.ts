import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImageRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async image => {
      await this.carsImageRepository.create(car_id, image)
      await this.storageProvider.save(image, 'cars')
    })
  }
}
