import { getRepository, Repository } from 'typeorm'
import { Specification } from '../../entities/Speceification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository'

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
