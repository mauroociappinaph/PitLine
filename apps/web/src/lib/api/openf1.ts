import { Driver, Session } from 'shared-types';
import pLimit from 'p-limit';

const OPENF1_BASE_URL = 'https://api.openf1.org/v1';

// Rate limit: Max 5 concurrent requests to OpenF1 to avoid 429 errors
const limit = pLimit(5);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Helper to determine revalidation time based on session status.
 * If sessions are active/near, revalidate faster.
 */
function getRevalidateTime(sessions?: any[]): number {
  if (!sessions || sessions.length === 0) return 3600; // 1 hour if no data

  const now = new Date();
  const isAnyLiveOrNear = sessions.some(s => {
    const start = new Date(s.date_start);
    const end = new Date(s.date_end);
    const buffer = 2 * 60 * 60 * 1000; // 2 hours buffer
    return now >= new Date(start.getTime() - buffer) && now <= new Date(end.getTime() + buffer);
  });

  return isAnyLiveOrNear ? 60 : 3600; // 1 min during event, 1 hour otherwise
}

/**
 * Fetch drivers from OpenF1 API.
 */
export async function getDrivers(sessionKey?: number | string): Promise<Driver[]> {
  return limit(async () => {
    await sleep(200); // Wait 200ms to be extra safe with the API
    const url = new URL(`${OPENF1_BASE_URL}/drivers`);
    if (sessionKey) {
      url.searchParams.append('session_key', sessionKey.toString());
    } else {
      url.searchParams.append('session_key', 'latest');
    }

    try {
      const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch drivers from OpenF1');

      const data = await response.json();
      return data.map((d: any) => ({
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
    } catch (error) {
      console.error('OpenF1 Drivers API Error:', error);
      return [];
    }
  });
}

/**
 * Fetch sessions from OpenF1 API.
 */
export async function getSessions(year: number = 2026): Promise<Session[]> {
  return limit(async () => {
    await sleep(200); // Wait 200ms to be extra safe with the API
    const url = `${OPENF1_BASE_URL}/sessions?year=${year}`;

    try {
      // First fetch to determine status, then use revalidate
      // Note: In Next.js App Router, revalidate in fetch() is usually static.
      // We'll use a slightly larger default or tags for better management.
      // For this demo, let's keep it 60 but explain the logic.
      const response = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!response.ok) throw new Error('Failed to fetch sessions from OpenF1');

      const data = await response.json();

      // Sort sessions by date start to ensure chronological order from the source
      const sortedData = data.sort(
        (a: any, b: any) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
      );

      return sortedData.map((s: any) => ({
        id: s.session_key.toString(),
        sessionKey: s.session_key,
        year: s.year,
        sessionName: s.session_name,
        sessionType: s.session_type,
        dateStart: s.date_start,
        dateEnd: s.date_end,
        location: s.location,
        countryCode: s.country_code,
        circuitShortName: s.circuit_short_name,
      }));
    } catch (error) {
      console.error('OpenF1 Sessions API Error:', error);
      return [];
    }
  });
}
