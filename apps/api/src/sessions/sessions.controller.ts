import { Controller, Get, Query, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsSyncService } from './sessions-sync.service';

@Controller('sessions')
export class SessionsController {
  constructor(
    private prisma: PrismaService,
    private syncService: SessionsSyncService,
  ) {}

  @Get()
  async getAllSessions(@Query('year') year?: string) {
    return this.prisma.session.findMany({
      where: year ? { year: parseInt(year) } : {},
      orderBy: { dateStart: 'asc' },
    });
  }

  @Post('sync')
  async triggerSync(@Query('year') year?: string) {
    return this.syncService.syncSessions(year ? parseInt(year) : 2026);
  }
}
