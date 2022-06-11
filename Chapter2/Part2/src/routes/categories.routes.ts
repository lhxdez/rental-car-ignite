import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { CreateCategoryUseCase } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/post-category", (req, res) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/list-categories", (req, res) => {
    const lists = categoriesRepository.list();

    return res.json(lists);
});

export { categoriesRoutes };