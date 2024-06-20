import { Controller, Get, Post, Body, UploadedFiles, Logger, UseInterceptors } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { FilesInterceptor  } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger';
import { MAX_FILES_UPLOAD_COUNT } from 'src/data/app.const'



@Controller('upload')
export class FileuploadController {
  logger = new Logger(FileuploadController.name)
  constructor(private readonly fileuploadService: FileuploadService) {}

  @ApiTags('upload files')
  @Post('files')
  @UseInterceptors(FilesInterceptor('files', MAX_FILES_UPLOAD_COUNT))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    // this.logger.log(files)
    const fileRes = await this.fileuploadService.uploadFiles(files)
    return fileRes
    // return this.fileuploadService.create(createFileuploadDto);
  }

}
