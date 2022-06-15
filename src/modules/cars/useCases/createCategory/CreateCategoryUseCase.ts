import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}  

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}


