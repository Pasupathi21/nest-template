import { Module } from '@nestjs/common';
import { GeneralService } from './general/general.service';

@Module({
  providers: [GeneralService],
  exports: [GeneralService]
})
export class HelpersModule {}
