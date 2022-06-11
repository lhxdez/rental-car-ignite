import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { CreateCategoryUseCase } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/post-category", (req, res) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/list-categories", (req, res) => {
    return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };