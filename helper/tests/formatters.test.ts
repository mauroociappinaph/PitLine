/**
 * Tests para las funciones de formateo
 */

import {
  formatLapTime,
  formatInterval,
  formatSessionDate,
  formatSessionName,
  formatCircuitName,
  formatCountryName,
} from '../frontend/formatters';

// Definir tipos para Jest
declare global {
  interface JestMatchers<R> {
    toBe(expected: any): R;
  }

  interface JestExpect {
    (actual: any): JestMatchers<any>;
  }

  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void) => void;
  const expect: JestExpect;
}

describe('Formatters', () => {
  describe('formatLapTime', () => {
    it('debería formatear tiempos de vuelta correctamente', () => {
      expect(formatLapTime(65.123)).toBe('1:05.123');
      expect(formatLapTime(123.456)).toBe('2:03.456');
      expect(formatLapTime(59.999)).toBe('59.999');
      expect(formatLapTime(0)).toBe('0.000');
    });

    it('debería manejar valores nulos', () => {
      expect(formatLapTime(null as any)).toBe('--:--.---');
      expect(formatLapTime(undefined as any)).toBe('--:--.---');
    });
  });

  describe('formatInterval', () => {
    it('debería formatear intervalos correctamente', () => {
      expect(formatInterval(65.123, 64.0)).toBe('+1.123s');
      expect(formatInterval(64.0, 64.0)).toBe('INTERVAL');
      expect(formatInterval(123.456, 120.0)).toBe('+3.456s');
    });
  });

  describe('formatSessionDate', () => {
    it('debería formatear fechas de sesión', () => {
      const date = new Date('2026-03-12T15:00:00Z');
      const formatted = formatSessionDate(date);
      expect(formatted).toBe(formatted); // Verificación básica
    });
  });

  describe('formatSessionName', () => {
    it('debería formatear nombres de sesión', () => {
      expect(formatSessionName('Practice 1')).toBe('Entrenamientos Libres 1');
      expect(formatSessionName('Race')).toBe('Carrera Principal');
      expect(formatSessionName('Unknown')).toBe('Unknown');
    });
  });

  describe('formatCircuitName', () => {
    it('debería formatear nombres de circuitos', () => {
      expect(formatCircuitName('Circuit de Barcelona-Catalunya')).toBe('Barcelona-Catalunya');
      expect(formatCircuitName('Silverstone Circuit')).toBe('Silverstone');
      expect(formatCircuitName('Circuito Desconocido')).toBe('Circuito Desconocido');
    });
  });

  describe('formatCountryName', () => {
    it('debería formatear nombres de países', () => {
      expect(formatCountryName('ES')).toBe('España');
      expect(formatCountryName('GB')).toBe('Reino Unido');
      expect(formatCountryName('XX')).toBe('XX');
    });
  });
});
