import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '@modules/cars/repositories/ISpecificationRepository'
import { getRepository, Repository } from 'typeorm'

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name: name,
      },
    })

    return specification
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)

    return specifications
  }
}
