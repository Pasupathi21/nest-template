import { Module, Global } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { PugService } from './pug/pug.service';

Global()
@Module({
  providers: [GeneralService, PugService],
  exports: [GeneralService, PugService]
})
export class HelpersModule {}
