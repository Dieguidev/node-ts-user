import { NextFunction, Request, Response } from "express";




export class TypeMiddleware {
  //este metodo es como factoring functiuon
  static vaildTypes( validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      //por el problema de express directamente extraigo el type del url
      const type = req.url.split('/')[2] ?? '';
      // console.log(type);

      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: `Invalid type ${type}, valid ones ${validTypes}` })
      }
      next();
    };
  }



}
