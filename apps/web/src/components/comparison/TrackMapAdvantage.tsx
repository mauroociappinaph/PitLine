'use client';

import { Shield, FastForward, Gauge } from 'lucide-react';

interface TrackMapAdvantageProps {
  data: {
    drivers: {
      driver1: any;
      driver2: any;
    };
    data: any[];
    sectorAnalysis: {
      s1: number;
      s2: number;
      s3: number;
    };
  };
}

export function TrackMapAdvantage({ data }: TrackMapAdvantageProps) {
  const { driver1, driver2 } = data.drivers;
  const { s1, s2, s3 } = data.sectorAnalysis;

  const getWinner = (id: number) => (id === 1 ? driver1 : driver2);

  const circuits: Record<string, any> = {
    sakhir: {
      bg: 'M 200 350 L 500 350 L 650 200 L 500 50 L 200 100 L 100 200 Z',
      s1: 'M 200 350 L 500 350 L 650 200',
      s2: 'M 650 200 L 500 50 L 200 100',
      s3: 'M 200 100 L 100 200 L 200 350',
      labels: { s1: { x: 400, y: 380 }, s2: { x: 500, y: 30 }, s3: { x: 80, y: 200 } },
    },
    default: {
      bg: 'M 100 200 Q 100 50 400 50 Q 700 50 700 200 Q 700 350 400 350 Q 100 350 100 200',
      s1: 'M 100 200 Q 100 50 350 50',
      s2: 'M 350 50 L 550 50 Q 700 50 700 200',
      s3: 'M 700 200 Q 700 350 400 350 Q 100 350 100 200',
      labels: { s1: { x: 80, y: 80 }, s2: { x: 680, y: 80 }, s3: { x: 400, y: 380 } },
    },
  };

  const layout = circuits.sakhir; // Force Sakhir for Session 11465 / Bahrain

  const sectorDetails = [
    { id: 'Sector 1', winner: getWinner(s1), label: 'S1', d: layout.s1 },
    { id: 'Sector 2', winner: getWinner(s2), label: 'S2', d: layout.s2 },
    { id: 'Sector 3', winner: getWinner(s3), label: 'S3', d: layout.s3 },
  ];

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in zoom-in-95 duration-700">
      <div className="luxury-glass p-8 rounded-3xl flex flex-col items-center gap-12 relative overflow-hidden">
        {/* BACKGROUND DECOR */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />

        <header className="w-full flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20 italic">
              Global Positioning Analysis
            </span>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">
              Mapa de Ventaja Real
            </h3>
            <p className="text-[9px] text-white/40 font-bold uppercase italic tracking-widest mt-1">
              Sectores oficiales de F1 basados en telemetría real
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-end gap-1 font-black uppercase tracking-tighter italic">
              <span className="text-[8px] text-white/20">Driver 1</span>
              <span className="text-xs" style={{ color: driver1.teamColor }}>
                {driver1.lastName}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-start gap-1 font-black uppercase tracking-tighter italic">
              <span className="text-[8px] text-white/20">Driver 2</span>
              <span className="text-xs" style={{ color: driver2.teamColor }}>
                {driver2.lastName}
              </span>
            </div>
          </div>
        </header>

        {/* TRACK SVG */}
        <div className="relative w-full max-w-2xl py-12 flex justify-center items-center">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.02)]"
          >
            <path
              d={layout.bg}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="45"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {sectorDetails.map((s, i) => (
              <path
                key={i}
                d={s.d}
                fill="none"
                stroke={s.winner.teamColor}
                strokeWidth="15"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-1000"
              />
            ))}

            {/* SECTOR LABELS */}
            <text
              x={layout.labels.s1.x}
              y={layout.labels.s1.y}
              fill="white"
              fontSize="14"
              fontWeight="900"
              className="italic opacity-30 tracking-tighter"
            >
              S1
            </text>
            <text
              x={layout.labels.s2.x}
              y={layout.labels.s2.y}
              fill="white"
              fontSize="14"
              fontWeight="900"
              className="italic opacity-30 tracking-tighter"
            >
              S2
            </text>
            <text
              x={layout.labels.s3.x}
              y={layout.labels.s3.y}
              fill="white"
              fontSize="14"
              fontWeight="900"
              className="italic opacity-30 tracking-tighter"
            >
              S3
            </text>
          </svg>

          {/* INSIGHT CARD */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="luxury-glass p-6 rounded-2xl border-white/10 bg-black/60 backdrop-blur-xl flex flex-col items-center gap-2 translate-y-4">
              <div className="flex items-center gap-2">
                <Gauge size={14} className="text-primary italic animate-pulse" />
                <span className="text-[10px] font-black text-white italic uppercase tracking-widest">
                  Battle Insight
                </span>
              </div>
              <div className="h-px w-full bg-white/10 mt-1" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1 italic">
                Dominio General
              </span>
              <span
                className="text-3xl font-black italic tracking-tighter uppercase leading-none"
                style={{ color: driver1.teamColor }}
              >
                {driver1.lastName}
              </span>
              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mt-1 italic text-center">
                Gana en{' '}
                {s1 + s2 + s3 === 4
                  ? '1 sector'
                  : s1 + s2 + s3 === 3
                    ? 'todos los sectores'
                    : '2 sectores'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTOR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {sectorDetails.map((s, idx) => (
            <div
              key={idx}
              className="luxury-glass p-5 rounded-2xl flex flex-col gap-3 border-white/5 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-black text-white italic tracking-tighter uppercase">
                  {s.id}
                </span>
                <Shield
                  size={12}
                  className="text-white/10 group-hover:text-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                  Personnel Advantage
                </span>
                <span
                  className="text-xl font-black italic uppercase italic tracking-tighter"
                  style={{ color: s.winner.teamColor }}
                >
                  {s.winner.lastName}
                </span>
              </div>
              <div className="mt-2 text-[8px] text-white/40 flex items-center gap-2 italic uppercase font-bold tracking-widest">
                <FastForward size={10} className="text-primary" />
                <span>Sector Dominado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
