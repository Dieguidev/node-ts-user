import fs from "fs";
import path from "path";
//todo: crear patron adaptador pra no usar dependencias de terceron en el servicio
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";





export class FileUploadService {
  constructor(
    private readonly uuid = Uuid.v4
  ) { }

  private chackFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }



  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif',]
  ) {

    try {
      // console.log(file);

      const fileExtends = file.mimetype.split('/').at(1) ?? '';
      if(!validExtensions.includes(fileExtends)) {
        throw CustomError.badRequest(`Invalid extension: ${fileExtends}, valid ones ${validExtensions}`);
    }

      const destination = path.resolve(__dirname, '../../../', folder);
      this.chackFolder(destination);

      const fileName = `${this.uuid()}.${fileExtends}`;

      file.mv(`${destination}/${fileName}`);

      return { fileName };

    } catch (error) {
      // console.log({ error });
      throw error;
    }

  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {

    const fileNames = await Promise.all(
      files.map(file => this.uploadSingle(file, folder, validExtensions))
    );

    return fileNames;

   }
}
