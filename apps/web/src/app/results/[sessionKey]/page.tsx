import { getResults, getDrivers, getSessions } from '@/lib/api/openf1';
import { ResultsTable } from '@/components/results/ResultsTable';

export default async function ResultsPage({ params }: { params: Promise<{ sessionKey: string }> }) {
  const { sessionKey } = await params;

  // Parallel fetch for speed
  const [sessionResults, sessionDrivers, allDrivers, allSessions] = await Promise.all([
    getResults(sessionKey),
    getDrivers(sessionKey),
    getDrivers(), // All latest drivers as fallback
    getSessions(2026),
  ]);

  const currentSession = allSessions.find(s => s.sessionKey.toString() === sessionKey);

  if (!sessionResults || sessionResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center opacity-30 italic font-black text-xl text-white">
          !
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            No Uplink Data
          </h1>
          <p className="text-white/40 font-medium">
            Telemetry for this session has not been indexed yet.
          </p>
        </div>
        <a href="/calendar" className="f1-button mt-4">
          Return to Schedule
        </a>
      </div>
    );
  }

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
    <div className="flex flex-col gap-16 pb-20 px-6 max-w-7xl mx-auto f1-grid-bg">
      <header className="flex flex-col gap-12 py-20 relative">
        <div className="absolute top-20 left-10 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 relative">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="live-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic text-glow-red">
                Verified Standings
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white uppercase italic tracking-[-0.05em] leading-none">
              Record <span className="text-white/10">Index</span>
            </h1>
          </div>

          <div className="luxury-glass px-10 py-6 rounded-2xl flex flex-col gap-1 border-primary/20">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">
              Session Target
            </span>
            <span className="text-2xl font-black text-white uppercase italic tracking-tighter">
              {currentSession?.sessionName || `ID: ${sessionKey}`}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 items-center py-8 border-y border-white/[0.05] bg-white/[0.01] px-8">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1 italic">
              Location
            </span>
            <span className="text-xl font-bold text-white italic tracking-tight">
              {currentSession?.location || 'Unknown'}
            </span>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1 italic">
              Enrolled
            </span>
            <span className="text-xl font-bold text-white italic tracking-tight">
              {enrichedResults.length} Elements
            </span>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1 italic">
              Status
            </span>
            <span className="text-xl font-black text-primary italic tracking-tight uppercase">
              Official Uplink
            </span>
          </div>
        </div>
      </header>

      <section className="animate-in fade-in duration-1000">
        <ResultsTable results={enrichedResults} />
      </section>

      <footer className="mt-20 p-16 border-t border-white/5 opacity-20 text-center italic">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white">
          Data Stream: OpenF1 Oracle Finalized
        </p>
      </footer>
    </div>
  );
}
