import { Session } from 'shared-types';
import Link from 'next/link';

export function SessionCard({ session }: { session: Session }) {
  const isPast = new Date(session.dateEnd) < new Date();

  return (
    <div className="bg-surface-elevated border-b-2 border-primary/20 hover:border-primary p-6 rounded-md group transition-all duration-300 relative overflow-hidden">
      {/* Skewed background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-[-20deg] translate-x-12" />

      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest italic skew-x-[-15deg]">
            {session.sessionType}
          </span>
          {isPast && (
            <span className="text-[10px] font-black text-muted uppercase tracking-tighter">
              Finalized
            </span>
          )}
        </div>

        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
          {session.sessionName}
        </h3>

        <div className="flex items-center gap-3 text-[10px] font-mono text-muted uppercase tracking-[0.2em] mt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold">
              {new Date(session.dateStart).toLocaleDateString()}
            </span>
          </div>
          <span className="text-primary/40">//</span>
          <div>
            {new Date(session.dateStart).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        {isPast ? (
          <Link
            href={`/results/${session.sessionKey}`}
            className="f1-button inline-block text-center w-full"
          >
            Review Data
          </Link>
        ) : (
          <div className="flex items-center gap-3 py-3 px-4 bg-black/40 border border-white/5 rounded italic ring-1 ring-primary/20">
            <div className="live-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">
              Awaiting Green Flag
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
