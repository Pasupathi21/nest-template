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
import { MulterModule } from '@nestjs/platform-express'

// ************** All Features
import { FeatureModuelsModule } from './featuremodules/featuremodules.module'
import { FileuploadModule } from './services/fileupload/fileupload.module';
import { SocketModule } from './services/socket/socket.module';

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
    dest: ''
  }),
  // ****************** Reusable utility modules
  TestModule, 
  UtilsModule, 
  ResponseModule, 
  // ********************************************

  // ****************** services modules
  FileuploadModule, SocketModule,
  
  // *************** FeatureModuelsModule includes all features
  FeatureModuelsModule, 
  // ******************************************************
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
