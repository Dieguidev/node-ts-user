import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";



export class AuthService {

  constructor(){}

  async registerUser(registerUserDto:RegisterUserDto){

    const existUser = await UserModel.findOne({email:registerUserDto.email})
    if(existUser){
      throw CustomError.badRequest('User already exist')
    }

    return 'todo ok'

  }

}
