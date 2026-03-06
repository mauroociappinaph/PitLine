import { Session } from 'shared-types';
import Image from 'next/image';
import { SessionCard } from './SessionCard';

interface GrandPrixSectionProps {
  name: string;
  location: string;
  country: string;
  sessions: Session[];
}

export function GrandPrixSection({ name, location, country, sessions }: GrandPrixSectionProps) {
  const isLive = sessions.some(s => {
    const now = new Date();
    return now >= new Date(s.dateStart) && now <= new Date(s.dateEnd);
  });
  const isPast = sessions.every(s => new Date(s.dateEnd) < new Date());
  const status = isLive ? 'LIVE' : isPast ? 'COMPLETED' : 'UPCOMING';

  const flagUrl = country
    ? `https://flagcdn.com/w160/${country.toLowerCase()}.png`
    : 'https://flagcdn.com/w160/un.png';

  return (
    <section className="flex flex-col gap-8">
      {/* Grand Prix Header */}
      <div
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(19,23,32,0.8) 0%, rgba(13,16,23,0.6) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex items-center gap-6">
          {/* Flag */}
          <div
            className="relative w-20 h-12 lg:w-24 lg:h-16 overflow-hidden flex-shrink-0"
            style={{
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)',
            }}
          >
            <Image src={flagUrl} alt={country} fill className="object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span
                className={`status-pill font-mono ${
                  status === 'LIVE'
                    ? 'status-live'
                    : status === 'COMPLETED'
                      ? 'status-completed'
                      : 'status-upcoming'
                }`}
              >
                {status === 'LIVE' && <span className="live-pulse w-1.5 h-1.5" />}
                {status}
              </span>
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] font-mono">
                {location}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
              {name}
            </h2>
          </div>
        </div>

        {/* Right side stats */}
        <div className="flex items-center gap-6">
          <div
            className="w-px h-12 hidden lg:block"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          />
          <div className="flex flex-col items-end gap-1">
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] font-mono">
              Enrolled
            </span>
            <span className="text-xl font-black text-white italic uppercase tracking-tight">
              {sessions.length} Sessions
            </span>
          </div>
        </div>
      </div>

      {/* Session cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sessions.map(session => (
          <SessionCard key={session.sessionKey} session={session} />
        ))}
      </div>
    </section>
  );
}
