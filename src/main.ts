import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ************** cors enable for all origin
  app.enableCors({
    origin: "*"
  })

  // *************** view engin and view dir setup
  app.setViewEngine('pug')
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  const port = process.env.PORT || 4002
  console.log(`app listening on http://localhost:${port}`)
  await app.listen(port);
}
console.log(process.env.ENV_MESSAGE)
bootstrap();
