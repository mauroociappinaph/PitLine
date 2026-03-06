import { formatLapTime, formatInterval } from '@/lib/utils/formatters';

interface ResultEntry {
  driverNumber: number;
  position: number;
  fastestLapTime: number | null;
  lapsCompleted: number;
  driverName?: string;
  teamName?: string;
  teamColor?: string;
}

interface ResultsTableProps {
  results: ResultEntry[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  const leaderTime = results[0]?.fastestLapTime || 0;

  return (
    <div className="w-full overflow-x-auto rounded-2xl glass-card">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/5">
            <th className="p-5 font-f1 text-[10px] uppercase tracking-[0.2em] text-muted">Pos</th>
            <th className="p-5 font-f1 text-[10px] uppercase tracking-[0.2em] text-muted">
              Driver
            </th>
            <th className="p-5 font-f1 text-[10px] uppercase tracking-[0.2em] text-muted">Team</th>
            <th className="p-5 font-f1 text-[10px] uppercase tracking-[0.2em] text-muted text-center">
              Laps
            </th>
            <th className="p-5 font-f1 text-[10px] uppercase tracking-[0.2em] text-muted text-right">
              Time
            </th>
            <th className="p-5 font-f1 text-[10px] uppercase tracking-[0.2em] text-muted text-right">
              Interval
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {results.map(entry => (
            <tr key={entry.driverNumber} className="hover:bg-white/[0.03] transition-colors group">
              <td className="p-5">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded font-black text-sm italic ${
                    entry.position === 1
                      ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-elevated text-white/50'
                  }`}
                >
                  {entry.position}
                </span>
              </td>
              <td className="p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-10 rounded-full"
                    style={{
                      backgroundColor: entry.teamColor || '#333',
                      boxShadow: `0 0 10px ${entry.teamColor}44`,
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
                      {entry.driverName || `Driver ${entry.driverNumber}`}
                    </span>
                    <span className="text-[10px] text-muted uppercase font-mono tracking-widest">
                      #{entry.driverNumber}
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-5 text-xs font-bold text-text-secondary uppercase tracking-widest">
                {entry.teamName || 'Privateer'}
              </td>
              <td className="p-5 text-center font-mono text-sm text-white/80">
                {entry.lapsCompleted}
              </td>
              <td className="p-5 text-right font-mono font-bold text-primary text-sm">
                {entry.fastestLapTime ? formatLapTime(entry.fastestLapTime) : '--:--.---'}
              </td>
              <td className="p-5 text-right font-mono text-[10px] text-muted group-hover:text-white transition-colors">
                {entry.fastestLapTime && leaderTime
                  ? formatInterval(entry.fastestLapTime, leaderTime)
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
