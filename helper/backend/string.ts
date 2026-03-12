/**
 * Funciones de manipulación de strings para PitLine
 */

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
 * Convierte una cadena a PascalCase
 */
export function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Convierte una cadena a kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');
}

/**
 * Limpia una cadena de caracteres especiales
 */
export function cleanString(str: string, allowedChars = ''): string {
  const regex = new RegExp(`[^a-zA-Z0-9${allowedChars}]`, 'g');
  return str.replace(regex, '');
}

/**
 * Trunca una cadena a una longitud específica
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Elimina espacios en blanco al inicio y final, y reduce múltiples espacios a uno solo
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * Verifica si una cadena contiene solo números
 */
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * Verifica si una cadena es un email válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Verifica si una cadena es una URL válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtiene la extensión de un archivo
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot + 1).toLowerCase();
}

/**
 * Obtiene el nombre del archivo sin la extensión
 */
export function getFileNameWithoutExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return filename;
  return filename.slice(0, lastDot);
}

/**
 * Genera un slug a partir de una cadena
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Cuenta la cantidad de palabras en una cadena
 */
export function countWords(str: string): number {
  const words = str.trim().split(/\s+/);
  return words.length === 1 && words[0] === '' ? 0 : words.length;
}

/**
 * Cuenta la cantidad de caracteres en una cadena (excluyendo espacios)
 */
export function countCharacters(str: string): number {
  return str.replace(/\s/g, '').length;
}

/**
 * Invierte una cadena
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Verifica si una cadena es un palíndromo
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverseString(cleaned);
}

/**
 * Obtiene el substring entre dos delimitadores
 */
export function getSubstringBetween(str: string, start: string, end: string): string {
  const startIndex = str.indexOf(start);
  if (startIndex === -1) return '';

  const endIndex = str.indexOf(end, startIndex + start.length);
  if (endIndex === -1) return '';

  return str.substring(startIndex + start.length, endIndex);
}

/**
 * Reemplaza todas las ocurrencias de una cadena
 */
export function replaceAll(str: string, search: string, replacement: string): string {
  return str.split(search).join(replacement);
}

/**
 * Obtiene el primer carácter de cada palabra
 */
export function getInitials(str: string, maxInitials = 2): string {
  const words = str.trim().split(/\s+/);
  return words
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}

/**
 * Verifica si una cadena contiene una subcadena (case insensitive)
 */
export function containsIgnoreCase(str: string, search: string): boolean {
  return str.toLowerCase().includes(search.toLowerCase());
}

/**
 * Obtiene las palabras más comunes en una cadena
 */
export function getMostCommonWords(str: string, limit = 5): { word: string; count: number }[] {
  const words = str.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount: Record<string, number> = {};

  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  return Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Codifica una cadena en Base64
 */
export function encodeBase64(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }
  // Para navegadores
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Decodifica una cadena en Base64
 */
export function decodeBase64(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf8');
  }
  // Para navegadores
  return decodeURIComponent(escape(atob(str)));
}

/**
 * Genera un ID único basado en una cadena
 */
export function generateIdFromString(str: string): string {
  const timestamp = Date.now().toString(36);
  const hash = str
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    .toString(36);

  return `${timestamp}-${hash}`;
}

/**
 * Formatea una cadena con placeholders
 */
export function formatString(template: string, params: Record<string, any>): string {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
}

/**
 * Obtiene la diferencia entre dos cadenas (Levenshtein distance)
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // sustitución
          matrix[i][j - 1] + 1, // inserción
          matrix[i - 1][j] + 1 // eliminación
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Busca coincidencias aproximadas en un array de strings
 */
export function fuzzySearch(query: string, items: string[], threshold = 0.3): string[] {
  const results: { item: string; score: number }[] = [];

  items.forEach(item => {
    const distance = levenshteinDistance(query.toLowerCase(), item.toLowerCase());
    const maxLength = Math.max(query.length, item.length);
    const score = 1 - distance / maxLength;

    if (score >= threshold) {
      results.push({ item, score });
    }
  });

  return results.sort((a, b) => b.score - a.score).map(result => result.item);
}

/**
 * Convierte una cadena a título (capitaliza cada palabra)
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Elimina las tildes de una cadena
 */
export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica si una cadena es segura para usar en URLs
 */
export function isUrlSafe(str: string): boolean {
  const urlSafeRegex = /^[a-zA-Z0-9\-_]+$/;
  return urlSafeRegex.test(str);
}
