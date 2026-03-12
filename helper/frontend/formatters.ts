/**
 * Formateo de tiempos para resultados de Fórmula 1
 */

/**
 * Formatea segundos en formato M:SS.mmm para resultados de carreras.
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
 * Calcula el intervalo entre dos tiempos de vuelta.
 */
export function formatInterval(current: number, leader: number): string {
  const delta = current - leader;
  if (delta === 0) return 'INTERVAL';
  return `+${delta.toFixed(3)}s`;
}

/**
 * Formatea una fecha en formato legible para el calendario de F1.
 */
export function formatSessionDate(date: string | Date): string {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };
  return d.toLocaleDateString('es-ES', options);
}

/**
 * Formatea el nombre de una sesión para mostrarlo de forma amigable.
 */
export function formatSessionName(sessionType: string, sessionName?: string): string {
  const sessionNames: Record<string, string> = {
    'Practice 1': 'Entrenamientos Libres 1',
    'Practice 2': 'Entrenamientos Libres 2',
    'Practice 3': 'Entrenamientos Libres 3',
    'Sprint Shootout': 'Sprint Shootout',
    Sprint: 'Carrera Sprint',
    Race: 'Carrera Principal',
  };

  if (sessionName && sessionNames[sessionName]) {
    return sessionNames[sessionName];
  }

  return sessionType;
}

/**
 * Formatea el nombre del circuito para mostrarlo de forma consistente.
 */
export function formatCircuitName(circuitName: string): string {
  // Mapeo de nombres de circuitos comunes
  const circuitMappings: Record<string, string> = {
    'Circuit de Barcelona-Catalunya': 'Barcelona-Catalunya',
    'Circuit Gilles Villeneuve': 'Montreal',
    'Circuit de Monaco': 'Mónaco',
    'Silverstone Circuit': 'Silverstone',
    'Circuit de Spa-Francorchamps': 'Spa-Francorchamps',
    Hungaroring: 'Hungaroring',
    'Marina Bay Street Circuit': 'Singapur',
    'Circuit of the Americas': 'Austin',
    'Autódromo Hermanos Rodríguez': 'Ciudad de México',
    'Autódromo José Carlos Pace': 'São Paulo',
    'Yas Marina Circuit': 'Abu Dabi',
  };

  return circuitMappings[circuitName] || circuitName;
}

/**
 * Formatea el nombre del país para mostrarlo de forma consistente.
 */
export function formatCountryName(countryCode: string): string {
  const countryNames: Record<string, string> = {
    ES: 'España',
    CA: 'Canadá',
    MC: 'Mónaco',
    GB: 'Reino Unido',
    BE: 'Bélgica',
    HU: 'Hungría',
    SG: 'Singapur',
    US: 'Estados Unidos',
    MX: 'México',
    BR: 'Brasil',
    AE: 'Emiratos Árabes Unidos',
    IT: 'Italia',
    DE: 'Alemania',
    NL: 'Países Bajos',
    AU: 'Australia',
    JP: 'Japón',
    KZ: 'Kazajistán',
    CN: 'China',
    SA: 'Arabia Saudita',
  };

  return countryNames[countryCode] || countryCode;
}
