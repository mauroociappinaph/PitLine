import { Driver } from "shared-types";

interface TeamCardProps {
  teamName: string;
  teamColor: string;
  drivers: Driver[];
}

export function TeamCard({ teamName, teamColor, drivers }: TeamCardProps) {
  return (
    <div
      className="card-f1 flex flex-col gap-4 overflow-hidden relative"
      style={{ borderTop: `4px solid ${teamColor}` }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold tracking-tight">{teamName}</h3>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: teamColor, boxShadow: `0 0 10px ${teamColor}` }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {drivers.map((driver) => (
          <div key={`${driver.nameAcronym}-${driver.driverNumber}`} className="flex justify-between items-center p-2 rounded bg-background/50 hover:bg-surface-elevated transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-muted">{driver.driverNumber}</span>
              <span className="font-semibold">{driver.firstName} {driver.lastName}</span>
            </div>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/10 text-secondary">
              {driver.nameAcronym}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
