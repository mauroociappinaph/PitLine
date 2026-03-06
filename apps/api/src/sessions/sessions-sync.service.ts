import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class SessionsSyncService {
  private readonly logger = new Logger(SessionsSyncService.name);
  private readonly OPENF1_URL = 'https://api.openf1.org/v1/sessions';

  constructor(private prisma: PrismaService) {}

  async syncSessions(year: number = 2026) {
    this.logger.log(`Starting sync for F1 sessions in year ${year}...`);

    try {
      const response = await axios.get(this.OPENF1_URL, {
        params: { year },
      });

      const sessions = response.data;
      this.logger.log(`Fetched ${sessions.length} sessions from OpenF1.`);

      for (const session of sessions) {
        await this.prisma.session.upsert({
          where: { sessionKey: session.session_key },
          update: {
            sessionName: session.session_name,
            sessionType: session.session_type,
            dateStart: new Date(session.date_start),
            dateEnd: new Date(session.date_end),
            location: session.location,
            countryCode: session.country_code,
            circuitShortName: session.circuit_short_name,
          },
          create: {
            sessionKey: session.session_key,
            year: session.year,
            sessionName: session.session_name,
            sessionType: session.session_type,
            dateStart: new Date(session.date_start),
            dateEnd: new Date(session.date_end),
            location: session.location,
            countryCode: session.country_code,
            circuitShortName: session.circuit_short_name,
          },
        });
      }

      this.logger.log('Sync completed successfully.');
      return { success: true, count: sessions.length };
    } catch (error) {
      this.logger.error('Failed to sync sessions:', error.message);
      throw error;
    }
  }
}
