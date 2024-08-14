import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TaskService {
    logger = new Logger(TaskService.name)
    constructor(){}

    // @Cron("*/2 * * * * *")
    testCronTask(){
        this.logger.log("This is a test cron job service: ", new Date().toLocaleDateString())
    }
}