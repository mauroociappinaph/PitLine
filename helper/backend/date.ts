/**
 * Funciones de utilidad para manipulación de fechas
 */

// Fallback date formatting functions if date-fns is not available
const fallbackFormat = (date: Date, pattern: string): string => {
  // Simple fallback for common patterns
  if (pattern === 'dd/MM/yyyy') {
    return date.toLocaleDateString('es-ES');
  }
  if (pattern === 'dd/MM/yyyy HH:mm') {
    return date.toLocaleString('es-ES');
  }
  return date.toISOString();
};

const fallbackParseISO = (dateString: string): Date => {
  return new Date(dateString);
};

const fallbackIsValid = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Fallback implementations for date-fns functions
 */
const fallbackAddHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

const fallbackSubHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() - hours);
  return result;
};

const fallbackStartOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const fallbackEndOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

const fallbackIsAfter = (date1: Date, date2: Date): boolean => {
  return date1.getTime() > date2.getTime();
};

const fallbackIsBefore = (date1: Date, date2: Date): boolean => {
  return date1.getTime() < date2.getTime();
};

// Use date-fns if available, otherwise use fallbacks
let formatFn = fallbackFormat;
let parseISOFn = fallbackParseISO;
let isValidFn = fallbackIsValid;

// Initialize with fallbacks
let addHoursFn: (date: Date, hours: number) => Date = fallbackAddHours;
let subHoursFn: (date: Date, hours: number) => Date = fallbackSubHours;
let startOfDayFn: (date: Date) => Date = fallbackStartOfDay;
let endOfDayFn: (date: Date) => Date = fallbackEndOfDay;
let isAfterFn: (date1: Date, date2: Date) => boolean = fallbackIsAfter;
let isBeforeFn: (date1: Date, date2: Date) => boolean = fallbackIsBefore;

try {
  // Dynamic import to handle missing dependencies gracefully
  const dateFns = eval('require("date-fns")');

  formatFn = (date: Date, pattern: string) => {
    if (pattern === 'dd/MM/yyyy') {
      return date.toLocaleDateString('es-ES');
    }
    if (pattern === 'dd/MM/yyyy HH:mm') {
      return date.toLocaleString('es-ES');
    }
    return date.toISOString();
  };
  parseISOFn = dateFns.parseISO;
  isValidFn = dateFns.isValid;

  // Use date-fns functions if available
  addHoursFn = dateFns.addHours;
  subHoursFn = dateFns.subHours;
  startOfDayFn = dateFns.startOfDay;
  endOfDayFn = dateFns.endOfDay;
  isAfterFn = dateFns.isAfter;
  isBeforeFn = dateFns.isBefore;
} catch {
  // Use fallbacks
}

/**
 * Formatea una fecha en el formato deseado
 */
export function formatDate(date: Date | string, pattern: string = 'dd/MM/yyyy HH:mm'): string {
  const dateObj = typeof date === 'string' ? parseISOFn(date) : date;

  if (!isValidFn(dateObj)) {
    throw new Error('Fecha inválida');
  }

  return formatFn(dateObj, pattern);
}

/**
 * Convierte una cadena ISO a objeto Date
 */
export function parseISODate(dateString: string): Date {
  const date = parseISOFn(dateString);

  if (!isValidFn(date)) {
    throw new Error(`Fecha ISO inválida: ${dateString}`);
  }

  return date;
}

/**
 * Obtiene el inicio del día
 */
export function getStartOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return startOfDayFn(dateObj);
}

/**
 * Obtiene el final del día
 */
export function getEndOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return endOfDayFn(dateObj);
}

/**
 * Agrega horas a una fecha
 */
export function addHoursToDate(date: Date | string, hours: number): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return addHoursFn(dateObj, hours);
}

/**
 * Resta horas a una fecha
 */
export function subHoursFromDate(date: Date | string, hours: number): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return subHoursFn(dateObj, hours);
}

/**
 * Verifica si una fecha está en un rango
 */
export function isDateInRange(
  date: Date | string,
  start: Date | string,
  end: Date | string
): boolean {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  const startObj = typeof start === 'string' ? parseISODate(start) : start;
  const endObj = typeof end === 'string' ? parseISODate(end) : end;

  return isAfterFn(dateObj, startObj) && isBeforeFn(dateObj, endObj);
}

/**
 * Obtiene la diferencia en horas entre dos fechas
 */
export function getHoursDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? parseISODate(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISODate(date2) : date2;

  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  return diffMs / (1000 * 60 * 60);
}

/**
 * Obtiene la diferencia en minutos entre dos fechas
 */
export function getMinutesDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? parseISODate(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISODate(date2) : date2;

  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  return diffMs / (1000 * 60);
}

/**
 * Obtiene la diferencia en segundos entre dos fechas
 */
export function getSecondsDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? parseISODate(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISODate(date2) : date2;

  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  return diffMs / 1000;
}

/**
 * Verifica si una fecha es hoy
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Verifica si una fecha es ayer
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  const yesterday = subHoursFromDate(new Date(), 24);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Verifica si una fecha es mañana
 */
export function isTomorrow(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  const tomorrow = addHoursToDate(new Date(), 24);

  return (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  );
}

/**
 * Obtiene el nombre del día de la semana
 */
export function getDayName(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return formatFn(dateObj, 'EEEE');
}

/**
 * Obtiene el nombre del mes
 */
export function getMonthName(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return formatFn(dateObj, 'MMMM');
}

/**
 * Verifica si una fecha es válida
 */
export function isValidDate(date: any): boolean {
  if (!date) return false;

  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return isValidFn(dateObj);
}

/**
 * Obtiene la fecha actual en formato ISO
 */
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

/**
 * Obtiene la fecha actual en formato UTC
 */
export function getCurrentUTCDate(): Date {
  return new Date(new Date().toUTCString());
}

/**
 * Convierte una fecha local a UTC
 */
export function convertToUTC(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
}

/**
 * Convierte una fecha UTC a local
 */
export function convertToLocal(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
}

/**
 * Obtiene el número de días en un mes
 */
export function getDaysInMonth(date: Date | string): number {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();

  return new Date(year, month + 1, 0).getDate();
}

/**
 * Obtiene el primer día del mes
 */
export function getFirstDayOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
}

/**
 * Obtiene el último día del mes
 */
export function getLastDayOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISODate(date) : date;
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
}

/**
 * Formatea una duración en milisegundos a un formato legible
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Obtiene la edad a partir de una fecha de nacimiento
 */
export function getAge(birthDate: Date | string): number {
  const birthObj = typeof birthDate === 'string' ? parseISODate(birthDate) : birthDate;
  const today = new Date();

  let age = today.getFullYear() - birthObj.getFullYear();
  const monthDiff = today.getMonth() - birthObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthObj.getDate())) {
    age--;
  }

  return age;
}
