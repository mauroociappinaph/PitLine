import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SessionsSyncService } from './sessions/sessions-sync.service';
import { SessionsController } from './sessions/sessions.controller';
import { ResultsService } from './results/results.service';
import { ResultsController } from './results/results.controller';

@Module({
  imports: [],
  controllers: [AppController, SessionsController, ResultsController],
  providers: [AppService, PrismaService, SessionsSyncService, ResultsService],
  exports: [PrismaService],
})
export class AppModule {}
