import { Module, Global } from '@nestjs/common'
import { PROCESSOR_CALSS } from './processors/processor.index'
import { BullModule } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { QUEUE_CONST } from 'src/data/queue.const'

@Global()
@Module({
    imports: [
        BullModule.registerQueueAsync(
            ...QUEUE_CONST.map(q => ({
                name: q.name,
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => ({
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),

                    }
                }),
                inject: [ConfigService]
            }))
        ),
    ],
    providers: [
        ...PROCESSOR_CALSS
    ],
    exports: [
        ...PROCESSOR_CALSS
    ]
})
export class QueueModule {}