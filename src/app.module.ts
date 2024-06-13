import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { TestModule } from './config/test/test.module';
import { UtilsModule } from './utils/utils.module';
import { ResponseModule } from './services/response/response.module';
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'

@Module({
  imports: [
    // ************ different env setup 
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
  }), 
  DatabaseModule, TestModule, UtilsModule, ResponseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
