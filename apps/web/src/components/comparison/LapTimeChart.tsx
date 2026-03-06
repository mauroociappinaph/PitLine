'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { TrackMapAdvantage } from './TrackMapAdvantage';

interface ComparisonData {
  lapNumber: number;
  driver1: {
    lapDuration: number | null;
    s1: number | null;
    s2: number | null;
    s3: number | null;
  };
  driver2: {
    lapDuration: number | null;
    s1: number | null;
    s2: number | null;
    s3: number | null;
  };
  delta: number | null;
}

interface ComparisonResponse {
  sessionKey: number;
  drivers: {
    driver1: any;
    driver2: any;
  };
  data: ComparisonData[];
  sectorAnalysis: {
    s1: number;
    s2: number;
    s3: number;
  };
}

export function LapTimeChart({
  sessionKey,
  driver1,
  driver2,
  activeTab,
}: {
  sessionKey: number;
  driver1: number;
  driver2: number;
  activeTab: 'ritmo' | 'ventaja' | 'mapa';
}) {
  const [data, setData] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/comparison?sessionKey=${sessionKey}&driver1=${driver1}&driver2=${driver2}`
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch comparison data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sessionKey, driver1, driver2]);

  if (loading)
    return (
      <div className="p-12 text-center text-white/20 uppercase font-black italic animate-pulse">
        Sincronizando Telemetría...
      </div>
    );
  if (!data)
    return (
      <div className="p-12 text-center text-white/20 uppercase font-black italic">
        Datos no disponibles
      </div>
    );

  const chartData = data.data
    .filter(d => d.driver1.lapDuration && d.driver2.lapDuration)
    .map(d => ({
      lap: d.lapNumber,
      [data.drivers.driver1.lastName]: d.driver1.lapDuration,
      [data.drivers.driver2.lastName]: d.driver2.lapDuration,
      delta: d.delta,
    }));

  if (activeTab === 'mapa') {
    return <TrackMapAdvantage data={data} />;
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── LAP TIMES LINE CHART ── */}
      {activeTab === 'ritmo' && (
        <div className="luxury-glass p-0 rounded-2xl flex flex-col gap-4 overflow-hidden border-none bg-transparent shadow-none">
          <div className="luxury-glass p-6 rounded-2xl flex flex-col gap-4">
            <header className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20">
                  Consistencia por vuelta
                </span>
                <h3 className="text-sm font-black text-white uppercase italic tracking-tight">
                  Ritmo de Carrera
                </h3>
                <p className="text-[7px] text-primary font-bold uppercase italic tracking-widest mt-0.5">
                  Bajando la línea = Más velocidad
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: data.drivers.driver1.teamColor }}
                  />
                  <span className="text-[8px] font-black text-white/60 uppercase">
                    {data.drivers.driver1.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: data.drivers.driver2.teamColor }}
                  />
                  <span className="text-[8px] font-black text-white/60 uppercase">
                    {data.drivers.driver2.lastName}
                  </span>
                </div>
              </div>
            </header>

            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="lap"
                    stroke="rgba(255,255,255,0.2)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    label={{
                      value: 'NÚMERO DE VUELTA',
                      position: 'insideBottom',
                      offset: -5,
                      fontSize: 8,
                      fill: 'rgba(255,255,255,0.2)',
                      fontWeight: 900,
                    }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.2)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={['dataMin - 0.5', 'dataMax + 0.5']}
                    tickFormatter={val => `${val.toFixed(1)}s`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#0d1017',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '10px',
                    }}
                    itemStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                  />
                  <Line
                    type="monotone"
                    dataKey={data.drivers.driver1.lastName}
                    stroke={data.drivers.driver1.teamColor}
                    strokeWidth={3}
                    dot={{ r: 2, fill: data.drivers.driver1.teamColor }}
                    activeDot={{ r: 5, stroke: 'white', strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey={data.drivers.driver2.lastName}
                    stroke={data.drivers.driver2.teamColor}
                    strokeWidth={3}
                    dot={{ r: 2, fill: data.drivers.driver2.teamColor }}
                    activeDot={{ r: 5, stroke: 'white', strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ── DELTA BAR CHART ── */}
      {activeTab === 'ventaja' && (
        <div className="luxury-glass p-6 rounded-2xl flex flex-col gap-4">
          <header className="flex flex-col gap-1">
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20">
              Comparativa Directa
            </span>
            <h3 className="text-sm font-black text-white uppercase italic tracking-tight">
              Ventaja de Tiempo
            </h3>
            <p className="text-[7px] text-white/40 font-bold uppercase italic tracking-widest mt-0.5 underline decoration-primary/50 underline-offset-2">
              Muestra quién va ganando terreno en cada vuelta
            </p>
          </header>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="lap"
                  fontSize={10}
                  stroke="rgba(255,255,255,0.2)"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={val => `${val > 0 ? '+' : ''}${val.toFixed(2)}s`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    background: '#0d1017',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '10px',
                  }}
                />
                <Bar dataKey="delta" radius={[2, 2, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.delta && entry.delta > 0
                          ? data.drivers.driver2.teamColor
                          : data.drivers.driver1.teamColor
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em] text-center italic">
            Barras hacia ARRIBA favorecen a {data.drivers.driver2.lastName} // Barras hacia ABAJO
            favorecen a {data.drivers.driver1.lastName}
          </p>
        </div>
      )}
    </div>
  );
}
