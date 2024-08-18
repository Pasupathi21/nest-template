import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Logger, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto, InsertUser, InsertMovies, InsertPayload, InsertRating, InsertReview, InsertGenre } from './dto/create-template.dto';
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

  // *************** New crud for testing ******************
  @ApiTags('Movies')
  @Post('create-movie')
  async insertMovie(
    @Query("type") type: string, 
    @Body() payload: InsertMovies, 
    @Res() res: Response){
    try{
     const resData = await this.templateService.insertMovieRelated(type, payload)
      return this.responseService.success(res, resData, HttpStatus.CREATED)
    }catch(error){
      throw new HttpException({ message: error?.message, error: error}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiTags('Movies')
  @Post('create-user')
  async insertMovieUser(
    @Query("type") type: string, 
    @Body() payload: InsertUser, 
    @Res() res: Response){
    try{
     const resData = await this.templateService.insertMovieRelated(type, payload)
      return this.responseService.success(res, resData, HttpStatus.CREATED)
    }catch(error){
      console.log("catch error ", error)
      throw new HttpException({ message: error?.message, error: error}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @ApiTags('Movies')
  @Post('create-genre')
  async insertMovieGenre(
    @Query("type") type: string, 
    @Body() payload: InsertGenre, 
    @Res() res: Response){
    try{
     const resData = await this.templateService.insertMovieRelated(type, payload)
      return this.responseService.success(res, resData, HttpStatus.CREATED)
    }catch(error){
      throw new HttpException({ message: error?.message, error: error}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @ApiTags('Movies')
  @Post('create-review')
  async insertMovieReview(
    @Query("type") type: string, 
    @Body() payload: InsertReview, 
    @Res() res: Response){
    try{
     const resData = await this.templateService.insertMovieRelated(type, payload)
      return this.responseService.success(res, resData, HttpStatus.CREATED)
    }catch(error){
      throw new HttpException({ message: error?.message, error: error}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @ApiTags('Movies')
  @Post('create-rating')
  async insertMovieRating(
    @Query("type") type: string, 
    @Body() payload: InsertRating, 
    @Res() res: Response){
    try{
     const resData = await this.templateService.insertMovieRelated(type, payload)
      return this.responseService.success(res, resData, HttpStatus.CREATED)
    }catch(error){
      throw new HttpException({ message: error?.message, error: error}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiTags('Queues')
  @Get('test-single')
  async testSingleQueue(@Res() res: Response){
    try{
      const resData = await this.templateService.testSingleQueue()
      return this.responseService.success(res, resData)
    }catch(error){
      throw new HttpException({ message: error?.message, error: error}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiTags('Queues')
  @Get('test-multi')
  async testMultiQueue(@Res() res: Response){
    try{
      const resData = await this.templateService.testMultiQueue()
      return this.responseService.success(res, resData)
    }catch(error){
      throw new HttpException({ message: error?.message, error: error }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
