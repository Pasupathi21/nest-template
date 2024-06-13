import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { TestModule } from './config/test/test.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, TestModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
