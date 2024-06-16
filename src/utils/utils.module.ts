import { Module, Global } from '@nestjs/common'
import { HelpersModule } from './helpers/helpers.module'
import { LoggerModule } from './logger/logger.module'



@Global()
@Module({
    imports: [HelpersModule],
    providers: [],
    exports: [HelpersModule]
})
export class UtilsModule {}