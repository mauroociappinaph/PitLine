import { getResults, getDrivers, getSessions } from '@/lib/api/openf1';
import { ResultsTable } from '@/components/results/ResultsTable';
import { formatLapTime } from '@/lib/utils/formatters';

interface PageProps {
  params: Promise<{ sessionKey: string }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { sessionKey } = await params;

  // Parallel fetch for speed
  const [sessionResults, sessionDrivers, allDrivers, allSessions] = await Promise.all([
    getResults(sessionKey),
    getDrivers(sessionKey),
    getDrivers(), // All latest drivers as fallback
    getSessions(2026),
  ]);

  const currentSession = allSessions.find(s => s.sessionKey.toString() === sessionKey);

  // Combine session-specific and global drivers for maximum coverage
  const driversPool = [...sessionDrivers, ...allDrivers];
  const uniqueDrivers = Array.from(new Map(driversPool.map(d => [d.driverNumber, d])).values());

  // Join results with driver details
  const enrichedResults = sessionResults.map(res => {
    const driver = uniqueDrivers.find(d => d.driverNumber === res.driverNumber);
    return {
      ...res,
      driverName: driver ? `${driver.firstName} ${driver.lastName}` : `Driver ${res.driverNumber}`,
      teamName: driver?.teamName,
      teamColor: driver?.teamColor,
      fastestLapTime: null,
      lapsCompleted: 0,
    };
  });

  return (
    <div className="flex flex-col gap-10 py-12 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="live-indicator" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary text-glow-cyan">
                Official Data Feed
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase font-f1 lg:text-6xl">
              {currentSession?.location} <span className="text-primary">Results</span>
            </h1>
            <p className="text-text-secondary font-mono text-sm tracking-widest uppercase bg-white/5 py-1 px-3 rounded w-fit border border-white/5">
              {currentSession?.sessionName} • {currentSession?.year} Season
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
              Circuit
            </span>
            <span className="text-sm font-bold text-white uppercase">
              {currentSession?.circuitShortName}
            </span>
          </div>
        </div>
      </header>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <ResultsTable results={enrichedResults} />
      </div>

      {sessionResults.length === 0 && (
        <div className="p-12 text-center border border-dashed border-border rounded-xl">
          <p className="text-muted">No results available for this session yet.</p>
        </div>
      )}
    </div>
  );
}
