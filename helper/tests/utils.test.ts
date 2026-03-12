/**
 * Tests para las funciones de utilidad genéricas
 */

import {
  generateId,
  formatNumber,
  formatPercentage,
  calculatePercentage,
  isValidNumber,
  clamp,
  calculateDistance,
  formatBytes,
  deepClone,
  deepEqual,
  getNestedValue,
  setNestedValue,
  cleanObject,
  generateRandomColor,
  isValidEmail,
  capitalize,
  toSnakeCase,
  toCamelCase,
  arrayDifference,
  arrayIntersection,
  arrayUnion,
  delay,
  retry,
  formatDuration,
} from '../shared/utils';

describe('Utils', () => {
  describe('generateId', () => {
    it('debería generar un ID único', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('formatNumber', () => {
    it('debería formatear números con separadores de miles', () => {
      expect(formatNumber(1000)).toBe('1.000');
      expect(formatNumber(1000000)).toBe('1.000.000');
      expect(formatNumber(1234.56)).toBe('1.234,56');
    });
  });

  describe('formatPercentage', () => {
    it('debería formatear porcentajes', () => {
      expect(formatPercentage(0.5)).toBe('50.00%');
      expect(formatPercentage(0.25, 1)).toBe('25.0%');
      expect(formatPercentage(1)).toBe('100.00%');
    });
  });

  describe('calculatePercentage', () => {
    it('debería calcular porcentajes', () => {
      expect(calculatePercentage(50, 100)).toBe(0.5);
      expect(calculatePercentage(25, 100)).toBe(0.25);
      expect(calculatePercentage(0, 100)).toBe(0);
      expect(calculatePercentage(50, 0)).toBe(0);
    });
  });

  describe('isValidNumber', () => {
    it('debería validar números', () => {
      expect(isValidNumber(5)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-5)).toBe(true);
      expect(isValidNumber(5.5)).toBe(true);
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber('5')).toBe(false);
      expect(isValidNumber(null)).toBe(false);
    });
  });

  describe('clamp', () => {
    it('debería limitar valores entre un rango', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-1, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe('calculateDistance', () => {
    it('debería calcular distancias euclidianas', () => {
      expect(calculateDistance(0, 0, 3, 4)).toBe(5);
      expect(calculateDistance(1, 1, 4, 5)).toBe(5);
      expect(calculateDistance(0, 0, 0, 0)).toBe(0);
    });
  });

  describe('formatBytes', () => {
    it('debería formatear bytes', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
    });
  });

  describe('deepClone', () => {
    it('debería clonar objetos profundamente', () => {
      const original = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4, { e: 5 }],
        },
      };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
      expect(cloned.b.d).not.toBe(original.b.d);
      expect(cloned.b.d[2]).not.toBe(original.b.d[2]);
    });
  });

  describe('deepEqual', () => {
    it('debería comparar objetos profundamente', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      const obj3 = { a: 1, b: { c: 3 } };

      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual({}, {})).toBe(true);
    });
  });

  describe('getNestedValue', () => {
    it('debería obtener valores anidados', () => {
      const obj = { a: { b: { c: 5 } } };
      expect(getNestedValue(obj, 'a.b.c')).toBe(5);
      expect(getNestedValue(obj, 'a.b.d', 'default')).toBe('default');
      expect(getNestedValue(obj, 'x.y.z', 'default')).toBe('default');
    });
  });

  describe('setNestedValue', () => {
    it('debería establecer valores anidados', () => {
      const obj = { a: {} };
      setNestedValue(obj, 'a.b.c', 5);
      expect(obj.a.b.c).toBe(5);
    });
  });

  describe('cleanObject', () => {
    it('debería limpiar objetos de valores nulos', () => {
      const obj = {
        a: 1,
        b: null,
        c: {
          d: 2,
          e: undefined,
          f: [1, null, 3],
        },
      };
      const cleaned = cleanObject(obj);

      expect(cleaned.a).toBe(1);
      expect(cleaned.b).toBeUndefined();
      expect(cleaned.c.d).toBe(2);
      expect(cleaned.c.e).toBeUndefined();
      expect(cleaned.c.f).toEqual([1, 3]);
    });
  });

  describe('generateRandomColor', () => {
    it('debería generar colores aleatorios', () => {
      const color = generateRandomColor();
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe('isValidEmail', () => {
    it('debería validar emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('capitalize', () => {
    it('debería capitalizar cadenas', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('')).toBe('');
    });
  });

  describe('toSnakeCase', () => {
    it('debería convertir a snake_case', () => {
      expect(toSnakeCase('Hello World')).toBe('hello_world');
      expect(toSnakeCase('CamelCase')).toBe('camel_case');
      expect(toSnakeCase('kebab-case')).toBe('kebab_case');
    });
  });

  describe('toCamelCase', () => {
    it('debería convertir a camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('snake_case')).toBe('snakeCase');
      expect(toCamelCase('kebab-case')).toBe('kebabCase');
    });
  });

  describe('arrayDifference', () => {
    it('debería obtener la diferencia entre arrays', () => {
      expect(arrayDifference([1, 2, 3], [2, 3, 4])).toEqual([1]);
      expect(arrayDifference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
    });
  });

  describe('arrayIntersection', () => {
    it('debería obtener la intersección entre arrays', () => {
      expect(arrayIntersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
      expect(arrayIntersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    });
  });

  describe('arrayUnion', () => {
    it('debería obtener la unión de arrays', () => {
      expect(arrayUnion([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(arrayUnion([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('delay', () => {
    it('debería retrasar la ejecución', async () => {
      const start = Date.now();
      await delay(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(100);
    });
  });

  describe('retry', () => {
    it('debería reintentar funciones fallidas', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('Fallo');
        return 'Éxito';
      };

      const result = await retry(fn, 3, 10);
      expect(result).toBe('Éxito');
      expect(attempts).toBe(3);
    });
  });

  describe('formatDuration', () => {
    it('debería formatear duraciones', () => {
      expect(formatDuration(1000)).toBe('1s');
      expect(formatDuration(65000)).toBe('1m 5s');
      expect(formatDuration(3665000)).toBe('1h 1m 5s');
    });
  });
});
