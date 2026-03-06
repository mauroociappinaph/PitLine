import { Driver } from "shared-types";

const OPENF1_BASE_URL = "https://api.openf1.org/v1";

/**
 * Fetch drivers from OpenF1 API.
 * Defaults to a recent session if no sessionKey is provided.
 */
export async function getDrivers(sessionKey?: number): Promise<Driver[]> {
  const url = new URL(`${OPENF1_BASE_URL}/drivers`);
  if (sessionKey) {
    url.searchParams.append("session_key", sessionKey.toString());
  } else {
    // Default to a recent 2025 session key if available, or just general fetch
    // For now, let's fetch without session to get a broad list or the latest
    url.searchParams.append("session_key", "latest");
  }

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Failed to fetch drivers from OpenF1");

    const data = await response.json();

    // Map OpenF1 structure to our shared Driver interface
    return data.map((d: any) => ({
      id: d.driver_number.toString(),
      driverNumber: d.driver_number,
      nameAcronym: d.name_acronym,
      fullName: d.full_name,
      firstName: d.first_name,
      lastName: d.last_name,
      teamName: d.team_name,
      teamColor: `#${d.team_colour}`, // OpenF1 returns hex without #
      countryCode: d.country_code,
      headshotUrl: d.headshot_url
    }));
  } catch (error) {
    console.error("OpenF1 API Error:", error);
    return [];
  }
}
