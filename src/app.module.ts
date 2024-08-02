import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { MulterModule } from '@nestjs/platform-express'
import { APP_FILTER } from '@nestjs/core';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { TestModule } from './config/test/test.module';
import { UtilsModule } from './utils/utils.module';
import { ResponseModule } from './services/response/response.module';


// ************** All Features
import { FeatureModuelsModule } from './featuremodules/featuremodules.module'
import { FileuploadModule } from './services/fileupload/fileupload.module';
import { SocketModule } from './services/socket/socket.module';
import { FirebaseModule } from './services/firebase/firebase.module';
import { ResponseService } from './services/response/response.service';
import { GlobalExceptionFilter } from './common/filters/globalexception.filter';

@Module({
  imports: [
    // ************ different env setup 
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
  }), 
  // ***************** DB Module
  DatabaseModule, 
  // ******************************
  MulterModule.register({
    dest: join(__dirname, 'temp', 'multer')
  }),
  // ****************** Reusable utility modules
  TestModule, 
  UtilsModule, 
  ResponseModule, 
  // ********************************************

  // ****************** services modules
  FileuploadModule, SocketModule, FirebaseModule, 
  
  // *************** FeatureModuelsModule includes all features
  FeatureModuelsModule,
  
  // ******************************************************
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseService,
    // add filter to globally without creating any instance
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
  exports: [ResponseService]
})
export class AppModule {}
