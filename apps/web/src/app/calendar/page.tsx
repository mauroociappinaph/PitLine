import { getSessions } from '@/lib/api/openf1';
import { GrandPrixSection } from '@/components/calendar/GrandPrixSection';
import { Session } from 'shared-types';

const EXPECTED_2026_GPS = [
  {
    name: 'Sakhir',
    locationMatch: ['Bahrain', 'Sakhir'],
    country: 'BH',
    circuit: 'Bahrain International Circuit',
  },
  {
    name: 'Melbourne',
    locationMatch: ['Melbourne'],
    country: 'AU',
    circuit: 'Albert Park Circuit',
  },
  { name: 'Jeddah', locationMatch: ['Jeddah'], country: 'SA', circuit: 'Jeddah Corniche Circuit' },
  {
    name: 'Suzuka',
    locationMatch: ['Suzuka'],
    country: 'JP',
    circuit: 'Suzuka International Racing Course',
  },
  {
    name: 'Shanghai',
    locationMatch: ['Shanghai'],
    country: 'CN',
    circuit: 'Shanghai International Circuit',
  },
  {
    name: 'Miami',
    locationMatch: ['Miami'],
    country: 'US',
    circuit: 'Miami International Autodrome',
  },
  {
    name: 'Imola',
    locationMatch: ['Imola'],
    country: 'IT',
    circuit: 'Autodromo Enzo e Dino Ferrari',
  },
  { name: 'Monaco', locationMatch: ['Monaco'], country: 'MC', circuit: 'Circuit de Monaco' },
  {
    name: 'Barcelona',
    locationMatch: ['Barcelona'],
    country: 'ES',
    circuit: 'Circuit de Barcelona-Catalunya',
  },
  {
    name: 'Montreal',
    locationMatch: ['Montreal'],
    country: 'CA',
    circuit: 'Circuit Gilles Villeneuve',
  },
  { name: 'Spielberg', locationMatch: ['Spielberg'], country: 'AT', circuit: 'Red Bull Ring' },
  {
    name: 'Silverstone',
    locationMatch: ['Silverstone'],
    country: 'GB',
    circuit: 'Silverstone Circuit',
  },
  { name: 'Budapest', locationMatch: ['Budapest'], country: 'HU', circuit: 'Hungaroring' },
  { name: 'Spa', locationMatch: ['Spa'], country: 'BE', circuit: 'Circuit de Spa-Francorchamps' },
  { name: 'Zandvoort', locationMatch: ['Zandvoort'], country: 'NL', circuit: 'Circuit Zandvoort' },
  { name: 'Monza', locationMatch: ['Monza'], country: 'IT', circuit: 'Autodromo Nazionale Monza' },
  { name: 'Baku', locationMatch: ['Baku'], country: 'AZ', circuit: 'Baku City Circuit' },
  {
    name: 'Singapore',
    locationMatch: ['Singapore'],
    country: 'SG',
    circuit: 'Marina Bay Street Circuit',
  },
  { name: 'Austin', locationMatch: ['Austin'], country: 'US', circuit: 'Circuit of the Americas' },
  {
    name: 'Mexico City',
    locationMatch: ['Mexico City'],
    country: 'MX',
    circuit: 'Autódromo Hermanos Rodríguez',
  },
  {
    name: 'Sao Paulo',
    locationMatch: ['Sao Paulo', 'Interlagos'],
    country: 'BR',
    circuit: 'Autódromo José Carlos Pace',
  },
  {
    name: 'Las Vegas',
    locationMatch: ['Las Vegas'],
    country: 'US',
    circuit: 'Las Vegas Strip Circuit',
  },
  {
    name: 'Lusail',
    locationMatch: ['Lusail'],
    country: 'QA',
    circuit: 'Lusail International Circuit',
  },
  {
    name: 'Yas Marina',
    locationMatch: ['Yas Marina', 'Abu Dhabi'],
    country: 'AE',
    circuit: 'Yas Marina Circuit',
  },
];

export default async function CalendarPage() {
  const sessions = await getSessions(2026);

  // Group sessions by location
  const gpMap = sessions.reduce(
    (acc, session) => {
      const loc = session.location;
      if (!acc[loc]) {
        acc[loc] = [];
      }
      acc[loc].push(session);
      return acc;
    },
    {} as Record<string, Session[]>
  );

  // Create a list of all events (Real GPs + Placeholders)
  const allEvents = EXPECTED_2026_GPS.map(gp => {
    const matchedLocation = Object.keys(gpMap).find(loc =>
      gp.locationMatch.some(match => loc.toLowerCase().includes(match.toLowerCase()))
    );
    const sessionsForGp = matchedLocation ? gpMap[matchedLocation] : [];

    // Determine the earliest date for sorting
    const earliestDate = sessionsForGp.length > 0 ? new Date(sessionsForGp[0].dateStart) : null;

    return {
      gp,
      sessions: sessionsForGp,
      matchedLocation,
      earliestDate,
    };
  });

  // Sort events: Real ones by date, then placeholders (keeping their relative order)
  // Actually, since we want a chronological calendar, we should probably have
  // approximate dates for placeholders too, but for now we'll prioritize real data
  // and then follow the EXPECTED_2026_GPS order.

  return (
    <div className="flex flex-col gap-12 py-12 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="live-indicator" />
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase font-f1 lg:text-7xl">
            Temporada <span className="text-primary">2026</span>
          </h1>
        </div>
        <p className="text-text-secondary text-xl max-w-2xl font-light leading-relaxed">
          The ultimate racing calendar. Track live sessions, official standings, and upcoming Grand
          Prix events with real-time telemetry updates.
        </p>
        <div className="f1-divider" />
      </header>

      <div className="flex flex-col gap-12">
        {allEvents.map(({ gp, sessions: sessionsForGp, matchedLocation }) => {
          const hasData = sessionsForGp.length > 0;

          if (hasData) {
            return (
              <GrandPrixSection
                key={gp.name}
                name={gp.name}
                location={matchedLocation || gp.name}
                country={gp.country}
                sessions={sessionsForGp}
              />
            );
          }

          // Placeholder for future GPs
          const flagUrl = gp.country
            ? `https://flagcdn.com/w80/${gp.country.toLowerCase()}.png`
            : 'https://flagcdn.com/w80/un.png';
          return (
            <section
              key={gp.name}
              className="opacity-40 grayscale filter transition-all hover:grayscale-0 hover:opacity-100 group"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-8 rounded overflow-hidden border border-border group-hover:border-secondary transition-colors">
                  <img
                    src={flagUrl}
                    alt={`${gp.name} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {gp.name}
                  </h2>
                  <p className="text-sm text-muted">{gp.circuit}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-surface border border-border rounded text-muted">
                    Próximamente
                  </span>
                </div>
              </div>
              <div className="h-px bg-border/20 my-4" />
            </section>
          );
        })}
      </div>

      <footer className="mt-20 p-10 border-t border-white/5 text-center flex flex-col items-center gap-4">
        <div className="live-indicator !bg-white/20 !shadow-none" />
        <p className="text-muted text-[10px] font-mono uppercase tracking-[0.5em]">
          Powered by OpenF1 API • PitLine 2026 Systems
        </p>
      </footer>
    </div>
  );
}
