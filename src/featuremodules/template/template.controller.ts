import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
 
// import { ResponseModule } from 'src/services/response/response.module';
import { ResponseService } from 'src/services/response/response.service';
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger';

@Controller('template')
export class TemplateController {
  private readonly logger = new Logger(TemplateController.name)

  constructor(
    private readonly templateService: TemplateService,
    private readonly responseService: ResponseService,
    // private readonly logger: LoggerService
    ) {}

  @ApiTags("create-template")
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    this.logger.log("Hello testing >>>>>", {
      "accounting": [
        {
          "firstName": "John",
          "lastName": "Doe",
          "age": 23
        },

        {
          "firstName": "Mary",
          "lastName": "Smith",
          "age": 32
        }
      ],
      "sales": [
        {
          "firstName": "Sally",
          "lastName": "Green",
          "age": 27
        },

        {
          "firstName": "Jim",
          "lastName": "Galley",
          "age": 41
        }
      ]
    })
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

  @ApiTags('Exception-Api')
  @Get('exception-test')
  async testExe(){
    try{
      await this.templateService.testExcep()
    }catch(error){
      throw new HttpException({ message: error?.message, error: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
