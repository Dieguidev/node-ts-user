import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";




export class CategoryController {

  // DI
  constructor(
  ) { }

  //metodo para manejo de errores enviados desde el Service
  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }




  createCategory = async (req: Request, res: Response) => {
    // const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    // if(error) return res.status(400).json({error});

    // res.json(createCategoryDto);
    res.json(req.body)
  }


  getAllCategories = async (req: Request, res: Response) => {
    res.json('get categoria')
  }





}
