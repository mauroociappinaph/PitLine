import { Driver, Session } from 'shared-types';

const OPENF1_BASE_URL = 'https://api.openf1.org/v1';

/**
 * Fetch drivers from OpenF1 API.
 */
export async function getDrivers(sessionKey?: number | string): Promise<Driver[]> {
  const url = new URL(`${OPENF1_BASE_URL}/drivers`);
  if (sessionKey) {
    url.searchParams.append('session_key', sessionKey.toString());
  } else {
    // Default to a recent session or latest
    url.searchParams.append('session_key', 'latest');
  }

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 60 } });
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
}

/**
 * Fetch sessions from OpenF1 API.
 */
export async function getSessions(year: number = 2026): Promise<Session[]> {
  // Using 2026 data as requested.
  const url = `${OPENF1_BASE_URL}/sessions?year=${year}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error('Failed to fetch sessions from OpenF1');

    const data = await response.json();
    return data.map((s: any) => ({
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
}
