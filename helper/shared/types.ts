/**
 * Tipos auxiliares para PitLine
 */

// Tipos básicos de F1
export type DriverNumber = number;
export type SessionKey = number;
export type MeetingKey = number;
export type LapNumber = number;

// Tipos de datos de OpenF1
export interface OpenF1Driver {
  driver_number: DriverNumber;
  full_name: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  name_acronym: string;
  meeting_key: MeetingKey;
  session_key: SessionKey;
}

export interface OpenF1Session {
  session_key: SessionKey;
  meeting_key: MeetingKey;
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

export interface OpenF1LapTime {
  driver_number: DriverNumber;
  i1_speed: number;
  i2_speed: number;
  lap_duration: number;
  lap_number: LapNumber;
  lap_time: string;
  meeting_key: MeetingKey;
  sector_1_time: string;
  sector_2_time: string;
  sector_3_time: string;
  session_key: SessionKey;
  speed_trap: number;
}

export interface OpenF1Telemetry {
  brake: number;
  driver_number: DriverNumber;
  meeting_key: MeetingKey;
  n_gear: number;
  rpm: number;
  session_key: SessionKey;
  throttle: number;
  time: string;
  utctime: string;
  x: number;
  y: number;
  z: number;
}

export interface OpenF1Position {
  driver_number: DriverNumber;
  meeting_key: MeetingKey;
  n_laps: number;
  position: number;
  session_key: SessionKey;
  time: string;
  utctime: string;
  x: number;
  y: number;
  z: number;
}

export interface OpenF1Stint {
  compound: string;
  driver_number: DriverNumber;
  lap_number: LapNumber;
  meeting_key: MeetingKey;
  new: boolean;
  session_key: SessionKey;
  stint_number: number;
}

export interface OpenF1PitStop {
  driver_number: DriverNumber;
  lap_number: LapNumber;
  meeting_key: MeetingKey;
  pit_duration: number;
  session_key: SessionKey;
  stop: number;
  time: string;
  utctime: string;
}

// Tipos extendidos para PitLine
export interface Driver extends OpenF1Driver {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  teamColor: string;
  countryCode: string;
  headshotUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  drivers: Driver[];
}

export interface Session extends OpenF1Session {
  id: string;
  sessionKey: SessionKey;
  sessionName: string;
  sessionType: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  location: string;
  countryCode: string;
  circuitShortName: string;
}

export interface LapTime extends OpenF1LapTime {
  id: string;
  driverId: string;
  sessionId: string;
  sector1Time: number;
  sector2Time: number;
  sector3Time: number;
  isValid: boolean;
}

export interface TelemetryData extends OpenF1Telemetry {
  id: string;
  driverId: string;
  sessionId: string;
  lapNumber: LapNumber;
  timestamp: Date;
}

export interface PositionData extends OpenF1Position {
  id: string;
  driverId: string;
  sessionId: string;
  timestamp: Date;
}

export interface StintData extends OpenF1Stint {
  id: string;
  driverId: string;
  sessionId: string;
  compound: string;
  isNew: boolean;
  stintNumber: number;
}

export interface PitStopData extends OpenF1PitStop {
  id: string;
  driverId: string;
  sessionId: string;
  duration: number;
  timestamp: Date;
}

// Tipos para IA
export type AgentType =
  | 'tire'
  | 'race'
  | 'performance'
  | 'telemetry'
  | 'strategy'
  | 'aero'
  | 'track'
  | 'general';

export interface AIRequest {
  prompt: string;
  agentType?: AgentType;
  context?: any;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  agentType: AgentType;
  confidence: number;
  sources?: string[];
}

// Tipos para comparaciones
export interface ComparisonData {
  sessionId: string;
  driver1Id: string;
  driver2Id: string;
  laps: LapComparison[];
  telemetry: TelemetryComparison[];
  positions: PositionComparison[];
}

export interface LapComparison {
  lapNumber: number;
  driver1Time: number;
  driver2Time: number;
  difference: number;
  winner: DriverNumber;
}

export interface TelemetryComparison {
  timestamp: Date;
  driver1Data: TelemetryData;
  driver2Data: TelemetryData;
  differences: {
    speed: number;
    throttle: number;
    brake: number;
    rpm: number;
  };
}

export interface PositionComparison {
  timestamp: Date;
  driver1Position: number;
  driver2Position: number;
  gap: number;
}

// Tipos para gráficos
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
  tension?: number;
}

// Tipos para validación
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ValidationRule {
  field: string;
  validator: (value: any) => boolean;
  message: string;
}

// Tipos para eventos
export interface EventListener<T = any> {
  (data: T): void;
}

export interface EventEmitter {
  on<T = any>(event: string, listener: EventListener<T>): void;
  off<T = any>(event: string, listener: EventListener<T>): void;
  emit<T = any>(event: string, data?: T): void;
  once<T = any>(event: string, listener: EventListener<T>): void;
}

// Tipos para configuración
export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  ai: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
  chart: {
    animationDuration: number;
    gridLines: boolean;
    legendPosition: 'top' | 'bottom' | 'left' | 'right';
  };
}

// Tipos para errores
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Tipos para paginación
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos para filtros
export interface FilterOptions {
  driverNumber?: DriverNumber;
  sessionKey?: SessionKey;
  meetingKey?: MeetingKey;
  dateRange?: {
    start: Date;
    end: Date;
  };
  compound?: string[];
  lapRange?: {
    min: number;
    max: number;
  };
}

// Tipos para caché
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Tipos para estadísticas
export interface Statistics {
  average: number;
  median: number;
  min: number;
  max: number;
  standardDeviation: number;
  variance: number;
  count: number;
}

// Tipos para métricas de rendimiento
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

// Tipos para logs
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
  context?: any;
  userId?: string;
  sessionId?: string;
}
