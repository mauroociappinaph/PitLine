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
    <div className="w-full overflow-x-auto bg-black border border-white/5 rounded-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-elevated border-b-2 border-primary">
            <th className="p-4 font-black italic text-[11px] uppercase tracking-[0.2em] text-white">
              Pos
            </th>
            <th className="p-4 font-black italic text-[11px] uppercase tracking-[0.2em] text-white">
              Driver (Personnel)
            </th>
            <th className="p-4 font-black italic text-[11px] uppercase tracking-[0.2em] text-white">
              Team / Constructor
            </th>
            <th className="p-4 font-black italic text-[11px] uppercase tracking-[0.2em] text-white text-center">
              Laps
            </th>
            <th className="p-4 font-black italic text-[11px] uppercase tracking-[0.2em] text-white text-right">
              Time (Best)
            </th>
            <th className="p-4 font-black italic text-[11px] uppercase tracking-[0.2em] text-white text-right">
              Interval
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {results.map(entry => (
            <tr key={entry.driverNumber} className="hover:bg-primary/5 transition-colors group">
              <td className="p-4">
                <span
                  className={`inline-block font-black italic text-lg ${
                    entry.position === 1 ? 'text-primary scale-125' : 'text-white/40'
                  }`}
                >
                  {entry.position.toString().padStart(2, '0')}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-1.5 h-10 skew-x-[-15deg]"
                    style={{
                      backgroundColor: entry.teamColor || '#E10600',
                      boxShadow: entry.position === 1 ? `0 0 15px ${entry.teamColor}88` : 'none',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-black text-lg tracking-tighter text-white uppercase italic group-hover:text-primary transition-colors">
                      {entry.driverName || `Driver ${entry.driverNumber}`}
                    </span>
                    <span className="text-[10px] text-muted uppercase font-black tracking-[0.2em]">
                      NO. {entry.driverNumber}
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white/80 uppercase tracking-widest leading-none">
                    {entry.teamName || 'Scuderia Independent'}
                  </span>
                  {entry.position === 1 && (
                    <span className="text-[8px] text-primary font-black uppercase italic tracking-widest mt-1">
                      Leader
                    </span>
                  )}
                </div>
              </td>
              <td className="p-4 text-center font-bold text-sm text-white/50">
                {entry.lapsCompleted}
              </td>
              <td className="p-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-mono font-black text-primary text-base">
                    {entry.fastestLapTime ? formatLapTime(entry.fastestLapTime) : '--:--.---'}
                  </span>
                  <span className="text-[8px] text-muted uppercase font-black tracking-widest">
                    Fastest Lap
                  </span>
                </div>
              </td>
              <td className="p-4 text-right font-mono font-bold text-xs text-muted group-hover:text-white transition-colors">
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
