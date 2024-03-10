import { Request, Response } from "express";



export class AuthController {

  // DI
  constructor(){}



  loginUser = (req: Request, res: Response) => {
    res.json('loginUser')
  }



  registerUser = (req: Request, res: Response) => {
    res.json('registerUser')
  }



  validateEmail = (req: Request, res: Response) => {
    res.json('validateEmail')
  }

}
