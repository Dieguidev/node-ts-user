import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryService } from "../services/category.service";




export class CategoryController {

  // DI
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  //metodo para manejo de errores enviados desde el Service
  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }




  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoryService.createCategory(createCategoryDto!, req.body.user)
      .then(category => res.status(201).json(category))
      .catch(error => this.handleError(error, res));


  }


  getAllCategories = async (req: Request, res: Response) => {
    this.categoryService.getAllCategories()
      .then(categories => res.status(200).json(categories))
      .catch(error => this.handleError(error, res));

  }
}






