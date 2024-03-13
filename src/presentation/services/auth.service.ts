import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {

  constructor() { }

  async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) {
      throw CustomError.badRequest('User already exist')
    }

    try {

      const user = new UserModel(registerUserDto)
      await user.save()

      //encriptar contraseña

      //JWT

      //enviar correo de verificacion


      const { password, ...userEntity } = UserEntity.fromJson(user)

      return {
        user: userEntity,
        token: 'ABC'
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }

  }

}
