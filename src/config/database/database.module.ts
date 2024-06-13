import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

// this module will be available in accross the other module [shuold import into the app.module]
@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
