import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SessionsSyncService } from './sessions/sessions-sync.service';
import { SessionsController } from './sessions/sessions.controller';
import { ResultsService } from './results/results.service';
import { ResultsController } from './results/results.controller';
import { ComparisonModule } from './comparison/comparison.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ComparisonModule,
    AiModule,
  ],
  controllers: [AppController, SessionsController, ResultsController],
  providers: [AppService, PrismaService, SessionsSyncService, ResultsService],
  exports: [PrismaService],
})
export class AppModule {}
