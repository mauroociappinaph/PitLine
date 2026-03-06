import { TeamCard } from './TeamCard';
import { getDrivers } from '@/lib/api/openf1';
import { Team } from 'shared-types';

export async function TeamGrid() {
  const drivers = await getDrivers();

  // Group drivers by team
  const teamsMap = drivers.reduce(
    (acc, driver) => {
      if (!acc[driver.teamName]) {
        acc[driver.teamName] = {
          id: driver.teamName.toLowerCase().replace(/\s+/g, '-'),
          name: driver.teamName,
          color: driver.teamColor,
          drivers: [],
        };
      }
      acc[driver.teamName].drivers.push(driver);
      return acc;
    },
    {} as Record<string, Team>
  );

  const teams = Object.values(teamsMap);

  if (teams.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center p-16 text-center rounded-xl"
        style={{
          background: 'rgba(13,16,23,0.6)',
          border: '1px dashed rgba(255,255,255,0.08)',
        }}
      >
        <div className="live-pulse mb-4" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <p className="text-white/30 font-black uppercase italic tracking-tight text-sm mb-1">
          No Signal
        </p>
        <p className="text-[9px] font-mono text-white/15 uppercase tracking-[0.3em]">
          OpenF1 API connection required
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {teams.map(team => (
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
