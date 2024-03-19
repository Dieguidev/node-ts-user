import { Router } from 'express';

import { envs } from '../../config/envs';
import { CategoryController } from './category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';




export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();



    const controller = new CategoryController();

    // Definir las rutas
    router.post('/',[AuthMiddleware.validateJWT], controller.createCategory );

    router.get('/' ,controller.getAllCategories );




    return router;
  }


}
