import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SessionsSyncService } from './sessions/sessions-sync.service';
import { SessionsController } from './sessions/sessions.controller';
import { ComparisonModule } from './comparison/comparison.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ComparisonModule,
    AiModule,
    ResultsModule,
  ],
  controllers: [AppController, SessionsController],
  providers: [AppService, PrismaService, SessionsSyncService],
  exports: [PrismaService],
})
export class AppModule {}
