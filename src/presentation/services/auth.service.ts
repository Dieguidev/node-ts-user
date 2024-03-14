import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {

  constructor() { }

  async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) {
      throw CustomError.badRequest('User already exist')
    }

    try {

      const user = new UserModel(registerUserDto)

      //encriptar contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password)
      await user.save();
      //JWT

      //enviar correo de verificacion


      const { password, ...userEntity } = UserEntity.fromJson(user)

      const token = await this.generateTokenService(user.id)

      return {
        user: userEntity,
        token
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }

  }

  async loginUser(loginUserDto: LoginUserDto) {
    //find one para verificar si existe el usuario
    const user = await UserModel.findOne({ email: loginUserDto.email })
    if (!user) {
      throw CustomError.badRequest('User or email invalid')
    }

    //ismatch ..bcrypt
    const isMatchPassword = bcryptAdapter.compare(loginUserDto.password, user.password)
    if (!isMatchPassword) {
      throw CustomError.badRequest('Invalid credentials')
    }

    const { password, ...userEntity } = UserEntity.fromJson(user)

    const token = await this.generateTokenService(user.id)



    return {
      user: userEntity,
      token: token
    }
  }


  //metodo para genrar token
  async generateTokenService(id: string) {
    const token = await JwtAdapter.generateToken({ id })
    if (!token) {
      throw CustomError.internalServer('Error generating token')
    }
    return token
  }
}
