import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


export const categoriesRepository = CategoriesRepository.getInstance();

export const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

export const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);