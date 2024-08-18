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

    // give name to separate process
    @Process('PROCESS_ONE')
    async handleSingleJob(job: Job){
        this.logger.log("Test single job", job.data)
    }

    @Process('PROCESS_TWO')
    async handleSingleJobProcessTwo(job: Job){
        this.logger.log("Test single job process two", job.data)
    }

    addJobToQueue(name, data, ...rest){
        this.singleQ.add(name, data)
    }
}