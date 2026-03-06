import { Controller, Get, Param } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get(':sessionKey')
  async getResults(@Param('sessionKey') sessionKey: string) {
    return this.resultsService.getResults(parseInt(sessionKey));
  }
}
