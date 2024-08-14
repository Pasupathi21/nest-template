import { Module } from '@nestjs/common';
import { TaskService } from './task/task.service';
// import { ScheduleModule } from '@nestjs/schedule'

@Module({
    imports: [],
    providers: [TaskService]
})
export class CronModule {}
