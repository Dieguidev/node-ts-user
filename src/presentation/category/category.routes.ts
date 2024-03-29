import { Router } from 'express';

import { envs } from '../../config/envs';
import { CategoryController } from './category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';




export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();

    const categoryService = new CategoryService()

    const controller = new CategoryController(categoryService);

    // Definir las rutas
    router.post('/',[AuthMiddleware.validateJWT], controller.createCategory );

    router.get('/' ,controller.getAllCategories );




    return router;
  }


}
