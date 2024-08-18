import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { MulterModule } from '@nestjs/platform-express'
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule'
import { BullModule } from '@nestjs/bull'



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
import { CronModule } from './services/cron/cron.module';

import { QUEUE_CONST } from './data/queue.const'
// processor class
import {} from 'src/services/queue/processors/multi.processor'
import { PROCESSOR_CALSS } from 'src/services/queue/processors/processor.index';
import { QueueModule } from './services/queue/queue.module';

@Module({
  imports: [
    // ************ different env setup 
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
  }), 
  // ************** cronjs core module
  ScheduleModule.forRoot(), // forRoot will setup the default configuration to access the cron over any service within the app
  // ***************** DB Module
  DatabaseModule, 
  // ******************************
  MulterModule.register({
    dest: join(__dirname, 'temp', 'multer')
  }),

  // ***************** setup queue
    QueueModule,
    
  // ****************** Reusable utility modules
  TestModule, 
  UtilsModule, 
  ResponseModule, 
  // ********************************************

  // ****************** services modules
  FileuploadModule, SocketModule, FirebaseModule, CronModule,
  
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
    },

    // add processors for handling job in the queue
    // ...PROCESSOR_CALSS
  ],
  exports: [
    ResponseService,
    // ...PROCESSOR_CALSS
  ]
})
export class AppModule {}
