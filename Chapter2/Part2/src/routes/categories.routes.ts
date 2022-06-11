import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/post-category", (req, res) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/list-categories", (req, res) => {
    return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };