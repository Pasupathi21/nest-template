import { Module } from '@nestjs/common'
import { TemplateModule } from './template/template.module';

@Module({
    imports: [TemplateModule]
})
export class FeatureModuelsModule {}