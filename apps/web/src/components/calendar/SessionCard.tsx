import { Session } from 'shared-types';
import Link from 'next/link';

export function SessionCard({ session }: { session: Session }) {
  const isPast = new Date(session.dateEnd) < new Date();

  return (
    <div className="glass-card p-5 rounded-xl flex items-center justify-between group">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70">
            {session.sessionType}
          </span>
          {isPast && (
            <span className="px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[8px] font-black uppercase text-muted">
              Finished
            </span>
          )}
        </div>
        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
          {session.sessionName}
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted uppercase tracking-widest">
          <span>{new Date(session.dateStart).toLocaleDateString()}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>
            {new Date(session.dateStart).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        {isPast ? (
          <Link href={`/results/${session.sessionKey}`} className="btn-premium">
            Results
          </Link>
        ) : (
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted mb-1">
              Upcoming
            </span>
            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-primary/20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
