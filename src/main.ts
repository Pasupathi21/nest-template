import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from 'src/common/filters/globalexception.filter'
import { AuthGuard } from './common/guards/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn']
  });

  // ************** cors enable for all origin
  app.enableCors({
    origin: "*"
  })

  // ************** compression
  // decrease the response body (Not recommended for Nginx reverse proxy)
  app.use(compression())
  // ***************** Global setup
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalGuards(new AuthGuard())

  // ************* set public folder and temp folder
  // app.useStaticAssets()
  const tempDir = join(__dirname, 'temp')
  if(!existsSync(tempDir)) mkdirSync(tempDir)

  // ************ upload files temp
  const multerDir = join(__dirname, 'temp', 'multer')
  if(!existsSync(multerDir)) mkdirSync(multerDir, { recursive: true })
  

  // *************** view engin and view dir setup
  app.setViewEngine('pug')
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  // ************** swagger setup
  const swaggerConfig: any = new DocumentBuilder()
  .setTitle('Template API')
  .setDescription('nest.js application template')
  .setVersion('0.1')
  const documnet = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api-docs', app, documnet)


  const port = process.env.PORT || 4002
  console.log(`app listening on http://localhost:${port}`)
  await app.listen(port);
}
console.log(process.env.ENV_MESSAGE)
bootstrap();
