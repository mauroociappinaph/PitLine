/**
 * Funciones de utilidad genéricas para PitLine
 */

/**
 * Genera un ID único
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Formatea un número con separadores de miles
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num);
}

/**
 * Formatea un porcentaje
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Calcula el porcentaje de un valor respecto a un total
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return value / total;
}

/**
 * Verifica si un valor es un número válido
 */
export function isValidNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Limita un valor entre un rango mínimo y máximo
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calcula la distancia entre dos puntos en un plano 2D
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Formatea bytes a un formato legible
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Deep clone de un objeto
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj as T;
  }

  return obj;
}

/**
 * Compara dos objetos de forma profunda
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return false;

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 !== 'object') return obj1 === obj2;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Obtiene un valor anidado de un objeto usando una ruta de puntos
 */
export function getNestedValue(obj: any, path: string, defaultValue?: any): any {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }

  return current !== undefined ? current : defaultValue;
}

/**
 * Establece un valor anidado en un objeto usando una ruta de puntos
 */
export function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

/**
 * Elimina propiedades nulas o undefined de un objeto
 */
export function cleanObject(obj: any): any {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => cleanObject(item)).filter(item => item != null);
  }

  if (typeof obj !== 'object') return obj;

  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const cleanedValue = cleanObject(value);
    if (cleanedValue != null) {
      cleaned[key] = cleanedValue;
    }
  }

  return cleaned;
}

/**
 * Genera un color aleatorio en formato hexadecimal
 */
export function generateRandomColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

/**
 * Valida si un email tiene un formato correcto
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitaliza la primera letra de una cadena
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convierte una cadena a snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
}

/**
 * Convierte una cadena a camelCase
 */
export function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

/**
 * Obtiene la diferencia entre dos arrays
 */
export function arrayDifference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => !arr2.includes(item));
}

/**
 * Obtiene la intersección entre dos arrays
 */
export function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

/**
 * Obtiene la unión de dos arrays sin duplicados
 */
export function arrayUnion<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set([...arr1, ...arr2])];
}

/**
 * Retrasa la ejecución de una función
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Ejecuta una función con retry en caso de error
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await delay(delayMs);
      return retry(fn, retries - 1, delayMs);
    }
    throw error;
  }
}

/**
 * Formatea una duración en milisegundos a un formato legible
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}
