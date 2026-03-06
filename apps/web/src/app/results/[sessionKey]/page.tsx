import { getResults, getDrivers, getSessions } from '@/lib/api/openf1';
import { ResultsTable } from '@/components/results/ResultsTable';
import { formatLapTime } from '@/lib/utils/formatters';

interface PageProps {
  params: Promise<{ sessionKey: string }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { sessionKey } = await params;

  // Parallel fetch for speed
  const [sessionResults, allDrivers, allSessions] = await Promise.all([
    getResults(sessionKey),
    getDrivers(sessionKey),
    getSessions(2026),
  ]);

  const currentSession = allSessions.find(s => s.sessionKey.toString() === sessionKey);

  // Join results with driver details
  const enrichedResults = sessionResults.map(res => {
    const driver = allDrivers.find(d => d.driverNumber === res.driverNumber);
    return {
      ...res,
      driverName: driver ? `${driver.firstName} ${driver.lastName}` : `Driver ${res.driverNumber}`,
      teamName: driver?.teamName,
      teamColor: driver?.teamColor,
      fastestLapTime: null, // We'd need to fetch laps for this if really needed now
      lapsCompleted: 0, // Same here
    };
  });

  return (
    <div className="flex flex-col gap-8 py-12 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-fira">
              Session Results
            </h1>
            <p className="text-secondary font-mono text-sm tracking-widest uppercase">
              {currentSession?.location} • {currentSession?.sessionName}
            </p>
          </div>
          <span className="live-badge">Official Standings</span>
        </div>
      </header>

      <ResultsTable results={enrichedResults} />

      {sessionResults.length === 0 && (
        <div className="p-12 text-center border border-dashed border-border rounded-xl">
          <p className="text-muted">No results available for this session yet.</p>
        </div>
      )}
    </div>
  );
}
