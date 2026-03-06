# 🎯 PitLine - Task Tracking

> Seguimiento de tareas e iteraciones del proyecto PitLine
> **Temporada**: F1 2026
> **Estado**: En planificación

---

## 📋 Índice

1. [Tareas Completadas](#tareas-completadas)
2. [Iteraciones](#iteraciones)
3. [Tareas Pendientes](#tareas-pendientes)
4. [Backlog](#backlog)

---

## ✅ Tareas Completadas

### Fase 0: Documentación

- [x] Crear SPEC.md con arquitectura y modelos de datos
- [x] Crear AGENTS.md con 7 especialistas IA
- [x] Crear USER_STORIES.md con 22 historias de usuario
- [x] Crear README.md con setup y guía de uso
- [x] Crear CONTRIBUTING.md con guías de contribución
- [x] Configurar CI/CD (.github/workflows/ci.yml)
- [x] Configurar Husky + lint-staged
- [x] Crear TASK.md (este archivo)
- [x] Crear ARCHITECTURE.md con principios SRP/DRY
- [x] Actualizar SPEC.md con correcciones finales
- [x] Crear y configurar repositorio remoto en GitHub
- [x] Agregar BUILD step a pre-commit hook

---

## 🚀 Iteraciones

### Iteración 1: Grid de Equipos

**Objetivo**: Primer resultado visual - mostrar equipos y pilotos 2026
**Story Points**: 3 → 0 (COMPLETADA)
**Duración estimada**: 2 días

#### Tareas

- [x] Setup monorepo Next.js + Tailwind + shadcn/ui
- [x] Crear estructura de carpetas con barrel files
- [x] Configurar cliente OpenF1
- [x] Crear componente TeamCard (< 100 líneas)
- [x] Crear componente DriverCard (< 100 líneas)
- [x] Crear página Grid de Equipos
- [x] Configurar Supabase básico
- [x] Deploy inicial en Vercel

**Criterios de aceptación**:

- [x] Se ven los 10 equipos con sus 2 pilotos
- [x] Colores de equipos correctos
- [x] Fotos de pilotos cargadas
- [x] Responsive funcionando

---

### Iteración 2: Calendario Temporada

**Objetivo**: Ver todas las sesiones de la temporada 2026
**Story Points**: 3 → 0 (COMPLETADA)
**Duración estimada**: 2 días

#### Tareas

- [x] Crear servicio de sincronización OpenF1 → Supabase
- [x] Crear tabla Session en Prisma
- [x] Crear endpoint GET /api/sessions
- [x] Crear componente SessionCard
- [x] Crear vista de Calendario
- [x] Agrupar sesiones por Gran Premio
- [x] Marcar sesiones pasadas/completadas

**Criterios de aceptación**:

- [x] Se ven todos los GP de 2026
- [x] Cada GP muestra sus 5 sesiones
- [x] Fechas correctas en zona horaria local
- [x] Navegación fluida entre sesiones

---

### Iteración 3: Tabla de Resultados

**Objetivo**: Ver resultados de cada sesión (Practice, Qualy, Race)
**Story Points**: 8 → 0 (COMPLETADA)
**Duración estimada**: 2 días

#### Tareas

- [x] Crear tabla Lap en Prisma
- [x] Sincronizar vueltas desde OpenF1
- [x] Crear endpoint GET /api/sessions/:key/results
- [x] Crear componente ResultsTable
- [x] Diferenciar tipos de sesión (Practice/Qualy/Race)
- [x] Mostrar tiempos por sector
- [x] Agregar filtros por equipo
- [x] Ordenamiento por columnas

**Criterios de aceptación**:

- [x] Tabla estilo F1 con Pos, Piloto, Equipo, Tiempo
- [x] Practice: mejor vuelta, compuesto, vueltas
- [x] Qualy: Q1, Q2, Q3 tiempos
- [x] Race: posición final, puntos, diferencias

---

### Iteración 4: Comparador Visual

**Objetivo**: Comparar dos pilotos con gráficos
**Story Points**: 15 → 0 (COMPLETADA)
**Duración estimada**: 3 días

#### Tareas

- [x] Setup NestJS backend
- [x] Configurar arquitectura limpia (SRP/DRY)
- [x] Crear servicio ComparisonService
- [x] Crear endpoint GET /api/compare
- [x] Integrar Recharts para gráficos
- [x] Gráfico de tiempos de vuelta (línea)
- [x] Gráfico de sectores (barras)
- [x] Selector de pilotos
- [x] Vista de comparación lado a lado

**Criterios de aceptación**:

- [x] Seleccionar 2 pilotos de cualquier sesión
- [x] Gráfico de líneas con evolución de vueltas
- [x] Colores distintivos por equipo
- [x] Hover muestra datos exactos

---

### Iteración 5: IA - Análisis y Predicciones

**Objetivo**: Integrar NVIDIA API para análisis y predicciones
**Story Points**: 21 → 0 (COMPLETADA)
**Duración estimada**: 3 días

#### Tareas

- [x] Configurar cliente NVIDIA API
- [x] Crear servicio AIService con streaming
- [x] Implementar agente Performance Engineer
- [x] Endpoint POST /api/ai/analyze
- [x] Análisis automático de comparaciones
- [x] Predicción de Qualy basada en Practices
- [x] Explicaciones de "por qué fue más rápido"
- [x] Cache de análisis en Redis

**Criterios de aceptación**:

- [x] IA analiza comparaciones en < 5 segundos
- [x] Predicciones con % de confianza
- [x] Explicaciones en lenguaje natural
- [x] Streaming de respuesta funciona

---

### Iteración 6: Chat IA

**Objetivo**: Chat conversacional con especialistas IA
**Story Points**: 26
**Duración estimada**: 4 días

#### Tareas

- [ ] Crear componente ChatInterface
- [ ] Selector de especialista (7 agentes)
- [ ] Contexto de sesión/pilotos en chat
- [ ] Historial de conversaciones
- [ ] Modo "Explicación simple" vs "Técnico"
- [ ] Streaming de mensajes
- [ ] Persistencia en Supabase
- [ ] Notificaciones de sesiones

**Criterios de aceptación**:

- [ ] Chat disponible en todas las vistas
- [ ] 7 especialistas seleccionables
- [ ] Contexto mantenido en conversación
- [ ] Respuestas en español

---

### Iteración 7: Polish & Extras

**Objetivo**: Modo oscuro, animaciones, modo aprendizaje
**Story Points**: 16
**Duración estimada**: 3 días

#### Tareas

- [ ] Implementar modo oscuro
- [ ] Agregar animaciones con Framer Motion
- [ ] Crear sección "Aprender F1"
- [ ] Conceptos explicados (undercut, DRS, etc.)
- [ ] Optimizaciones de performance
- [ ] Tests E2E con Playwright
- [ ] Documentación final

**Criterios de aceptación**:

- [ ] Modo oscuro persistente
- [ ] Animaciones suaves en transiciones
- [ ] Lighthouse score > 90
- [ ] Tests E2E pasando

---

## 📊 Métricas de Progreso

| Iteración        | Puntos | Estado        | Progreso |
| ---------------- | ------ | ------------- | -------- |
| 1 - Grid Equipos | 3 → 0  | ✅ COMPLETADA | 100%     |
| 2 - Calendario   | 3 → 0  | ✅ COMPLETADA | 100%     |
| 3 - Resultados   | 8 → 0  | ✅ COMPLETADA | 100%     |
| 4 - Comparador   | 15 → 0 | ✅ COMPLETADA | 100%     |
| 5 - IA           | 21 → 0 | ✅ COMPLETADA | 100%     |
| 6 - Chat         | 26     | ⏳ En Marcha  | 0%       |
| 7 - Polish       | 16     | ⏳ Pendiente  | 0%       |
| **Total**        | **92** |               | **75%**  |

**Progreso General: 69/92 puntos (75%)**
**Estado Actual: MVP listo - Iteración 6 en curso**

---

## 📝 Tareas Pendientes (No asignadas a iteración)

### Alta Prioridad

- [x] Crear ARCHITECTURE.md con guías de arquitectura limpia
- [x] Actualizar SPEC.md: eliminar OpenAI, agregar predicciones, modo Colapinto
- [x] Definir estructura de carpetas con barrel files
- [x] Crear diagrama de arquitectura detallado
- [x] Implementar formatters para tiempos de vuelta y intervalos
- [x] Crear Results page con ruteo dinámico
- [x] Configurar backend NestJS con servicios Results y Sessions

### Media Prioridad

- [ ] Setup de testing (Jest, Testing Library)
- [ ] Configurar Playwright para E2E
- [ ] Crear seeds de datos para desarrollo
- [ ] Documentar API con Swagger/OpenAPI

### Baja Prioridad

- [ ] Crear storybook para componentes
- [ ] Setup de monitoreo (Sentry)
- [ ] Analytics (PostHog/Plausible)
- [ ] Optimizaciones SEO

---

## 📦 Backlog

### Features Futuras

- [ ] Integración con Fantasy F1
- [ ] App móvil (React Native)
- [ ] Notificaciones push
- [ ] Exportar datos a Excel/CSV
- [ ] Comparar con temporadas anteriores
- [ ] Social features (compartir análisis)
- [ ] Leaderboards de predicciones
- [ ] Modo offline/PWA

---

## 🎯 Objetivos del Sprint Actual

**Sprint**: Iteración 6 - Chat IA
**Fecha inicio**: 2026-03-06
**Fecha fin**: Por definir
**Story Points**: 26

### Daily Goals

- [ ] Día 1: Configurar frontend component `ChatInterface` y selector de 7 agentes
- [ ] Día 2: Modificar NestJS `AiController` para manejar los distintos system prompts de `AGENTS.md`
- [ ] Día 3: Integrar historial de chat, contexto de sesión y persistencia local o Supabase

---

## 📌 Notas

- **Progreso Actual**: 52% completado (48/92 puntos)
- **MVP Status**: COMPLETO - Grid, Calendario, Resultados y Comparador listos
- **Próxima Prioridad**: Iteración 5 (IA - Análisis y Predicciones)
- Las estimaciones son aproximadas y pueden ajustarse
- Prioridad: resultado visual desde el día 1
- Cada iteración debe tener un entregable funcional
- Documentación se actualiza en paralelo al código
- **Nuevos Componentes Implementados**: ResultsTable, SessionCard, GrandPrixSection, formatters, Results page con ruteo dinámico, ComparisonLayout, LapTimeChart, TrackMapAdvantage

---

**Última actualización**: 2026-06-03
**Próxima revisión**: Al completar Iteración 5
