/**
 * Formats seconds into M:SS.mmm format for racing results.
 */
export function formatLapTime(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return '--:--.---';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr = minutes > 0 ? `${minutes}:` : '';
  const secondsStr = remainingSeconds.toFixed(3).padStart(6, '0');

  return `${minutesStr}${secondsStr}`;
}

/**
 * Calculates the interval between two lap times.
 */
export function formatInterval(current: number, leader: number): string {
  const delta = current - leader;
  if (delta === 0) return 'INTERVAL';
  return `+${delta.toFixed(3)}s`;
}
