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
    const specification = this.repository.findOne({
      where: {
        name: name,
      },
    })

    return specification
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)
  }
}
