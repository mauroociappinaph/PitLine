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
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-surface/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-background/50">
            <th className="p-4 font-mono text-xs uppercase text-muted">Pos</th>
            <th className="p-4 font-mono text-xs uppercase text-muted">Driver</th>
            <th className="p-4 font-mono text-xs uppercase text-muted">Team</th>
            <th className="p-4 font-mono text-xs uppercase text-muted text-center">Laps</th>
            <th className="p-4 font-mono text-xs uppercase text-muted text-right">Time</th>
            <th className="p-4 font-mono text-xs uppercase text-muted text-right">Interval</th>
          </tr>
        </thead>
        <tbody>
          {results.map(entry => (
            <tr
              key={entry.driverNumber}
              className="border-b border-border/50 hover:bg-surface-elevated transition-colors group"
            >
              <td className="p-4">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded font-bold ${
                    entry.position === 1 ? 'bg-cta text-black shadow-glow-cta' : 'bg-background'
                  }`}
                >
                  {entry.position}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: entry.teamColor || '#333' }}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg leading-tight">
                      {entry.driverName || `Driver ${entry.driverNumber}`}
                    </span>
                    <span className="text-xs text-muted uppercase tracking-widest font-mono">
                      #{entry.driverNumber}
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-4 text-sm font-medium text-text-secondary">
                {entry.teamName || 'Privateer'}
              </td>
              <td className="p-4 text-center font-mono text-sm text-muted">
                {entry.lapsCompleted}
              </td>
              <td className="p-4 text-right font-mono font-bold text-secondary">
                {formatLapTime(entry.fastestLapTime)}
              </td>
              <td className="p-4 text-right font-mono text-xs text-muted">
                {entry.fastestLapTime ? formatInterval(entry.fastestLapTime, leaderTime) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
