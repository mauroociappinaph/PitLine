import { Session } from 'shared-types';
import { SessionCard } from './SessionCard';
import Image from 'next/image';

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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-12 lg:w-24 lg:h-16 rounded-lg overflow-hidden border border-white/10 shadow-2xl skew-x-[-10deg]">
            <Image src={flagUrl} alt={country} fill className="object-cover scale-110" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase font-f1 italic tracking-tighter">
              {name}
            </h2>
            <div className="flex items-center gap-2 text-muted font-mono text-[10px] uppercase tracking-widest">
              <span>{location}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className={status === 'LIVE' ? 'text-primary font-bold animate-pulse' : ''}>
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px shrink lg:h-8 lg:w-px bg-white/10" />

        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">
              Sessions
            </span>
            <span className="text-lg font-bold text-white">{sessions.length} / 5</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map(session => (
          <SessionCard key={session.sessionKey} session={session} />
        ))}
      </div>
    </section>
  );
}
