import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export const importCategoryUseCase = new ImportCategoryUseCase();

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);
