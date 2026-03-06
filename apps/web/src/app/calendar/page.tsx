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
    <div className="flex flex-col gap-24 pb-20 px-6 max-w-7xl mx-auto f1-grid-bg">
      <header className="flex flex-col gap-6 py-20 relative">
        <div className="absolute top-20 right-0 w-1/4 h-2/3 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="flex flex-col gap-4 relative">
          <div className="flex items-center gap-3">
            <div className="live-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary italic">
              Event Protocol
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-[-0.05em] text-white uppercase italic leading-[0.8]">
            Schedule <span className="text-white/10">2026</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl font-medium tracking-tight leading-relaxed uppercase italic">
            Official racing schedule verified via OpenF1 network uplink.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-32">
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
            <section key={gp.name} className="group cursor-default">
              <div className="flex flex-col md:flex-row md:items-center gap-10 opacity-20 hover:opacity-100 transition-all duration-700">
                <div className="w-32 h-20 relative rounded-lg overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl">
                  <img
                    src={flagUrl}
                    alt={gp.name}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                    {gp.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                      {gp.circuit}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[9px] font-black text-primary/40 uppercase italic tracking-widest">
                      Pending Sync
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-px bg-white/[0.02] mt-10" />
            </section>
          );
        })}
      </div>

      <footer className="mt-40 p-16 border-t border-white/5 opacity-30 text-center">
        <span className="text-[9px] font-black italic uppercase tracking-[0.8em] text-white/50">
          End of Protocol
        </span>
      </footer>
    </div>
  );
}
