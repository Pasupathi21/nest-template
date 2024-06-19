import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FileuploadService {

  logger = new Logger(FileuploadService.name)

  async uploadFiles(files: Array<Express.Multer.File>){
    try{
      return Promise.resolve(files)
    }catch(error){
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
