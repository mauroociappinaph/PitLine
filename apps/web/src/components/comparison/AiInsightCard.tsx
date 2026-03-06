'use client';

import { useState, useEffect } from 'react';
import { Cpu, Zap } from 'lucide-react';
import { Driver } from 'shared-types';

interface AiInsightCardProps {
  sessionKey: number;
  driver1: Driver;
  driver2: Driver;
}

export function AiInsightCard({ sessionKey, driver1, driver2 }: AiInsightCardProps) {
  const [insight, setInsight] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    setInsight('');
    setIsTyping(true);
    setError(false);

    const fetchAnalysis = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/ai/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionKey,
            driver1: driver1.driverNumber,
            driver2: driver2.driverNumber,
          }),
        });

        if (!response.body) throw new Error('No body in response');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done || !active) break;

          const chunk = decoder.decode(value, { stream: true });
          const messages = chunk.split('\n\n');

          for (const message of messages) {
            if (message.startsWith('data: ')) {
              const data = message.replace('data: ', '').trim();
              if (data === '[DONE]') {
                if (active) setIsTyping(false);
                return;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.content && active) {
                  setInsight(prev => prev + parsed.content);
                }
              } catch (e) {
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
        if (active) setIsTyping(false);
      } catch (e) {
        console.error('AI Error:', e);
        if (active) {
          setError(true);
          setIsTyping(false);
          setInsight('The Oracle is currently establishing a connection. AI Analysis unavailable.');
        }
      }
    };

    if (driver1 && driver2) {
      fetchAnalysis();
    }

    return () => {
      active = false;
    };
  }, [sessionKey, driver1?.driverNumber, driver2?.driverNumber]);

  return (
    <div className="luxury-glass p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors w-full">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-opacity duration-1000" />

      <header className="flex justify-between items-start z-10 w-full relative">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
            <Cpu size={24} className={isTyping ? 'text-primary animate-pulse' : 'text-white/40'} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-2">
              Performance Engineer
              {isTyping && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />}
            </span>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">
              Análisis Operativo
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
          <Zap size={10} className="text-[#FFB800] fill-[#FFB800]" />
          <span className="text-[8px] font-black tracking-widest uppercase text-white/50">
            {isTyping ? 'Inferencia Activa' : 'Análisis Completo'}
          </span>
        </div>
      </header>

      <div className="z-10 relative">
        <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-6" />

        {error ? (
          <p className="text-sm text-red-400 font-medium italic tracking-tight">
            Error de conexión con la IA. Integre la llave NVIDIA.
          </p>
        ) : (
          <div className="text-sm text-white/70 leading-relaxed font-medium tracking-wide">
            {insight ? (
              <span dangerouslySetInnerHTML={{ __html: insight.replace(/\\n/g, '<br/>') }} />
            ) : (
              <span className="animate-pulse text-white/30 italic">
                Sincronizando telemetría y generando reporte táctico...
              </span>
            )}
            {isTyping && (
              <span className="inline-block w-1 h-3 ml-1 bg-primary animate-pulse align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
