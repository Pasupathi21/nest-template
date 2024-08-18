import { Injectable, Logger } from '@nestjs/common'
import { Processor, Process, InjectQueue} from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { QUEUE_CONST } from 'src/data/queue.const'
// const name: string[] = QUEUE_CONST.map(m => m.name)

@Injectable()
@Processor(QUEUE_CONST[1].name)
export class MultipleOne {
    private readonly logger = new Logger(MultipleOne.name)

    constructor(@InjectQueue(QUEUE_CONST[1].name) private readonly multiOneQ: Queue){}
    @Process()
    async handleMultipleOne(job: Job){
        this.logger.log(job.data)
        setTimeout(() => console.log("handleMultipleOne completed"), 5000)
    }

    addJobToQueue(jobData){
        this.multiOneQ.add(jobData)
    }
}


@Injectable()
@Processor(QUEUE_CONST[2].name)
export class MultipleTwo {
    private readonly logger = new Logger(MultipleTwo.name)
    
    constructor(@InjectQueue(QUEUE_CONST[2].name) private readonly multiTwoQ: Queue){}

    @Process()
    async handleMultipleTwo(job: Job){
        this.logger.log(job.data)
    }

    addJobToQueue(jobData){
        this.multiTwoQ.add(jobData)
    }
}