# 🏗️ PitLine - Arquitectura Limpia

> Guía de arquitectura con principios SRP, DRY, Barrel Files y límite de 300 líneas por archivo
> **Versión**: 1.0.0

---

## 📋 Índice

1. [Principios Fundamentales](#principios-fundamentales)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Barrel Files (Index.ts)](#barrel-files-indexts)
4. [Reglas de Arquitectura](#reglas-de-arquitectura)
5. [Límite de Líneas](#límite-de-líneas)
6. [Ejemplos](#ejemplos)

---

## 🎯 Principios Fundamentales

### SRP (Single Responsibility Principle)

Cada archivo/clase tiene UNA única responsabilidad:

```
✅ Bien:
- TeamCard.tsx: Solo renderiza tarjeta de equipo
- useDrivers.ts: Solo obtiene datos de pilotos
- formatLapTime.ts: Solo formatea tiempos de vuelta

❌ Mal:
- TeamUtils.ts: Tiene formateo, fetch, validación, etc.
- Dashboard.tsx: Renderiza, obtiene datos, procesa, etc.
```

### DRY (Don't Repeat Yourself)

Reutilizar código mediante:

```
1. Custom Hooks para lógica compartida
2. Utilidades compartidas en /lib
3. Componentes base reutilizables
4. Constantes centralizadas
5. Tipos compartidos
```

### Barrel Files (Index.ts)

Cada carpeta exporta todo mediante index.ts:

```typescript
// ✅ Bien: components/team/index.ts
export { TeamCard } from './TeamCard';
export { TeamGrid } from './TeamGrid';
export { TeamSelector } from './TeamSelector';
export type { TeamCardProps } from './types';

// Uso limpio:
import { TeamCard, TeamGrid } from '@/components/team';
```

### KISS (Keep It Simple, Stupid)

- No sobre-ingeniería
- No abstracciones prematuras
- Resolver el problema actual, no futuros hipotéticos

---

## 📁 Estructura de Carpetas

### Frontend (Next.js)

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page
├── globals.css                   # Estilos globales
├── sessions/
│   ├── page.tsx                  # Listado de sesiones
│   └── [sessionKey]/
│       ├── page.tsx              # Detalle de sesión
│       └── compare/
│           └── page.tsx          # Comparador
├── api/
│   └── sessions/
│       └── route.ts              # API routes
├── components/
│   ├── ui/                       # Componentes base (shadcn)
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │   └── index.ts
│   ├── team/                     # Team components
│   │   ├── TeamCard.tsx          # < 100 líneas
│   │   ├── TeamGrid.tsx          # < 100 líneas
│   │   ├── TeamSelector.tsx      # < 100 líneas
│   │   ├── types.ts              # Tipos del módulo
│   │   └── index.ts              # Barrel file
│   ├── driver/                   # Driver components
│   │   ├── DriverCard.tsx
│   │   ├── DriverAvatar.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── session/                  # Session components
│   │   ├── SessionCard.tsx
│   │   ├── SessionList.tsx
│   │   ├── ResultsTable.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── charts/                   # Chart components
│   │   ├── LapTimeChart.tsx
│   │   ├── SectorChart.tsx
│   │   ├── TelemetryChart.tsx
│   │   └── index.ts
│   └── chat/                     # Chat components
│       ├── ChatInterface.tsx
│       ├── MessageBubble.tsx
│       ├── AgentSelector.tsx
│       └── index.ts
├── hooks/                        # Custom hooks
│   ├── useDrivers.ts             # Fetch drivers
│   ├── useSessions.ts            # Fetch sessions
│   ├── useLaps.ts                # Fetch laps
│   ├── useComparison.ts          # Compare drivers
│   ├── useAI.ts                  # AI streaming
│   └── index.ts
├── lib/                          # Utilidades
│   ├── api/                      # API clients
│   │   ├── f1-client.ts          # OpenF1 client
│   │   ├── supabase-client.ts    # Supabase client
│   │   └── index.ts
│   ├── utils/                    # Utilities
│   │   ├── formatters.ts         # Format time, dates
│   │   ├── calculations.ts       # Lap calculations
│   │   ├── validators.ts         # Input validation
│   │   └── index.ts
│   ├── constants.ts              # Constants
│   └── index.ts
├── types/                        # Global types
│   ├── f1.ts                     # F1 data types
│   ├── api.ts                    # API types
│   └── index.ts
└── styles/                       # Additional styles
    └── variables.css
```

### Backend (NestJS)

```
api/src/
├── main.ts                       # Entry point
├── app.module.ts                 # Root module
├── config/                       # Configuration
│   ├── database.config.ts
│   ├── ai.config.ts
│   └── index.ts
├── domain/                       # Domain layer (DDD)
│   ├── session/                  # Session aggregate
│   │   ├── entities/
│   │   │   ├── session.entity.ts
│   │   │   └── index.ts
│   │   ├── value-objects/
│   │   │   └── session-type.ts
│   │   ├── repositories/
│   │   │   ├── session.repository.ts    # Interface
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── driver/
│   │   ├── entities/
│   │   │   ├── driver.entity.ts
│   │   │   └── index.ts
│   │   ├── repositories/
│   │   │   ├── driver.repository.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── lap/
│   │   ├── entities/
│   │   │   ├── lap.entity.ts
│   │   │   └── index.ts
│   │   ├── value-objects/
│   │   │   └── compound.ts
│   │   ├── repositories/
│   │   │   ├── lap.repository.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── shared/                   # Shared domain
│       ├── errors/
│       ├── types/
│       └── index.ts
├── application/                  # Application layer
│   ├── sessions/                 # Use cases
│   │   ├── commands/
│   │   │   ├── sync-session.command.ts
│   │   │   └── index.ts
│   │   ├── queries/
│   │   │   ├── get-sessions.query.ts
│   │   │   ├── get-session-results.query.ts
│   │   │   └── index.ts
│   │   ├── dto/
│   │   │   ├── session.dto.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── comparison/
│   │   ├── commands/
│   │   ├── queries/
│   │   └── index.ts
│   ├── ai/                       # AI use cases
│   │   ├── commands/
│   │   │   ├── analyze.command.ts
│   │   │   ├── predict.command.ts
│   │   │   └── index.ts
│   │   ├── queries/
│   │   │   └── get-agents.query.ts
│   │   ├── ports/
│   │   │   ├── ai-service.port.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── shared/
│       └── index.ts
├── infrastructure/               # Infrastructure layer
│   ├── persistence/              # Database adapters
│   │   ├── prisma/
│   │   │   ├── prisma.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── session.repository.impl.ts
│   │   │   │   ├── driver.repository.impl.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── http/                     # HTTP adapters
│   │   ├── controllers/
│   │   │   ├── sessions.controller.ts    # < 150 líneas
│   │   │   ├── comparison.controller.ts  # < 150 líneas
│   │   │   ├── ai.controller.ts          # < 150 líneas
│   │   │   └── index.ts
│   │   ├── middleware/
│   │   │   ├── rate-limit.middleware.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── external/                 # External services
│   │   ├── openf1/
│   │   │   ├── openf1.client.ts
│   │   │   ├── openf1.service.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── nvidia/
│   │   │   ├── nvidia.client.ts
│   │   │   ├── nvidia.service.ts
│   │   │   ├── agents/
│   │   │   │   ├── tire-engineer.agent.ts
│   │   │   │   ├── performance-engineer.agent.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── shared/
│       └── index.ts
└── modules/                      # NestJS modules
    ├── sessions.module.ts
    ├── comparison.module.ts
    ├── ai.module.ts
    └── index.ts
```

---

## 📦 Barrel Files (Index.ts)

### Ejemplos

#### Component Barrel
```typescript
// components/team/index.ts
export { TeamCard } from './TeamCard';
export { TeamGrid } from './TeamGrid';
export { TeamSelector } from './TeamSelector';
export type { Team, TeamCardProps, TeamGridProps } from './types';
```

#### Hooks Barrel
```typescript
// hooks/index.ts
export { useDrivers } from './useDrivers';
export { useSessions } from './useSessions';
export { useLaps } from './useLaps';
export { useComparison } from './useComparison';
export { useAI } from './useAI';
export type { UseDriversReturn, UseSessionsReturn } from './types';
```

#### Utils Barrel
```typescript
// lib/utils/index.ts
export { formatLapTime, formatSectorTime } from './formatters';
export { calculateDelta, calculateConsistency } from './calculations';
export { isValidSessionKey, isValidDriverNumber } from './validators';
```

### Import Limpio

```typescript
// ✅ Así se importa (limpio y ordenado)
import { TeamCard, TeamGrid } from '@/components/team';
import { useDrivers, useSessions } from '@/hooks';
import { formatLapTime, calculateDelta } from '@/lib/utils';

// ❌ No así (feo y verboso)
import { TeamCard } from '@/components/team/TeamCard';
import { TeamGrid } from '@/components/team/TeamGrid';
import { useDrivers } from '@/hooks/useDrivers';
import { useSessions } from '@/hooks/useSessions';
```

---

## 📏 Reglas de Arquitectura

### 1. Separación de Responsabilidades

```
| Capa | Responsabilidad | Ejemplos |
|------|----------------|----------|
| Components | Renderizado UI | TeamCard, SessionList |
| Hooks | Lógica de estado | useDrivers, useAI |
| Services | Llamadas API | f1Client, nvidiaClient |
| Utils | Funciones puras | formatters, calculations |
| Types | Definiciones TypeScript | f1.ts, api.ts |
```

### 2. Jerarquía de Dependencias

```
UI Components → Hooks → Services → Utils
     ↑              ↑          ↑        ↑
   Types ←─────────┴──────────┴────────┘
```

- **NO** circular dependencies
- **NO** components importan services directamente
- **SIEMPRE** pasar por hooks

### 3. Nombrado Consistente

```typescript
// Componentes: PascalCase + descriptivo
TeamCard.tsx
DriverAvatar.tsx
LapTimeChart.tsx

// Hooks: camelCase + use
useDrivers.ts
useSessions.ts
useComparison.ts

// Servicios: camelCase
f1Client.ts
nvidiaClient.ts
supabaseClient.ts

// Utils: camelCase + verbo
formatLapTime.ts
calculateDelta.ts
validateSessionKey.ts

// Tipos: PascalCase
Driver.ts
Session.ts
LapData.ts
```

### 4. Props Máximo 5

```typescript
// ✅ Bien: pocas props, limpio
interface TeamCardProps {
  team: Team;
  showDrivers?: boolean;
  onSelect?: (teamId: string) => void;
}

// ❌ Mal: demasiadas props
interface TeamCardProps {
  teamName: string;
  teamColor: string;
  teamLogo: string;
  driver1Name: string;
  driver1Number: number;
  driver1Photo: string;
  driver2Name: string;
  driver2Number: number;
  driver2Photo: string;
  // ... más props
}
```

---

## 🔢 Límite de Líneas

### Reglas

| Tipo de archivo | Máximo líneas | Cuándo dividir |
|----------------|---------------|----------------|
| Componentes React | 100 | > 100 líneas → extraer sub-componentes |
| Hooks | 80 | > 80 líneas → extraer lógica a utils |
| Servicios | 150 | > 150 líneas → separar responsabilidades |
| Utils | 50 | > 50 líneas → dividir por funcionalidad |
| Tests | 200 | > 200 líneas → dividir por casos de uso |
| Controllers | 150 | > 150 líneas → extraer servicios |
| Entities | 100 | > 100 líneas → extraer value objects |

### Ejemplo: Dividir Componente Grande

```typescript
// ❌ DriverProfile.tsx (250 líneas)
function DriverProfile({ driver }) {
  // ... mucho código
}

// ✅ Dividido en componentes pequeños


**Documentación relacionada:**
- [SPEC.md](./SPEC.md) - Especificación técnica
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura del proyecto

### 4️⃣### __Carpeta /utils - ¿Buena práctica?__

__Sí, pero con estructura clara__. La carpeta `/utils` es buena práctica SI está bien organizada:

```javascript
lib/
├── utils/
│   ├── formatters/          # Formateo de datos
│   │   ├── time-formatter.ts    # formatLapTime, formatSectorTime
│   │   ├── date-formatter.ts    # formatSessionDate
│   │   └── number-formatter.ts  # formatSpeed, formatDelta
│   │   └── index.ts
│   ├── calculations/        # Cálculos
│   │   ├── lap-calculations.ts  # calculateDelta, calculateConsistency
│   │   ├── pace-analysis.ts     # calculateRacePace
│   │   └── index.ts
│   ├── validators/          # Validación
│   │   ├── input-validator.ts
│   │   └── index.ts
│   └── index.ts             # Barrel file
```
