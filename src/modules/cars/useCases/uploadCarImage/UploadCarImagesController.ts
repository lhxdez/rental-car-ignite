import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface IFiles {
  filename: string
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const images = req.files as IFiles[]

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

    const fileNames = images.map(file => file.filename)

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name: fileNames,
    })

    return res.status(201).send()
  }
}
