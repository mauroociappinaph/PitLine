import { Driver } from 'shared-types';

interface TeamCardProps {
  teamName: string;
  teamColor: string;
  drivers: Driver[];
}

export function TeamCard({ teamName, teamColor, drivers }: TeamCardProps) {
  const color = teamColor || '#E10600';

  return (
    <div className="f1-card group flex flex-col h-full !p-0 cursor-default">
      {/* Team color header bar */}
      <div
        className="relative h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${color} 0%, ${color}66 60%, transparent 100%)`,
          boxShadow: `0 0 16px ${color}55`,
        }}
      />

      {/* Glow bleed behind card on hover */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color}12 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <div className="p-5 flex flex-col h-full relative z-10">
        {/* Header */}
        <header className="flex flex-col gap-1 mb-5">
          <span
            className="text-[7px] uppercase font-black tracking-[0.45em] font-mono"
            style={{ color: `${color}80` }}
          >
            PERSONNEL // 2026
          </span>
          <h3 className="text-xl font-black text-white italic uppercase tracking-tight leading-none">
            {teamName}
          </h3>
        </header>

        {/* Separator */}
        <div
          className="h-px mb-4"
          style={{
            background: `linear-gradient(90deg, ${color}40 0%, transparent 100%)`,
          }}
        />

        {/* Drivers */}
        <div className="flex flex-col gap-0 flex-grow">
          {drivers.map((driver, idx) => (
            <div
              key={driver.driverNumber}
              className="flex items-center justify-between py-3 group/driver cursor-default transition-colors"
              style={{
                borderBottom:
                  idx < drivers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Driver number pill */}
                <span
                  className="font-mono font-bold text-[10px] tabular-nums w-7 text-center"
                  style={{ color: `${color}90` }}
                >
                  #{driver.driverNumber.toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.1em] italic">
                    {driver.firstName}
                  </span>
                  <span
                    className="text-sm font-black text-white uppercase italic tracking-tight group-hover/driver:text-white transition-colors"
                    style={{ textShadow: `0 0 20px ${color}00` }}
                  >
                    {driver.lastName}
                  </span>
                </div>
              </div>

              {/* Dot indicator */}
              <div
                className="w-1.5 h-1.5 rounded-full opacity-20 group-hover/driver:opacity-80 transition-all duration-300"
                style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
              />
            </div>
          ))}
        </div>

        {/* Footer tag */}
        <div
          className="mt-5 pt-4 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/10">
            OFFICIAL CONSTRUCTOR
          </span>
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-[2px] rounded-full"
                style={{
                  backgroundColor: `${color}${20 + i * 15}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
