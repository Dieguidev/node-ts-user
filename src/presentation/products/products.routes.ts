import { Router } from "express";
import { ProductController } from "./products.controlles";
import { ProductService } from "../services/product.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class ProductRoutes {

  static get routes(): Router {

    const router = Router();

    const productService = new ProductService();

    const controller = new ProductController(productService);

    // Definir las rutas
    router.post('/',[AuthMiddleware.validateJWT], controller.createProduct);

    router.get('/', controller.getAllProducts);

    return router;
  }



}
