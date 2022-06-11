import   { Router } from 'express';
import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

export const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (req, res) => {
    const { name, description } = req.body;

    const createSpecificationService = new CreateSpecificationService(specificationRepository);

    createSpecificationService.execute({ name, description });

    return res.status(201).send();
});