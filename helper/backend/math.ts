/**
 * Funciones matemáticas para PitLine
 */

/**
 * Calcula el promedio de un array de números
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Calcula la mediana de un array de números
 */
export function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return sorted[mid];
}

/**
 * Calcula la desviación estándar
 */
export function calculateStandardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const mean = calculateAverage(numbers);
  const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;

  return Math.sqrt(variance);
}

/**
 * Calcula la varianza
 */
export function calculateVariance(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const mean = calculateAverage(numbers);
  return numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
}

/**
 * Calcula el valor mínimo de un array
 */
export function calculateMin(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return Math.min(...numbers);
}

/**
 * Calcula el valor máximo de un array
 */
export function calculateMax(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return Math.max(...numbers);
}

/**
 * Calcula el rango (máximo - mínimo)
 */
export function calculateRange(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return calculateMax(numbers) - calculateMin(numbers);
}

/**
 * Calcula el porcentaje de un valor respecto a un total
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Calcula el crecimiento porcentual entre dos valores
 */
export function calculateGrowthPercentage(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Redondea un número a una cantidad específica de decimales
 */
export function roundToDecimals(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Formatea un número con separadores de miles y decimales
 */
export function formatNumber(num: number, decimals = 2): string {
  return num.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Calcula la distancia euclidiana entre dos puntos
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Calcula la distancia entre dos puntos en coordenadas geográficas (Haversine)
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calcula el área bajo una curva usando el método del trapecio
 */
export function calculateTrapezoidalArea(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  let area = 0;
  for (let i = 0; i < x.length - 1; i++) {
    area += ((y[i] + y[i + 1]) * (x[i + 1] - x[i])) / 2;
  }

  return area;
}

/**
 * Calcula la pendiente de una línea de regresión lineal
 */
export function calculateLinearRegressionSlope(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumX2 = x.reduce((acc, val) => acc + val * val, 0);

  return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
}

/**
 * Calcula la intersección con el eje Y de una línea de regresión lineal
 */
export function calculateLinearRegressionIntercept(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  const slope = calculateLinearRegressionSlope(x, y);
  const meanX = calculateAverage(x);
  const meanY = calculateAverage(y);

  return meanY - slope * meanX;
}

/**
 * Calcula el coeficiente de correlación de Pearson
 */
export function calculatePearsonCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  const n = x.length;
  const meanX = calculateAverage(x);
  const meanY = calculateAverage(y);

  let numerator = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;

    numerator += dx * dy;
    sumX2 += dx * dx;
    sumY2 += dy * dy;
  }

  const denominator = Math.sqrt(sumX2 * sumY2);

  if (denominator === 0) return 0;

  return numerator / denominator;
}

/**
 * Calcula el factorial de un número
 */
export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

/**
 * Calcula el número combinatorio (n sobre k)
 */
export function combination(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;

  return factorial(n) / (factorial(k) * factorial(n - k));
}

/**
 * Calcula el máximo común divisor usando el algoritmo de Euclides
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

/**
 * Calcula el mínimo común múltiplo
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Verifica si un número es primo
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  let i = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}

/**
 * Genera números primos hasta un límite usando la criba de Eratóstenes
 */
export function sieveOfEratosthenes(limit: number): number[] {
  if (limit < 2) return [];

  const primes: boolean[] = new Array(limit + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= limit; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes.map((isPrime, index) => (isPrime ? index : -1)).filter(index => index !== -1);
}

/**
 * Calcula el área de un círculo
 */
export function circleArea(radius: number): number {
  if (radius < 0) return 0;
  return Math.PI * Math.pow(radius, 2);
}

/**
 * Calcula el perímetro de un círculo
 */
export function circlePerimeter(radius: number): number {
  if (radius < 0) return 0;
  return 2 * Math.PI * radius;
}

/**
 * Calcula el área de un triángulo usando la fórmula de Herón
 */
export function triangleArea(a: number, b: number, c: number): number {
  if (a <= 0 || b <= 0 || c <= 0) return 0;

  const s = (a + b + c) / 2;
  const areaSquared = s * (s - a) * (s - b) * (s - c);

  if (areaSquared < 0) return 0;

  return Math.sqrt(areaSquared);
}

/**
 * Calcula el área de un rectángulo
 */
export function rectangleArea(width: number, height: number): number {
  if (width < 0 || height < 0) return 0;
  return width * height;
}

/**
 * Calcula el área de un trapecio
 */
export function trapezoidArea(base1: number, base2: number, height: number): number {
  if (base1 < 0 || base2 < 0 || height < 0) return 0;
  return ((base1 + base2) / 2) * height;
}
