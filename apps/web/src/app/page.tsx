import { TeamGrid } from '@/components/team';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-16 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="live-indicator" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary text-glow-cyan">
            Telemetry Dashboard
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase font-f1 lg:text-8xl">
            PitLine <span className="text-primary italic">2026</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl font-light leading-relaxed">
            Exclusive real-time access to the F1 2026 grid. Official personnel data, team
            structures, and live performance metrics from the new era of racing.
          </p>
        </div>
        <div className="f1-divider" />
      </header>

      <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white font-f1 italic">
            Official Grid
          </h2>
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
            10 Teams • 20 Drivers
          </span>
        </div>
        <TeamGrid />
      </section>

      <footer className="mt-20 p-10 border-t border-white/5 text-center flex flex-col items-center gap-4">
        <div className="live-indicator !bg-white/20 !shadow-none" />
        <p className="text-muted text-[10px] font-mono uppercase tracking-[0.5em]">
          PitLine Systems • Engineering Excellence 2026
        </p>
      </footer>
    </div>
  );
}
