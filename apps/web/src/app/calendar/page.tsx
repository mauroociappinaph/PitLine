import { getSessions } from '@/lib/api/openf1';
import { GrandPrixSection } from '@/components/calendar/GrandPrixSection';
import { Session } from 'shared-types';

export default async function CalendarPage() {
  const sessions = await getSessions(2024); // Using 2024 for real data demo

  // Group sessions by location (Grand Prix)
  const gpMap = sessions.reduce(
    (acc, session) => {
      if (!acc[session.location]) {
        acc[session.location] = [];
      }
      acc[session.location].push(session);
      return acc;
    },
    {} as Record<string, Session[]>
  );

  const gps = Object.keys(gpMap).sort((a, b) => {
    const dateA = new Date(gpMap[a][0].dateStart).getTime();
    const dateB = new Date(gpMap[b][0].dateStart).getTime();
    return dateA - dateB;
  });

  return (
    <div className="flex flex-col gap-8 py-12 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Season Calendar
        </h1>
        <p className="text-text-secondary text-lg">
          Full schedule of Grand Prix sessions and events.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {gps.map(location => (
          <GrandPrixSection key={location} location={location} sessions={gpMap[location]} />
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl">
          <p className="text-text-secondary">No sessions found for the selected season.</p>
        </div>
      )}
    </div>
  );
}
