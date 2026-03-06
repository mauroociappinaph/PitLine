import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SessionsSyncService } from './sessions/sessions-sync.service';
import { SessionsController } from './sessions/sessions.controller';

@Module({
  imports: [],
  controllers: [AppController, SessionsController],
  providers: [AppService, PrismaService, SessionsSyncService],
  exports: [PrismaService],
})
export class AppModule {}
