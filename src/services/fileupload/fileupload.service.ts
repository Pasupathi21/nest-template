import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FileuploadService {

  logger = new Logger(FileuploadService.name)
  constructor(
    private readonly firebaseService: FirebaseService
  ){}

  async uploadFiles(files: Array<Express.Multer.File>){
    try{
      // this.logger.log(files)
      // throw new Error('test error')
      const uploadRes = await this.firebaseService.upload_one_or_many(files)
      return Promise.resolve(uploadRes)
    }catch(error){
      console.log("error >>>>", error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
