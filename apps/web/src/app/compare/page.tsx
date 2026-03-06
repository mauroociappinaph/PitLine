import { ComparisonLayout } from '@/components/comparison/ComparisonLayout';
import { AiInsightCard } from '@/components/comparison/AiInsightCard';
import { getDrivers } from '@/lib/api/openf1';

interface ComparePageProps {
  searchParams: Promise<{
    sessionKey?: string;
    driver1?: string;
    driver2?: string;
  }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const sessionKey = parseInt(params.sessionKey || '11465');
  const drivers = await getDrivers(sessionKey);

  const d1Num = parseInt(params.driver1 || drivers[0]?.driverNumber.toString() || '0');
  const d2Num = parseInt(params.driver2 || drivers[1]?.driverNumber.toString() || '0');

  const driver1 = drivers.find(d => d.driverNumber === d1Num) || drivers[0];
  const driver2 = drivers.find(d => d.driverNumber === d2Num) || drivers[1];

  return (
    <div className="flex flex-col gap-12 pb-20 px-8 max-w-7xl mx-auto f1-grid-bg min-h-screen pt-20">
      <header className="flex flex-col gap-4 animate-fade-up">
        {/* Breadcrumb / Label */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary italic">
            Análisis Visual
          </span>
          <div className="h-px grow bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] text-white uppercase italic leading-[0.85]">
            Cara a <span className="text-white/10">Cara</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl font-medium tracking-tight italic">
            Comparación directa de rendimiento entre pilotos para la sesión{' '}
            <span className="text-white font-black">#{sessionKey}</span>.
          </p>
        </div>
      </header>

      <section className="animate-in fade-in duration-1000 slide-in-from-bottom-4 flex flex-col gap-8">
        <ComparisonLayout sessionKey={sessionKey} drivers={drivers} />
        {driver1 && driver2 && driver1.driverNumber !== driver2.driverNumber && (
          <AiInsightCard sessionKey={sessionKey} driver1={driver1} driver2={driver2} />
        )}
      </section>

      {/* FOOTER BRYCE */}
      <footer className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center opacity-30">
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">
          PitLine Oracle Systems
        </span>
        <span className="text-[8px] font-black uppercase tracking-[0.3em] font-mono">
          Uplink Stable // Session {sessionKey}
        </span>
      </footer>
    </div>
  );
}
