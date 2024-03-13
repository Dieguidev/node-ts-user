import jwt from 'jsonwebtoken'
import { envs } from './envs'



export class JwtAdapter {

  static async generateToken(payload: any, duration: string = '2h') {

    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration }, (err, token) => {

        if (err) resolve(null)

        resolve(token)

      })

    })


  }


  static validateToken(token: string) {

  }

}
