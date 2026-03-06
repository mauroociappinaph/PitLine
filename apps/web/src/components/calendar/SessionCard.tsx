'use client';

import { Session } from 'shared-types';
import Link from 'next/link';

const SESSION_TYPE_COLORS: Record<string, string> = {
  Race: '#E10600',
  Qualifying: '#d4a845',
  Sprint: '#8b5cf6',
  Practice: '#3b82f6',
};

export function SessionCard({ session }: { session: Session }) {
  const now = new Date();
  const start = new Date(session.dateStart);
  const end = new Date(session.dateEnd);
  const isPast = end < now;
  const isLive = now >= start && now <= end;

  const accentColor = SESSION_TYPE_COLORS[session.sessionType] || '#3b82f6';

  const statusLabel = isLive ? 'LIVE' : isPast ? 'LOGGED' : 'PENDING';
  const statusDot = isLive
    ? 'live-pulse'
    : isPast
      ? 'w-1.5 h-1.5 rounded-full bg-white/15'
      : 'w-1.5 h-1.5 rounded-full bg-green-400/50';

  return (
    <div
      className="group relative flex flex-col gap-0 overflow-hidden rounded-xl transition-all duration-300 cursor-default"
      style={{
        background: 'linear-gradient(145deg, rgba(19,23,32,0.95) 0%, rgba(13,16,23,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Top session-type accent bar */}
      <div
        className="h-[2px] w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}55 60%, transparent 100%)`,
          boxShadow: `0 0 12px ${accentColor}44`,
          opacity: isPast ? 0.4 : 1,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accentColor}08 0%, transparent 70%)`,
        }}
      />

      <div className="p-5 flex flex-col gap-4 relative z-10">
        {/* Top row: session type + status */}
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.3em] italic"
            style={{
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}40`,
              color: accentColor,
              clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
            }}
          >
            {session.sessionType}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={statusDot} />
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/25 font-mono">
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Session name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight leading-none">
            {session.sessionName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">
              {start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
            </span>
            <span style={{ color: `${accentColor}50` }} className="text-[8px] font-black">
              //
            </span>
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">
              {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-1">
          {isPast ? (
            <Link
              href={`/results/${session.sessionKey}`}
              className="w-full flex items-center justify-center py-2.5 font-black uppercase tracking-[0.25em] text-[8px] italic transition-all duration-200 rounded"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${accentColor}20`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}50`;
                (e.currentTarget as HTMLElement).style.color = accentColor;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              Access Results
            </Link>
          ) : (
            <div
              className="w-full py-2.5 text-center rounded"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/10 font-mono">
                {isLive ? 'Session Active' : 'Awaiting Uplink'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
