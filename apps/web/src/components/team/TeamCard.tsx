import { Driver } from 'shared-types';

interface TeamCardProps {
  teamName: string;
  teamColor: string;
  drivers: Driver[];
}

export function TeamCard({ teamName, teamColor, drivers }: TeamCardProps) {
  return (
    <div className="f1-card group flex flex-col h-full relative overflow-hidden">
      {/* Decorative Red Flare */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/40 transition-colors" />

      <header className="flex flex-col gap-1 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="live-pulse" />
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/80 italic">
            Official Entry
          </span>
        </div>
        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
          {teamName}
        </h3>
      </header>

      <div className="flex flex-col gap-4 mt-auto">
        {drivers.map(driver => (
          <div key={driver.driverNumber} className="flex items-center justify-between group/driver">
            <div className="flex items-center gap-3">
              <span className="text-primary font-black italic text-xl">{driver.driverNumber}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white uppercase tracking-tight">
                  {driver.firstName} {driver.lastName}
                </span>
                <span className="text-[9px] font-mono text-muted uppercase tracking-widest">
                  {driver.teamName}
                </span>
              </div>
            </div>
            <div
              className="w-1.5 h-6 rounded-sm transition-transform group-hover/driver:scale-y-125"
              style={{ backgroundColor: teamColor || '#E10600' }}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-12 h-[2px] bg-primary/30 group-hover:w-24 transition-all duration-500" />
      </div>
    </div>
  );
}
