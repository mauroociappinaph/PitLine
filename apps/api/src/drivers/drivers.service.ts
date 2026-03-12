import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class DriversService {
  private readonly logger = new Logger(DriversService.name);
  private readonly OPENF1_DRIVERS_URL = 'https://api.openf1.org/v1/drivers';

  constructor(private prisma: PrismaService) {}

  async getDrivers(sessionKey?: number): Promise<any[]> {
    this.logger.log(
      `Fetching drivers for session ${sessionKey || 'latest'}...`,
    );

    try {
      const url = new URL(this.OPENF1_DRIVERS_URL);
      if (sessionKey) {
        url.searchParams.append('session_key', sessionKey.toString());
      } else {
        url.searchParams.append('session_key', 'latest');
      }

      const response = await axios.get(url.toString());
      const drivers = response.data;

      // Transform OpenF1 data to match our interface
      const transformedDrivers = drivers.map((d: any) => ({
        id: d.driver_number.toString(),
        driverNumber: d.driver_number,
        nameAcronym: d.name_acronym,
        fullName: d.full_name,
        firstName: d.first_name,
        lastName: d.last_name,
        teamName: d.team_name,
        teamColor: `#${d.team_colour}`,
        countryCode: d.country_code,
        headshotUrl: d.headshot_url,
      }));

      return transformedDrivers;
    } catch (error) {
      this.logger.error('Failed to fetch drivers:', error.message);
      throw error;
    }
  }
}
