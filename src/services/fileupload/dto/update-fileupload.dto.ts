import { PartialType } from '@nestjs/swagger';
import { CreateFileuploadDto } from './create-fileupload.dto';

export class UpdateFileuploadDto extends PartialType(CreateFileuploadDto) {}
