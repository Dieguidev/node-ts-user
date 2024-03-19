import { Request, Response } from "express";
import { CustomError } from "../../domain";




export class CategoryController {

  // DI
  constructor(
  ) { }

  //metodo para manejo de errores enviados desde el AuthSerevice
  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }




  createCategory = async (req: Request, res: Response) => {
    res.json('crear categoria')
  }


  getAllCategories = async (req: Request, res: Response) => {
    res.json('get categoria')
  }





}
