'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Target } from 'lucide-react';

interface QualyPredictionCardProps {
  sessionKey: number;
}

export function QualyPredictionCard({ sessionKey }: QualyPredictionCardProps) {
  const [prediction, setPrediction] = useState<string>('');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setIsPredicting(true);
    setPrediction('');
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/ai/predict-qualy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionKey }),
      });

      if (!response.body) throw new Error('No body in response');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const messages = chunk.split('\n\n');

        for (const message of messages) {
          if (message.startsWith('data: ')) {
            const data = message.replace('data: ', '').trim();
            if (data === '[DONE]') {
              setIsPredicting(false);
              return;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.content) {
                setPrediction(prev => prev + parsed.content);
              }
            } catch (e) {
              // Ignore parse errors on partial chunks
            }
          }
        }
      }
    } catch (e: any) {
      console.error('Prediction Error:', e);
      setError(e.message || 'Error al generar la predicción');
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="luxury-glass p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden group border border-primary/10 hover:border-primary/20 transition-all duration-500 w-full mb-12">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 transition-opacity duration-1000" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/2 rounded-full blur-[80px] -ml-32 -mb-32 opacity-50" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 relative">
        <div className="flex gap-5 items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors shadow-[0_0_20px_rgba(225,6,0,0.1)]">
            <Target size={28} className="text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-2">
              Strategy Department
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </span>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
              Qualifying Oracle <span className="text-white/20">v1.0</span>
            </h3>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={isPredicting}
          className="f1-button flex items-center gap-3 py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
        >
          {isPredicting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Sparkles size={18} className="group-hover/btn:animate-pulse text-primary" />
          )}
          <span className="uppercase font-black italic tracking-widest text-xs">
            {isPredicting ? 'Calculando Probabilidades...' : 'Generar Predicción'}
          </span>
        </button>
      </div>

      <div className="z-10 relative">
        <div className="h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent mb-8" />

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase italic tracking-widest">
            {error}
          </div>
        )}

        {!prediction && !isPredicting && !error && (
          <p className="text-sm text-white/30 italic font-medium leading-relaxed max-w-2xl">
            Nuestra IA analizará los tiempos de práctica, la evolución de la pista y el ritmo de
            carrera para predecir el Top 5 de la clasificación. Haz clic en el botón para iniciar el
            motor de estrategia.
          </p>
        )}

        {(prediction || isPredicting) && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-sm text-white/80 leading-relaxed font-medium tracking-wide bg-white/[0.02] p-6 rounded-2xl border border-white/5 whitespace-pre-wrap">
              {prediction ? (
                <div dangerouslySetInnerHTML={{ __html: prediction.replace(/\\n/g, '<br/>') }} />
              ) : (
                <div className="flex items-center gap-3 text-white/40 italic animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Ejecutando simulaciones Monte Carlo...
                </div>
              )}
              {isPredicting && prediction && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse align-middle" />
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 italic">
                Powered by NVIDIA NIM // Model: z-ai/glm5
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
