/**
 * Constantes globales para PitLine
 */

// Temporada actual de F1
export const CURRENT_SEASON = 2026;

// Configuración de API
export const API_CONFIG = {
  OPENF1_BASE_URL: 'https://api.openf1.org/v1',
  OPENF1_TIMEOUT: 10000,
  OPENF1_RETRIES: 3,
  NVIDIA_API_BASE_URL: 'https://integrate.api.nvidia.com/v1',
  NVIDIA_MODEL: 'nvidia/glm-5-3b-8k-a800',
};

// Colores de equipos de F1
export const TEAM_COLORS = {
  'Red Bull Racing': '#0600EF',
  Mercedes: '#00D2BE',
  Ferrari: '#DC0000',
  McLaren: '#FF8700',
  Alpine: '#0090FF',
  'Aston Martin': '#006F62',
  'Alfa Romeo': '#C92D2D',
  Williams: '#005AFF',
  'Haas F1 Team': '#FFFFFF',
  AlphaTauri: '#2B4562',
  'Alfa Romeo Racing': '#C92D2D',
  'Scuderia Ferrari': '#DC0000',
  'Mercedes-AMG Petronas': '#00D2BE',
  'Oracle Red Bull Racing': '#0600EF',
  'BWT Alpine F1 Team': '#0090FF',
  'Aston Martin Aramco Cognizant F1 Team': '#006F62',
  'MoneyGram Haas F1 Team': '#FFFFFF',
  'Williams Racing': '#005AFF',
  'McLaren F1 Team': '#FF8700',
  'Visa Cash App Red Bull Racing': '#0600EF',
};

// Países y códigos
export const COUNTRY_CODES = {
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

// Tipos de sesiones
export const SESSION_TYPES = {
  PRACTICE_1: 'Practice 1',
  PRACTICE_2: 'Practice 2',
  PRACTICE_3: 'Practice 3',
  SPRINT_SHOOTOUT: 'Sprint Shootout',
  SPRINT: 'Sprint',
  RACE: 'Race',
};

// Compuestos de neumáticos
export const TIRE_COMPOUNDS = {
  SOFT: 'soft',
  MEDIUM: 'medium',
  HARD: 'hard',
  INTERMEDIATE: 'intermediate',
  WET: 'wet',
};

// Configuración de gráficos
export const CHART_CONFIG = {
  COLORS: {
    PRIMARY: '#0600EF',
    SECONDARY: '#00D2BE',
    SUCCESS: '#22C55E',
    WARNING: '#F59E0B',
    DANGER: '#EF4444',
    NEUTRAL: '#6B7280',
  },
  ANIMATION_DURATION: 300,
  GRID_LINES: true,
  LEGEND_POSITION: 'bottom',
};

// Configuración de IA
export const AI_CONFIG = {
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1000,
  SYSTEM_PROMPT: `Eres un experto en Fórmula 1 que ayuda a analizar datos de carreras,
  comparar pilotos y explicar conceptos técnicos. Responde de forma clara, concisa y
  profesional, utilizando datos reales cuando estén disponibles.`,
};

// Validación de datos
export const VALIDATION = {
  MAX_DRIVER_NUMBER: 99,
  MIN_LAP_TIME: 60, // segundos
  MAX_LAP_TIME: 600, // segundos
  MAX_SPEED: 400, // km/h
  MIN_SPEED: 0, // km/h
};

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  DATA_NOT_FOUND: 'No se encontraron datos para la búsqueda realizada.',
  INVALID_SESSION: 'Sesión no válida o no encontrada.',
  API_ERROR: 'Error al obtener datos de la API. Inténtalo de nuevo más tarde.',
  AI_ERROR: 'Error al procesar la solicitud de IA. Por favor, intenta de nuevo.',
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Datos cargados exitosamente.',
  COMPARISON_CREATED: 'Comparación creada exitosamente.',
  CHAT_SENT: 'Mensaje enviado exitosamente.',
};
