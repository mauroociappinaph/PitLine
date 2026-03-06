import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ResultsService {
  private readonly logger = new Logger(ResultsService.name);
  private readonly OPENF1_POS_URL = 'https://api.openf1.org/v1/position';
  private readonly OPENF1_LAPS_URL = 'https://api.openf1.org/v1/laps';

  constructor(private prisma: PrismaService) {}

  async getResults(sessionKey: number) {
    this.logger.log(`Fetching results for session ${sessionKey}...`);

    try {
      // 1. Fetch final positions
      const posResponse = await axios.get(this.OPENF1_POS_URL, {
        params: { session_key: sessionKey },
      });

      const positions = posResponse.data;

      // Get the latest position for each driver
      const latestPositionsMap = new Map();
      positions.forEach((p: any) => {
        const current = latestPositionsMap.get(p.driver_number);
        if (!current || new Date(p.date) > new Date(current.date)) {
          latestPositionsMap.set(p.driver_number, p);
        }
      });

      // 2. Fetch laps for fastest lap data
      const lapsResponse = await axios.get(this.OPENF1_LAPS_URL, {
        params: { session_key: sessionKey },
      });
      const laps = lapsResponse.data;

      const sessionResults = Array.from(latestPositionsMap.values())
        .map((pos) => {
          const driverLaps = laps.filter(
            (l: any) => l.driver_number === pos.driver_number,
          );
          const fastestLap =
            driverLaps.length > 0
              ? driverLaps.reduce((prev: any, curr: any) =>
                  prev.lap_duration < curr.lap_duration ? prev : curr,
                )
              : null;

          return {
            driverNumber: pos.driver_number,
            position: pos.position,
            fastestLapTime: fastestLap?.lap_duration || null,
            lapsCompleted: driverLaps.length,
          };
        })
        .sort((a, b) => a.position - b.position);

      return sessionResults;
    } catch (error) {
      this.logger.error('Failed to fetch results:', error.message);
      throw error;
    }
  }
}
