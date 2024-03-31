import { Router } from 'express';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddlewar } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';





export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();

    const filuploadService = new FileUploadService();
    const controller = new FileUploadController(filuploadService);


    router.use(FileUploadMiddlewar.constainFiles);
    router.use(TypeMiddleware.vaildTypes(['users', 'products', 'categories']));
    // Definir las rutas
    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type' ,controller.uploadMultipleFile );




    return router;
  }


}
