import { Controller, Get, Post, Body, UploadedFiles, Logger, UseInterceptors, ParseFilePipe, UsePipes, Res, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { FilesInterceptor  } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger';
import { MAX_FILES_UPLOAD_COUNT } from 'src/data/app.const'
import { UploadFileValidation } from 'src/common/pipes/filevalidation.pipe';
import { ResponseService } from '../response/response.service';
import { Response} from 'express'


@Controller('upload')
export class FileuploadController {
  logger = new Logger(FileuploadController.name)
  constructor(
    private readonly fileuploadService: FileuploadService,
    private readonly responseService: ResponseService
    ) {}

  @ApiTags('upload files')
  @Post('files')
  @UseInterceptors(FilesInterceptor('files', MAX_FILES_UPLOAD_COUNT))
  @UsePipes(new UploadFileValidation())
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
    try{
      //  this.logger.log(files) 
    const fileRes = await this.fileuploadService.uploadFiles(files)
    this.responseService.success(res, files)
    }catch(error){
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
