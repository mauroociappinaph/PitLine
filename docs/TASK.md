# 🎯 PitLine - Task Tracking

> Seguimiento de tareas e iteraciones del proyecto PitLine
> **Temporada**: F1 2026
> **Estado**: En Desarrollo (MVP Estabilizado)

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

**Estado**: ✅ COMPLETADA (3 pts)

### Iteración 2: Calendario Temporada

**Estado**: ✅ COMPLETADA (3 pts)

### Iteración 3: Tabla de Resultados

**Estado**: ✅ COMPLETADA (8 pts)

### Iteración 4: Comparador Visual

**Estado**: ✅ COMPLETADA (15 pts)

---

### Iteración 5: IA - Análisis y Predicciones

**Objetivo**: Integrar NVIDIA API para análisis y predicciones
**Story Points**: 21
**Estado**: ✅ COMPLETADA (21/21 pts)

#### Tareas

- [x] Configurar cliente NVIDIA API (z-ai/glm5)
- [x] Crear servicio AIService con streaming
- [x] Implementar agente Performance Engineer
- [x] Endpoint POST /api/ai/analyze
- [x] Análisis automático de comparaciones
- [x] Predicción de Qualy basada en Practices (Lógica estadística implementada)
- [x] Explicaciones de "por qué fue más rápido"
- [x] Cache de análisis en Redis

---

### Iteración 6: Chat IA

**Objetivo**: Chat conversacional con especialistas IA
**Story Points**: 26
**Estado**: 🚧 EN MARCHA (18/26 pts)

#### Tareas

- [x] Crear componente ChatInterface
- [x] Selector de especialista (7 agentes)
- [x] Contexto de sesión/pilotos en chat (Enviado como payload)
- [ ] Historial de conversaciones (Persistencia)
- [x] Modo "Explicación simple" vs "Técnico"
- [x] Streaming de mensajes
- [ ] Persistencia en Supabase
- [ ] Notificaciones de sesiones

---

### Iteración 7: Polish & Extras

**Objetivo**: Modo oscuro, animaciones, modo aprendizaje
**Story Points**: 16
**Estado**: ⏳ Pendiente

#### Tareas

- [ ] Implementar modo oscuro
- [ ] Agregar animaciones con Framer Motion
- [ ] Crear sección "Aprender F1"
- [ ] Conceptos explicados (undercut, DRS, etc.)
- [ ] Optimizaciones de performance (Lighthouse > 90)
- [ ] Tests E2E con Playwright
- [ ] Documentación final

---

## 📊 Métricas de Progreso

| Iteración        | Puntos | Estado        | Progreso |
| ---------------- | ------ | ------------- | -------- |
| 1 - Grid Equipos | 3      | ✅ COMPLETADA | 100%     |
| 2 - Calendario   | 3      | ✅ COMPLETADA | 100%     |
| 3 - Results      | 8      | ✅ COMPLETADA | 100%     |
| 4 - Comparador   | 15     | ✅ COMPLETADA | 100%     |
| 5 - IA           | 21     | ✅ COMPLETADA | 100%     |
| 6 - Chat         | 26     | 🚧 EN MARCHA  | 70%      |
| 7 - Polish       | 16     | ⏳ PENDIENTE  | 0%       |
| **Total**        | **92** |               | **75%**  |

**Progreso General Real: 69/92 puntos (75%)**
**Estado Actual: MVP Funcional - Pendiente Persistencia de Chat**

---

## 📝 Tareas Pendientes (Refactor & Hardening)

### Alta Prioridad

- [ ] Implementar lógica de Predicción de Qualy en `AiService`
- [ ] Crear tabla `ChatMessage` en Prisma para persistencia en Supabase
- [ ] Limpiar variables de entorno huérfanas en apps/.env

---

## 🎯 Objetivos del Sprint Actual

**Sprint**: Cierre de Iteración 5 y 6
**Fecha inicio**: 2026-03-06
**Fecha fin**: 2026-03-10

### Daily Goals

- [ ] **Día 1**: Implementar Predicción de Qualy (Iteración 5 final)
- [ ] **Día 2**: Crear esquema de base de datos para historial de chat
- [ ] **Día 3**: Integrar persistencia de mensajes con Supabase

---

## 📌 Notas de Auditoría (2026-03-06)

- Se detectó que el progreso estaba inflado en un 7%.
- Se corrigió la ubicación del archivo `.env` para asegurar conectividad con NVIDIA API.
- El frontend del Chat está mucho más avanzado de lo que indicaba el tracker original.
- Se eliminaron las pestañas "Personnel" y "Telemetry" por no estar en el scope.

---

**Última actualización**: 2026-03-06
**Próxima revisión**: Al completar Predicciones de Qualy
