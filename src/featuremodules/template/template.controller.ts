import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
 
// import { ResponseModule } from 'src/services/response/response.module';
import { ResponseService } from 'src/services/response/response.service';
import { Response } from 'express'

@Controller('template')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly responseService: ResponseService
    ) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  // @Get()
  // findAll() {
  //   return this.templateService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log(">>>>>>>>>>>>>")
  //   return this.templateService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }

  @Get('get-html-file')
  async htmlFile(@Res() res: Response) {
    try {
      const resData = await this.templateService.htmlFile()
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachement; filename=output.zip'
      })
      return this.responseService.send(
        res,
        resData
      )
    } catch (error) {
      return this.responseService.failed(res, null, error?.message)
    }
  }
}
