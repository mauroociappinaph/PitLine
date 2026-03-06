import { TeamCard } from "./TeamCard";
import { getDrivers } from "@/lib/api/openf1";
import { Driver, Team } from "shared-types";

export async function TeamGrid() {
  const drivers = await getDrivers();

  // Group drivers by team
  const teamsMap = drivers.reduce((acc, driver) => {
    if (!acc[driver.teamName]) {
      acc[driver.teamName] = {
        id: driver.teamName.toLowerCase().replace(/\s+/g, '-'),
        name: driver.teamName,
        color: driver.teamColor,
        drivers: []
      };
    }
    acc[driver.teamName].drivers.push(driver);
    return acc;
  }, {} as Record<string, Team>);

  const teams = Object.values(teamsMap);

  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl">
        <p className="text-text-secondary">No real-time data found from OpenF1 API.</p>
        <p className="text-sm text-muted">Please verify the sessionKey or API status.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          teamName={team.name}
          teamColor={team.color}
          drivers={team.drivers}
        />
      ))}
    </div>
  );
}
