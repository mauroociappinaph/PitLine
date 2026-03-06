import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ComparisonController } from './comparison.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ComparisonController],
  providers: [ComparisonService, PrismaService],
  exports: [ComparisonService],
})
export class ComparisonModule {}
