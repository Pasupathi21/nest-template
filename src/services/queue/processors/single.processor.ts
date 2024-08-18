import { Injectable, Logger } from '@nestjs/common' 
import { Processor, Process, InjectQueue} from  '@nestjs/bull'
import { Job, Queue } from 'bull'
import { QUEUE_CONST } from 'src/data/queue.const'

@Injectable()
@Processor(QUEUE_CONST[0]?.name)
export class SingleProcessor { 
    private readonly logger = new Logger(SingleProcessor.name) 

    constructor(
        @InjectQueue(QUEUE_CONST[0]?.name) private singleQ: Queue
    ){

    }
    @Process()
    async handleSingleJob(job: Job){
        this.logger.log("Test single job", job.data)
    }

    addJobToQueue(jobData){
        this.singleQ.add(jobData)
    }
}