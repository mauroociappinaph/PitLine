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

---

## 🚀 Iteraciones

### Iteración 1: Grid de Equipos
**Objetivo**: Primer resultado visual - mostrar equipos y pilotos 2026
**Story Points**: 3
**Duración estimada**: 2 días

#### Tareas
- [ ] Setup monorepo Next.js + Tailwind + shadcn/ui
- [ ] Crear estructura de carpetas con barrel files
- [ ] Configurar cliente OpenF1
- [ ] Crear componente TeamCard (< 100 líneas)
- [ ] Crear componente DriverCard (< 100 líneas)
- [ ] Crear página Grid de Equipos
- [ ] Configurar Supabase básico
- [ ] Deploy inicial en Vercel

**Criterios de aceptación**:
- [ ] Se ven los 10 equipos con sus 2 pilotos
- [ ] Colores de equipos correctos
- [ ] Fotos de pilotos cargadas
- [ ] Responsive funcionando

---

### Iteración 2: Calendario Temporada
**Objetivo**: Ver todas las sesiones de la temporada 2026
**Story Points**: 3
**Duración estimada**: 2 días

#### Tareas
- [ ] Crear servicio de sincronización OpenF1 → Supabase
- [ ] Crear tabla Session en Prisma
- [ ] Crear endpoint GET /api/sessions
- [ ] Crear componente SessionCard
- [ ] Crear vista de Calendario
- [ ] Agrupar sesiones por Gran Premio
- [ ] Marcar sesiones pasadas/completadas

**Criterios de aceptación**:
- [ ] Se ven todos los GP de 2026
- [ ] Cada GP muestra sus 5 sesiones
- [ ] Fechas correctas en zona horaria local
- [ ] Navegación fluida entre sesiones

---

### Iteración 3: Tabla de Resultados
**Objetivo**: Ver resultados de cada sesión (Practice, Qualy, Race)
**Story Points**: 8
**Duración estimada**: 2 días

#### Tareas
- [ ] Crear tabla Lap en Prisma
- [ ] Sincronizar vueltas desde OpenF1
- [ ] Crear endpoint GET /api/sessions/:key/results
- [ ] Crear componente ResultsTable
- [ ] Diferenciar tipos de sesión (Practice/Qualy/Race)
- [ ] Mostrar tiempos por sector
- [ ] Agregar filtros por equipo
- [ ] Ordenamiento por columnas

**Criterios de aceptación**:
- [ ] Tabla estilo F1 con Pos, Piloto, Equipo, Tiempo
- [ ] Practice: mejor vuelta, compuesto, vueltas
- [ ] Qualy: Q1, Q2, Q3 tiempos
- [ ] Race: posición final, puntos, diferencias

---

### Iteración 4: Comparador Visual
**Objetivo**: Comparar dos pilotos con gráficos
**Story Points**: 15
**Duración estimada**: 3 días

#### Tareas
- [ ] Setup NestJS backend
- [ ] Configurar arquitectura limpia (SRP/DRY)
- [ ] Crear servicio ComparisonService
- [ ] Crear endpoint GET /api/compare
- [ ] Integrar Recharts para gráficos
- [ ] Gráfico de tiempos de vuelta (línea)
- [ ] Gráfico de sectores (barras)
- [ ] Selector de pilotos
- [ ] Vista de comparación lado a lado

**Criterios de aceptación**:
- [ ] Seleccionar 2 pilotos de cualquier sesión
- [ ] Gráfico de líneas con evolución de vueltas
- [ ] Colores distintivos por equipo
- [ ] Hover muestra datos exactos

---

### Iteración 5: IA - Análisis y Predicciones
**Objetivo**: Integrar NVIDIA API para análisis y predicciones
**Story Points**: 21
**Duración estimada**: 3 días

#### Tareas
- [ ] Configurar cliente NVIDIA API
- [ ] Crear servicio AIService con streaming
- [ ] Implementar agente Performance Engineer
- [ ] Endpoint POST /api/ai/analyze
- [ ] Análisis automático de comparaciones
- [ ] Predicción de Qualy basada en Practices
- [ ] Explicaciones de "por qué fue más rápido"
- [ ] Cache de análisis en Redis

**Criterios de aceptación**:
- [ ] IA analiza comparaciones en < 5 segundos
- [ ] Predicciones con % de confianza
- [ ] Explicaciones en lenguaje natural
- [ ] Streaming de respuesta funciona

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

| Iteración | Puntos | Estado | Progreso |
|-----------|--------|--------|----------|
| 1 - Grid Equipos | 3 | ⏳ Pendiente | 0% |
| 2 - Calendario | 3 | ⏳ Pendiente | 0% |
| 3 - Resultados | 8 | ⏳ Pendiente | 0% |
| 4 - Comparador | 15 | ⏳ Pendiente | 0% |
| 5 - IA | 21 | ⏳ Pendiente | 0% |
| 6 - Chat | 26 | ⏳ Pendiente | 0% |
| 7 - Polish | 16 | ⏳ Pendiente | 0% |
| **Total** | **92** | | **0%** |

---

## 📝 Tareas Pendientes (No asignadas a iteración)

### Alta Prioridad
- [x] Crear ARCHITECTURE.md con guías de arquitectura limpia
- [x] Actualizar SPEC.md: eliminar OpenAI, agregar predicciones, modo Colapinto
- [ ] Definir estructura de carpetas con barrel files
- [ ] Crear diagrama de arquitectura detallado

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

**Sprint**: Iteración 1 - Grid de Equipos
**Fecha inicio**: Por definir
**Fecha fin**: Por definir
**Story Points**: 3

### Daily Goals
- [ ] Día 1: Setup proyecto y estructura
- [ ] Día 2: Componentes y deploy inicial

---

## 📌 Notas

- Las estimaciones son aproximadas y pueden ajustarse
- Prioridad: resultado visual desde el día 1
- Cada iteración debe tener un entregable funcional
- Documentación se actualiza en paralelo al código

---

**Última actualización**: 2025-06-03
**Próxima revisión**: Al completar Iteración 1
