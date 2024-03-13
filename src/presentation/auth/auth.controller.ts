import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";



export class AuthController {

  // DI
  constructor(
    public readonly authService: AuthService
  ) { }

    //metodo para manejo de errores enviados desde el AuthSerevice
    private handleError = (error: any, res: Response) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({error: error.message})
      }

      console.log(`${error}`);

      return res.status(500).json({error: 'Internal Server Error'})
    }


  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService.loginUser(loginDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));

  }



  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService.registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));

  }



  validateEmail = (req: Request, res: Response) => {
    res.json('validateEmail')
  }

}
