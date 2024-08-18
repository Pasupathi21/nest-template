import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { QueueModule } from 'src/services/queue/queue.module';

@Module({
  imports: [
    // QueueModule
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
