import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import { ComparisonModule } from '../comparison/comparison.module';
import { ResultsModule } from '../results/results.module';

@Module({
  imports: [ConfigModule, ComparisonModule, ResultsModule],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
