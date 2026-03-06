import { TeamGrid } from '@/components/team';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-20 px-6 max-w-7xl mx-auto f1-grid-bg">
      <header className="flex flex-col gap-10 relative">
        {/* Background Accent */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="live-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">
              Live Network Status: Online
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.8] mb-4">
              PitLine <span className="text-primary text-glow-red">2026</span>
            </h1>
            <div className="f1-divider w-full md:w-1/2" />
            <p className="text-text-secondary text-2xl max-w-2xl font-medium leading-tight uppercase tracking-tight italic mt-4">
              Forging the future of racing telemetry. Real-time personnel indexing for the 2026
              Formula 1 season.
            </p>
          </div>
        </div>
      </header>

      <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-l-8 border-primary pl-8">
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-[0.3em] italic mb-2 block">
              Personnel Index
            </span>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white italic">
              Confirmed Grid
            </h2>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">
                Teams
              </span>
              <span className="text-3xl font-black text-white italic">10</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">
                Personnel
              </span>
              <span className="text-3xl font-black text-white italic">20</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 f1-grid-bg pointer-events-none opacity-20" />
          <TeamGrid />
        </div>
      </section>

      <footer className="mt-32 p-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="live-pulse !bg-white/10" />
          <p className="text-muted text-[11px] font-black uppercase tracking-[0.4em] italic">
            PitLine • Advanced Engineering 2026
          </p>
        </div>
        <div className="flex gap-8">
          {['Telemetry', 'Security', 'Compliance', 'Network'].map(item => (
            <span
              key={item}
              className="text-[9px] font-black uppercase tracking-widest text-white/20 italic hover:text-primary transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
