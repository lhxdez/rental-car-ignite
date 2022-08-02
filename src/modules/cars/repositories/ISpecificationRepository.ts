import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}
