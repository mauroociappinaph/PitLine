/**
 * Cliente API para OpenF1 - Datos de Fórmula 1
 */

export interface OpenF1Config {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

export class OpenF1Client {
  private baseUrl: string;
  private timeout: number;
  private retries: number;

  constructor(config: OpenF1Config = {}) {
    this.baseUrl = config.baseUrl || 'https://api.openf1.org/v1';
    this.timeout = config.timeout || 10000;
    this.retries = config.retries || 3;
  }

  /**
   * Realiza una solicitud GET a la API de OpenF1
   */
  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<T[]> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            'User-Agent': 'PitLine/1.0',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [data];
      } catch (error) {
        if (attempt === this.retries) {
          throw new Error(
            `Failed to fetch ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
        }

        // Espera exponencial antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    throw new Error('Max retries exceeded');
  }

  /**
   * Obtiene información de pilotos
   */
  async getDrivers(params?: {
    driverNumber?: number;
    sessionKey?: number;
    meetingKey?: number;
  }): Promise<Driver[]> {
    return this.request<Driver>('drivers', params);
  }

  /**
   * Obtiene información de sesiones
   */
  async getSessions(params?: {
    sessionKey?: number;
    meetingKey?: number;
    year?: number;
  }): Promise<Session[]> {
    return this.request<Session>('sessions', params);
  }

  /**
   * Obtiene tiempos de vuelta
   */
  async getLapTimes(params: { sessionKey: number; driverNumber: number }): Promise<LapTime[]> {
    return this.request<LapTime>('laps', params);
  }

  /**
   * Obtiene datos de telemetría
   */
  async getTelemetry(params: {
    sessionKey: number;
    driverNumber: number;
    lapNumber?: number;
  }): Promise<TelemetryData[]> {
    return this.request<TelemetryData>('car_data', params);
  }

  /**
   * Obtiene información de posiciones
   */
  async getPositions(params: {
    sessionKey: number;
    driverNumber?: number;
  }): Promise<PositionData[]> {
    return this.request<PositionData>('position', params);
  }

  /**
   * Obtiene información de neumáticos
   */
  async getStints(params: { sessionKey: number; driverNumber?: number }): Promise<StintData[]> {
    return this.request<StintData>('stints', params);
  }

  /**
   * Obtiene información de pit stops
   */
  async getPitStops(params: { sessionKey: number; driverNumber?: number }): Promise<PitStopData[]> {
    return this.request<PitStopData>('pit', params);
  }
}

/**
 * Tipos de datos de OpenF1
 */

export interface Driver {
  driver_number: number;
  full_name: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  name_acronym: string;
  meeting_key: number;
  session_key: number;
}

export interface Session {
  session_key: number;
  meeting_key: number;
  year: number;
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_start: string;
  date_end: string;
  gmt_offset: string;
  location: string;
  session_name: string;
  session_type: string;
  official_name: string;
}

export interface LapTime {
  driver_number: number;
  i1_speed: number;
  i2_speed: number;
  lap_duration: number;
  lap_number: number;
  lap_time: string;
  meeting_key: number;
  sector_1_time: string;
  sector_2_time: string;
  sector_3_time: string;
  session_key: number;
  speed_trap: number;
}

export interface TelemetryData {
  brake: number;
  driver_number: number;
  meeting_key: number;
  n_gear: number;
  rpm: number;
  session_key: number;
  throttle: number;
  time: string;
  utctime: string;
  x: number;
  y: number;
  z: number;
}

export interface PositionData {
  driver_number: number;
  meeting_key: number;
  n_laps: number;
  position: number;
  session_key: number;
  time: string;
  utctime: string;
  x: number;
  y: number;
  z: number;
}

export interface StintData {
  compound: string;
  driver_number: number;
  lap_number: number;
  meeting_key: number;
  new: boolean;
  session_key: number;
  stint_number: number;
}

export interface PitStopData {
  driver_number: number;
  lap_number: number;
  meeting_key: number;
  pit_duration: number;
  session_key: number;
  stop: number;
  time: string;
  utctime: string;
}
