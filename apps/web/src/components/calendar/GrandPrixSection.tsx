import { SessionCard } from './SessionCard';
import { Session } from 'shared-types';

interface GrandPrixSectionProps {
  location: string;
  sessions: Session[];
}

export function GrandPrixSection({ location, sessions }: GrandPrixSectionProps) {
  const countryCode = sessions[0]?.countryCode || 'UN';
  const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-8 rounded overflow-hidden border border-border">
          <img src={flagUrl} alt={`${location} flag`} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{location}</h2>
          <p className="text-sm text-muted">{sessions[0]?.circuitShortName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map(session => (
          <SessionCard key={session.sessionKey} session={session} />
        ))}
      </div>

      <div className="h-px bg-border/50 my-4" />
    </section>
  );
}
