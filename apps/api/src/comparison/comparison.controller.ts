import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ComparisonService } from './comparison.service';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Get()
  async getComparison(
    @Query('sessionKey', ParseIntPipe) sessionKey: number,
    @Query('driver1', ParseIntPipe) driver1: number,
    @Query('driver2', ParseIntPipe) driver2: number,
  ) {
    return this.comparisonService.compareDrivers(sessionKey, driver1, driver2);
  }
}
