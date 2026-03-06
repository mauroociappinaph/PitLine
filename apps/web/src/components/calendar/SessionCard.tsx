import { Session } from 'shared-types';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const startDate = new Date(session.dateStart);
  const timeString = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = startDate.toLocaleDateString([], { day: '2-digit', month: 'short' });

  const isLive =
    new Date() >= new Date(session.dateStart) && new Date() <= new Date(session.dateEnd);
  const isPast = new Date() > new Date(session.dateEnd);

  return (
    <div
      className={`card-f1 flex justify-between items-center p-4 ${isLive ? 'border-cta glow-cta animate-pulse' : ''}`}
    >
      <div className="flex flex-col">
        <span className="text-xs font-mono text-muted uppercase tracking-wider">
          {session.sessionType}
        </span>
        <span className="font-bold text-lg">{session.sessionName}</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-sm font-bold">{timeString}</span>
        <span className="text-xs text-secondary">{dateString}</span>
        {isLive && <span className="mt-1 live-badge">LIVE</span>}
        {isPast && (
          <span className="mt-1 text-[10px] text-muted font-bold uppercase">Finished</span>
        )}
      </div>
    </div>
  );
}
