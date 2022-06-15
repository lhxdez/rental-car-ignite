import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


export const specificationRepository = new SpecificationRepository();

export const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);

export const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);