import { Router } from "express";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/post-category", (req, res) => {
    const { name, description } = req.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if(categoryAlreadyExists) {
        return res.status(400).json({ error : "Category already exists!" });
    }

    categoriesRepository.create({name, description});

    return res.status(201).send();
});

categoriesRoutes.get("/list-categories", (req, res) => {
    const lists = categoriesRepository.list();

    return res.json(lists);
});

export { categoriesRoutes };