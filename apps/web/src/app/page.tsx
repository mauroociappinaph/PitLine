import { TeamGrid } from '@/components/team';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <header className="relative overflow-hidden px-8 pt-20 pb-16 max-w-7xl mx-auto">
        {/* Background accents */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div
          className="absolute top-10 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(225,6,0,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute top-20 right-0 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col gap-8 animate-fade-up">
          {/* Label */}
          <div className="flex items-center gap-4">
            <div className="live-pulse" />
            <span
              className="text-[9px] font-black uppercase tracking-[0.6em] font-mono"
              style={{ color: 'rgba(225,6,0,0.7)' }}
            >
              Precision Telemetry
            </span>
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: 'linear-gradient(90deg, rgba(225,6,0,0.3), transparent)' }}
            />
          </div>

          {/* Title block */}
          <div className="flex flex-col gap-3">
            <h1 className="text-7xl md:text-9xl font-black tracking-[-0.04em] text-white uppercase italic leading-[0.85]">
              PitLine{' '}
              <span
                style={{
                  color: 'rgba(255,255,255,0.06)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.12)',
                }}
              >
                Oracle
              </span>
            </h1>
            <p className="text-white/50 text-base max-w-xl font-medium tracking-tight leading-relaxed md:text-lg">
              Advanced personnel indexing and real-time session analytics for the{' '}
              <span className="text-white font-black italic">2026 Formula 1</span> season.
            </p>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-3 mt-2">
            {/* System Status */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{
                background: 'rgba(13,16,23,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="live-pulse" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[7px] font-black text-white/25 uppercase tracking-[0.4em]">
                  System Status
                </span>
                <span className="text-[10px] font-bold text-white uppercase italic tracking-wide">
                  Active Node
                </span>
              </div>
            </div>

            {/* Identity */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{
                background: 'rgba(13,16,23,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#3b82f6', boxShadow: '0 0 8px rgba(59,130,246,0.6)' }}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-[7px] font-black text-white/25 uppercase tracking-[0.4em]">
                  Identity Protocol
                </span>
                <span className="text-[10px] font-bold text-white uppercase italic tracking-wide">
                  Authenticated
                </span>
              </div>
            </div>

            {/* Hardware */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{
                background: 'rgba(13,16,23,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#00d2a0', boxShadow: '0 0 8px rgba(0,210,160,0.6)' }}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-[7px] font-black text-white/25 uppercase tracking-[0.4em]">
                  Hardware Index
                </span>
                <span className="text-[10px] font-bold text-white uppercase italic tracking-wide">
                  22 Elements
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── SECTION DIVIDER ── */}
      <div className="px-8 max-w-7xl mx-auto">
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* ── TEAM GRID SECTION ── */}
      <section className="px-8 pt-12 pb-20 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="flex flex-col gap-1">
            <span
              className="text-[7px] font-black uppercase tracking-[0.5em] font-mono"
              style={{ color: 'rgba(225,6,0,0.6)' }}
            >
              Official Grid
            </span>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white leading-none">
              Constructor <span style={{ color: 'rgba(255,255,255,0.15)' }}>Network</span>
            </h2>
          </div>
          <div
            className="flex-1 h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
            }}
          />
          <span className="text-[8px] font-black text-white/15 uppercase tracking-[0.45em] font-mono hidden md:block">
            2026 Season
          </span>
        </div>

        <TeamGrid />
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-8 py-10 flex items-center justify-between max-w-7xl mx-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center font-black italic text-white text-[8px]"
            style={{
              width: '20px',
              height: '20px',
              background: 'rgba(225,6,0,0.2)',
              border: '1px solid rgba(225,6,0,0.3)',
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
            }}
          >
            PL
          </div>
          <span className="text-[8px] font-black uppercase text-white/15 tracking-[0.4em]">
            PitLine Oracle Systems
          </span>
        </div>
        <span className="text-[8px] font-black uppercase text-white/10 tracking-[0.3em] font-mono hidden md:block">
          Engineering Excellence 2026
        </span>
      </footer>
    </div>
  );
}
