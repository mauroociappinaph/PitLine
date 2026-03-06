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

  const gpMap = sessions.reduce(
    (acc, session) => {
      const loc = session.location;
      if (!acc[loc]) acc[loc] = [];
      acc[loc].push(session);
      return acc;
    },
    {} as Record<string, Session[]>
  );

  const allEvents = EXPECTED_2026_GPS.map(gp => {
    const matchedLocation = Object.keys(gpMap).find(loc =>
      gp.locationMatch.some(match => loc.toLowerCase().includes(match.toLowerCase()))
    );
    const sessionsForGp = matchedLocation ? gpMap[matchedLocation] : [];
    return { gp, sessions: sessionsForGp, matchedLocation };
  });

  return (
    <div className="flex flex-col gap-20 py-20 px-6 max-w-7xl mx-auto f1-grid-bg">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-l-8 border-primary pl-8">
          <div className="flex items-center gap-3">
            <div className="live-pulse" />
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] italic">
              Network Schedule
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.8] mb-4">
            Season <span className="text-primary">2026</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl font-medium uppercase italic tracking-tight leading-relaxed">
            The complete 2026 racing protocol. Official sessions, validated results, and real-time
            Grand Prix scheduling.
          </p>
        </div>
        <div className="f1-divider" />
      </header>

      <div className="flex flex-col gap-24">
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

          const flagUrl = gp.country
            ? `https://flagcdn.com/w160/${gp.country.toLowerCase()}.png`
            : 'https://flagcdn.com/w160/un.png';

          return (
            <section
              key={gp.name}
              className="opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-10">
                <div className="w-40 h-24 relative skew-x-[-15deg] overflow-hidden border border-white/10">
                  <img
                    src={flagUrl}
                    alt={gp.name}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                    {gp.name}
                  </h2>
                  <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em] font-mono mt-1">
                    {gp.circuit}
                  </span>
                </div>
                <div className="md:ml-auto">
                  <div className="px-6 py-2 border border-white/10 rounded-sm italic uppercase text-[10px] font-black text-muted tracking-widest">
                    Awaiting Event
                  </div>
                </div>
              </div>
              <div className="f1-divider opacity-20 mt-10" />
            </section>
          );
        })}
      </div>

      <footer className="mt-40 p-16 border-t border-white/5 text-center flex flex-col items-center gap-4">
        <div className="live-pulse !bg-white/10" />
        <p className="text-muted text-[11px] font-black uppercase tracking-[0.5em] italic">
          PitLine Systems • Global Racing Federation 2026
        </p>
      </footer>
    </div>
  );
}
