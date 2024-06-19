import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileuploadController } from './fileupload.controller';

@Module({
  controllers: [FileuploadController],
  providers: [FileuploadService],
  exports: [FileuploadModule]
})
export class FileuploadModule {}
