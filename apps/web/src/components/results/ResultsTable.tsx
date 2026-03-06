'use client';

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

function PositionBadge({ pos }: { pos: number }) {
  const cls =
    pos === 1
      ? 'pos-badge p1'
      : pos === 2
        ? 'pos-badge p2'
        : pos === 3
          ? 'pos-badge p3'
          : 'pos-badge';
  return <div className={cls}>{pos.toString().padStart(2, '0')}</div>;
}

export function ResultsTable({ results }: ResultsTableProps) {
  const leaderTime = results[0]?.fastestLapTime || 0;

  return (
    <div
      className="w-full overflow-x-auto rounded-xl"
      style={{
        background: 'linear-gradient(180deg, rgba(19,23,32,0.9) 0%, rgba(13,16,23,0.95) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}
    >
      <table className="w-full text-left border-collapse table-fixed">
        {/* Header */}
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <th className="w-20 px-5 py-4 font-black italic text-[7px] uppercase tracking-[0.45em] text-white/20 text-center">
              Pos
            </th>
            <th className="px-5 py-4 font-black italic text-[7px] uppercase tracking-[0.45em] text-white/20">
              Personnel (ID)
            </th>
            <th className="w-44 px-5 py-4 font-black italic text-[7px] uppercase tracking-[0.45em] text-white/20">
              Team Constructor
            </th>
            <th className="w-20 px-5 py-4 font-black italic text-[7px] uppercase tracking-[0.45em] text-white/20 text-center">
              Units
            </th>
            <th className="w-44 px-5 py-4 font-black italic text-[7px] uppercase tracking-[0.45em] text-white/20 text-right">
              Best Telemetry
            </th>
            <th className="w-32 px-5 py-4 font-black italic text-[7px] uppercase tracking-[0.45em] text-white/20 text-right">
              Interval
            </th>
          </tr>
        </thead>

        {/* Rows */}
        <tbody>
          {results.map((entry, idx) => {
            const isLeader = entry.position === 1;
            const color = entry.teamColor || '#E10600';

            return (
              <tr
                key={entry.driverNumber}
                className="group transition-all duration-200 relative"
                style={{
                  borderBottom:
                    idx < results.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: isLeader
                    ? 'rgba(225,6,0,0.03)'
                    : idx % 2 === 0
                      ? 'transparent'
                      : 'rgba(255,255,255,0.008)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = isLeader
                    ? 'rgba(225,6,0,0.03)'
                    : idx % 2 === 0
                      ? 'transparent'
                      : 'rgba(255,255,255,0.008)';
                }}
              >
                {/* Position */}
                <td className="px-5 py-4">
                  <div className="flex justify-center">
                    <PositionBadge pos={entry.position} />
                  </div>
                </td>

                {/* Driver */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* Team stripe */}
                    <div
                      className="w-[3px] h-10 rounded-full flex-shrink-0"
                      style={{
                        background: `linear-gradient(180deg, ${color} 0%, ${color}33 100%)`,
                        boxShadow: isLeader ? `0 0 8px ${color}80` : 'none',
                      }}
                    />
                    <div className="flex flex-col leading-none gap-1">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.35em] font-mono">
                        Uplink #{entry.driverNumber}
                      </span>
                      <span className="font-black text-white uppercase italic tracking-tight text-sm">
                        {entry.driverName || `Driver ${entry.driverNumber}`}
                      </span>
                      {isLeader && (
                        <span
                          className="text-[6px] font-black uppercase tracking-[0.3em]"
                          style={{ color: 'rgba(225,6,0,0.8)' }}
                        >
                          Fastest Analysis
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Team */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] italic">
                      {entry.teamName || 'Independent'}
                    </span>
                  </div>
                </td>

                {/* Laps */}
                <td className="px-5 py-4 text-center">
                  <span className="font-mono font-bold text-xs text-white/30">
                    {entry.lapsCompleted}
                  </span>
                </td>

                {/* Fastest Lap */}
                <td className="px-5 py-4 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span
                      className="font-mono font-bold text-sm tracking-tighter"
                      style={{ color: isLeader ? '#E10600' : 'rgba(255,255,255,0.7)' }}
                    >
                      {entry.fastestLapTime ? formatLapTime(entry.fastestLapTime) : '--:--.---'}
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/15">
                      Fastest Analysis
                    </span>
                  </div>
                </td>

                {/* Interval */}
                <td className="px-5 py-4 text-right">
                  <span className="font-mono font-bold text-xs text-white/25">
                    {entry.fastestLapTime && leaderTime
                      ? isLeader
                        ? '—'
                        : formatInterval(entry.fastestLapTime, leaderTime)
                      : '---'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
