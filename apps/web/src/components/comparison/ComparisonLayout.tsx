'use client';

import { useState, useEffect } from 'react';
import { LapTimeChart } from './LapTimeChart';
import { Driver } from 'shared-types';
import { useRouter, useSearchParams } from 'next/navigation';

interface ComparisonLayoutProps {
  sessionKey: number;
  drivers: Driver[];
}

export function ComparisonLayout({ sessionKey, drivers }: ComparisonLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [d1, setD1] = useState<number>(drivers[0]?.driverNumber || 0);
  const [d2, setD2] = useState<number>(drivers[1]?.driverNumber || 0);

  // Sync state with URL if URL is providing specific drivers
  useEffect(() => {
    const urlD1 = searchParams.get('driver1');
    const urlD2 = searchParams.get('driver2');
    if (urlD1) setD1(parseInt(urlD1));
    if (urlD2) setD2(parseInt(urlD2));
  }, [searchParams]);

  const updateDrivers = (newD1: number, newD2: number) => {
    setD1(newD1);
    setD2(newD2);
    // Push new params to trigger a Next.js re-render/fetch at the page level if needed,
    // though LapTimeChart handles its own fetch now. This is good practice.
    router.push(`?sessionKey=${sessionKey}&driver1=${newD1}&driver2=${newD2}`, { scroll: false });
  };
  const [activeTab, setActiveTab] = useState<'ritmo' | 'ventaja' | 'mapa'>('ritmo');

  const tabs = [
    { id: 'ritmo', label: 'Ritmo de Carrera', icon: '📈' },
    { id: 'ventaja', label: 'Ventaja de Tiempo', icon: '📊' },
    { id: 'mapa', label: 'Mapa del Circuito', icon: '📍' },
  ] as const;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* ── SELECTOR SIDEBAR ── */}
      <aside className="w-full lg:w-80 flex flex-col gap-6 sticky top-24">
        <div className="luxury-glass p-6 rounded-2xl flex flex-col gap-6">
          <header className="flex flex-col gap-1">
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary italic">
              Protocolo de Análisis
            </span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
              Análisis Comparativo
            </h2>
          </header>

          {/* TABS NAVIGATION */}
          <nav className="flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary/10 border-primary/30 text-white shadow-[0_0_20px_rgba(225,6,0,0.1)]'
                    : 'bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <span className="text-xs">{tab.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-2">
            <div className="h-px w-full bg-white/5" />

            {/* DRIVER 1 */}
            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
                Primer Piloto
              </label>
              <select
                value={d1}
                onChange={e => updateDrivers(parseInt(e.target.value), d2)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white text-xs font-bold uppercase italic focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                {drivers.map(d => (
                  <option key={d.driverNumber} value={d.driverNumber} className="bg-[#0d1017]">
                    #{d.driverNumber.toString().padStart(2, '0')} {d.lastName} ({d.teamName})
                  </option>
                ))}
              </select>
            </div>

            {/* VS DECORATOR */}
            <div className="flex items-center gap-4 py-1">
              <div className="h-px grow bg-white/5" />
              <span className="text-[10px] font-black text-white/10 italic">VS</span>
              <div className="h-px grow bg-white/5" />
            </div>

            {/* DRIVER 2 */}
            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
                Segundo Piloto
              </label>
              <select
                value={d2}
                onChange={e => updateDrivers(d1, parseInt(e.target.value))}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white text-xs font-bold uppercase italic focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                {drivers.map(d => (
                  <option key={d.driverNumber} value={d.driverNumber} className="bg-[#0d1017]">
                    #{d.driverNumber.toString().padStart(2, '0')} {d.lastName} ({d.teamName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-6 border-t border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest">
              <span className="text-white/20">Sincronización</span>
              <span className="text-primary italic">Live Telemetry active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── CHARTS MAIN AREA ── */}
      <main className="grow w-full">
        {d1 === d2 ? (
          <div className="luxury-glass p-12 flex flex-col items-center justify-center text-center gap-4 rounded-2xl border-dashed border-white/10">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 font-black italic">
              !
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                Conflict Detected
              </span>
              <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                Selección Redundante
              </h3>
              <p className="text-xs text-white/40 italic">
                Por favor selecciona dos pilotos distintos para iniciar el mapeo.
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <LapTimeChart sessionKey={sessionKey} driver1={d1} driver2={d2} activeTab={activeTab} />
          </div>
        )}
      </main>
    </div>
  );
}
