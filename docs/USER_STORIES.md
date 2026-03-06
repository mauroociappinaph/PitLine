# 📖 PitLine - Historias de Usuario

> Historias de usuario para el desarrollo de PitLine
> **Formato**: Como [rol], quiero [objetivo], para que [beneficio]
> **Priorización**: MoSCoW (Must, Should, Could, Won't)

---

## 📋 Índice

1. [Epics](#epics)
2. [Historias Must Have](#historias-must-have)
3. [Historias Should Have](#historias-should-have)
4. [Historias Could Have](#historias-could-have)
5. [Historias Won't Have (por ahora)](#historias-wont-have)

---

## 🎯 Epics

### EP-01: Exploración de Datos F1 2026
**Descripción**: Como usuario, quiero explorar la temporada 2026 de F1 de manera visual e intuitiva.

**Historias relacionadas**: US-001 a US-006

### EP-02: Análisis Comparativo
**Descripción**: Como usuario, quiero comparar pilotos y entender por qué uno fue más rápido que otro.

**Historias relacionadas**: US-007 a US-012

### EP-03: Asistencia con IA
**Descripción**: Como usuario, quiero que la IA me explique conceptos complejos de F1 usando datos reales.

**Historias relacionadas**: US-013 a US-018

### EP-04: Aprendizaje de F1
**Descripción**: Como usuario novato en F1, quiero aprender conceptos técnicos de forma interactiva.

**Historias relacionadas**: US-019 a US-022

---

## ✅ Historias Must Have

### US-001: Ver Grid de Equipos 2026
**Como** usuario de PitLine,
**quiero** ver todos los equipos de F1 de la temporada 2026 con sus pilotos,
**para que** entienda la estructura de la temporada actual.

**Criterios de Aceptación**:
- [ ] Muestro todos los 10 equipos de la temporada 2026
- [ ] Cada equipo muestra: nombre, color, y sus 2 pilotos
- [ ] Cada piloto muestra: foto, nombre, número, código (3 letras)
- [ ] Los equipos están ordenados según standings 2025 (o alfabético si no hay datos)
- [ ] El diseño es responsive (1 columna mobile, 2 tablet, 3+ desktop)

**Notas técnicas**:
- Endpoint: `GET /api/sessions?year=2026` → obtener session keys
- Luego: `GET /api/drivers?session_key={key}`
- Cachear en Supabase para reducir llamadas a OpenF1

**Estimación**: 3 puntos
**Iteración**: 1

---

### US-002: Ver Calendario de Temporada
**Como** usuario de PitLine,
**quiero** ver todas las sesiones de la temporada 2026,
**para que** sepa cuándo son los Grandes Premios y sus sesiones.

**Criterios de Aceptación**:
- [ ] Muestro todos los GP de la temporada 2026
- [ ] Cada GP muestra: nombre, país, fechas, circuito
- [ ] Dentro de cada GP, veo las sesiones: FP1, FP2, FP3, Qualy, Race
- [ ] Las sesiones pasadas están marcadas visualmente
- [ ] Puedo hacer clic en una sesión para ver detalles

**Notas técnicas**:
- Tabla `sessions` con `year=2026`
- Agrupar por `location` para formar los GP

**Estimación**: 3 puntos
**Iteración**: 2

---

### US-003: Ver Tabla de Resultados
**Como** usuario de PitLine,
**quiero** ver la tabla de resultados de una sesión específica,
**para que** sepa quién fue el más rápido.

**Criterios de Aceptación**:
- [ ] Muestro tabla estilo F1: Pos, Piloto, Equipo, Tiempo, Diferencia
- [ ] Para Qualy: muestro Q1, Q2, Q3 tiempos
- [ ] Para Race: muestro posición final, tiempo total, puntos
- [ ] Para Practice: muestro mejor vuelta, compuesto, vueltas totales
- [ ] Puedo ordenar por cualquier columna

**Notas técnicas**:
- Para Practice: `GET /api/laps?session_key={key}` → calcular mejor vuelta por piloto
- Para Qualy: datos de posiciones en qualifying
- Para Race: datos de posiciones finales

**Estimación**: 5 puntos
**Iteración**: 3

---

### US-004: Comparar Tiempos de Vuelta (Gráfico)
**Como** usuario de PitLine,
**quiero** ver un gráfico comparando las vueltas de dos pilotos,
**para que** visualice quién fue más consistente/rápido.

**Criterios de Aceptación**:
- [ ] Puedo seleccionar 2 pilotos de una sesión
- [ ] Veo un gráfico de líneas: eje X = número de vuelta, eje Y = tiempo
- [ ] Cada piloto tiene color distintivo (color del equipo)
- [ ] Puedo hacer hover para ver tiempo exacto de cada vuelta
- [ ] El gráfico es responsive y se ve bien en mobile

**Notas técnicas**:
- Usar Recharts para el gráfico
- Datos de tabla `laps`
- Filtrar out laps y in laps opcionalmente

**Estimación**: 5 puntos
**Iteración**: 4

---

### US-005: Ver Análisis IA Automático
**Como** usuario de PitLine,
**quiero** que la IA analice automáticamente una comparación de pilotos,
**para que** entienda por qué uno fue más rápido sin ser experto.

**Criterios de Aceptación**:
- [ ] Tras seleccionar 2 pilotos, hay un botón "Analizar con IA"
- [ ] La IA genera un análisis en menos de 5 segundos
- [ ] El análisis incluye: diferencia por sectores, consistencia, momentos clave
- [ ] El análisis se muestra en formato legible (no JSON)
- [ ] Puedo hacer nuevas preguntas sobre el mismo análisis

**Notas técnicas**:
- Usar agente "Performance Engineer"
- Streaming de respuesta desde NVIDIA API
- Cachear análisis similares

**Estimación**: 8 puntos
**Iteración**: 5

---

### US-006: Chat con Especialista IA
**Como** usuario de PitLine,
**quiero** hacer preguntas a un especialista de F1 (IA) sobre los datos,
**para que** aprenda conceptos técnicos de forma interactiva.

**Criterios de Aceptación**:
- [ ] Hay un chat disponible en todas las vistas
- [ ] Puedo seleccionar qué especialista consultar (Tire, Race, Performance, etc.)
- [ ] El chat mantiene contexto de la sesión/pilotos seleccionados
- [ ] La IA responde en español (o idioma seleccionado)
- [ ] Hay modo "Explicación simple" vs "Técnico"

**Notas técnicas**:
- UI tipo chat (similar a ChatGPT)
- Contexto pasado en cada mensaje
- Historial de conversación por sesión

**Estimación**: 8 puntos
**Iteración**: 6

---

## 🔶 Historias Should Have

### US-007: Ver Evolución de Tiempos por Sector
**Como** usuario de PitLine,
**quiero** ver cómo evolucionaron los tiempos por sector (S1, S2, S3),
**para que** identifique en qué parte del circuito ganó/perdió tiempo.

**Criterios de Aceptación**:
- [ ] Gráfico de barras apiladas o grouped por sector
- [ ] Puedo comparar 2 pilotos lado a lado
- [ ] Muestro mejores tiempos por sector
- [ ] Identifico el sector más rápido de cada piloto

**Estimación**: 5 puntos
**Iteración**: 4

---

### US-008: Ver Telemetría Comparada
**Como** usuario de PitLine,
**quiero** ver gráficos de telemetría (velocidad, RPM, throttle) de dos pilotos,
**para que** entienda diferencias en estilo de conducción.

**Criterios de Aceptación**:
- [ ] Puedo seleccionar una vuelta específica de cada piloto
- [ ] Veo gráfico de velocidad superpuesto
- [ ] Veo gráfico de throttle/brake (opcional)
- [ ] El eje X es la distancia en el circuito (no tiempo)

**Notas técnicas**:
- Datos de `car_data` (muestreo)
- Usar D3.js para gráficos complejos
- DRS zones marcadas en el gráfico

**Estimación**: 8 puntos
**Iteración**: 5

---

### US-009: Predicción de Qualy
**Como** usuario de PitLine,
**quiero** que la IA prediga el resultado de la clasificación basándose en los practices,
**para que** tenga una expectativa antes de la qualy.

**Criterios de Aceptación**:
- [ ] Basado en datos de FP1, FP2, FP3
- [ ] Predice top 10 (o top 5)
- [ ] Muestra confianza de la predicción (%)
- [ ] Explica el razonamiento de la IA
- [ ] Compara predicción vs resultado real post-qualy

**Estimación**: 5 puntos
**Iteración**: 6

---

### US-010: Modo Oscuro
**Como** usuario de PitLine,
**quiero** poder usar la app en modo oscuro,
**para que** sea más cómodo ver datos en ambientes con poca luz.

**Criterios de Aceptación**:
- [ ] Toggle de modo oscuro/claro
- [ ] Persiste preferencia en localStorage
- [ ] Todos los componentes se ven bien en modo oscuro
- [ ] Gráficos adaptan colores para modo oscuro

**Estimación**: 3 puntos
**Iteración**: 7

---

### US-011: Filtrar por Equipo
**Como** usuario de PitLine,
**quiero** filtrar visualizaciones por equipo específico,
**para que** me enfoque solo en los pilotos que me interesan.

**Criterios de Aceptación**:
- [ ] Selector de equipos en vistas de sesión
- [ ] Solo muestro pilotos del equipo seleccionado
- [ ] Puedo seleccionar múltiples equipos
- [ ] Persiste selección al navegar

**Estimación**: 3 puntos
**Iteración**: 3

---

### US-012: Ver Datos de Neumáticos
**Como** usuario de PitLine,
**quiero** ver qué compuestos usó cada piloto y cuántas vueltas,
**para que** entienda estrategias de neumáticos.

**Criterios de Aceptación**:
- [ ] En tabla de resultados, columna de compuesto usado
- [ ] Indicador de vueltas en ese compuesto
- [ ] Stints visuales (timeline de neumáticos)
- [ ] Análisis de degradación por compuesto

**Estimación**: 5 puntos
**Iteración**: 4

---

## 🔷 Historias Could Have

### US-013: Modo Aprendizaje "Conceptos F1"
**Como** usuario novato en F1,
**quiero** aprender conceptos como "undercut", "DRS", "degradación" con ejemplos reales,
**para que** entienda mejor el deporte.

**Criterios de Aceptación**:
- [ ] Sección "Aprender F1" en el menú
- [ ] Conceptos explicados con datos de 2026
- [ ] Ejemplos reales de carreras pasadas
- [ ] Quiz para verificar comprensión

**Estimación**: 8 puntos
**Iteración**: 7

---

### US-014: Mapa de Pista con Velocidad
**Como** usuario de PitLine,
**quiero** ver un mapa del circuito con heatmap de velocidad,
**para que** visualice dónde van más rápido/lento.

**Criterios de Aceptación**:
- [ ] Mapa simplificado del circuito
- [ ] Colores indican velocidad (heatmap)
- [ ] Puedo comparar 2 pilotos
- [ ] Marcas de sectores y DRS zones

**Estimación**: 8 puntos
**Iteración**: 5

---

### US-015: Notificaciones de Sesiones
**Como** usuario de PitLine,
**quiero** recibir notificaciones antes de que empiecen las sesiones,
**para que** no me pierda ninguna.

**Criterios de Aceptación**:
- [ ] Puedo suscribirme a notificaciones
-- [ ] Notificación 30 min antes de cada sesión
- [ ] Notificación cuando hay datos nuevos disponibles
- [ ] Configurar qué sesiones me interesan (solo qualys, todo, etc.)

**Estimación**: 5 puntos
**Iteración**: 6

---

### US-016: Exportar Datos
**Como** usuario de PitLine,
**quiero** exportar datos de una sesión a CSV/Excel,
**para que** haga mi propio análisis offline.

**Criterios de Aceptación**:
- [ ] Botón "Exportar" en vistas de sesión
- [ ] Formato CSV con todos los datos visibles
- [ ] Opción de exportar raw data (más columnas)
- [ ] ZIP con múltiples archivos si es necesario

**Estimación**: 3 puntos
**Iteración**: 6

---

### US-017: Historial de Análisis IA
**Como** usuario de PitLine,
**quiero** ver mi historial de análisis con la IA,
**para que** vuelva a consultar explicaciones anteriores.

**Criterios de Aceptación**:
- [ ] Sección "Mi Historial" en el menú
- [ ] Lista de análisis previos con fecha y sesión
- [ ] Puedo buscar en el historial
- [ ] Puedo favoritar análisis útiles

**Estimación**: 5 puntos
**Iteración**: 6

---

### US-018: Comparar con Temporadas Anteriores
**Como** usuario de PitLine,
**quiero** comparar datos de 2026 con temporadas anteriores,
**para que** vea la evolución del rendimiento.

**Criterios de Aceptación**:
- [ ] Selector de temporada (2023, 2024, 2025, 2026)
- [ ] Mismo circuito, diferentes años
- [ ] Comparación de tiempos de pole
- [ ] Evolución de velocidad máxima

**Estimación**: 5 puntos
**Iteración**: 7

---

## 🚫 Historias Won't Have (por ahora)

### US-W01: Datos en Tiempo Real
**Motivo**: OpenF1 API gratuita no provee datos live, solo post-sesión.
**Reconsiderar**: Si conseguimos acceso a datos live o API paga.

### US-W02: Autenticación de Usuarios
**Motivo**: App personal, no multi-usuario por ahora.
**Reconsiderar**: Si se decide compartir públicamente.

### US-W03: App Móvil Nativa
**Motivo**: Priorizar web responsive primero.
**Reconsiderar**: Si hay demanda y recursos.

### US-W04: Integración con Fantasy F1
**Motivo**: Fuera del alcance actual.
**Reconsiderar**: Como feature premium futuro.

---

## 📊 Resumen por Prioridad

| Prioridad | Cantidad | Story Points |
|-----------|----------|--------------|
| Must Have | 6 | 32 puntos |
| Should Have | 6 | 29 puntos |
| Could Have | 6 | 34 puntos |
| Won't Have | 4 | - |
| **Total** | **22** | **95 puntos** |

---

## 🗓️ Distribución por Iteración

| Iteración | Historias | Puntos | Entregable |
|-----------|-----------|--------|------------|
| 1 | US-001 | 3 | Grid de equipos |
| 2 | US-002 | 3 | Calendario temporada |
| 3 | US-003, US-011 | 8 | Tabla de resultados + filtros |
| 4 | US-004, US-007, US-012 | 15 | Comparador + sectores + neumáticos |
| 5 | US-005, US-008, US-014 | 21 | IA + telemetría + mapa |
| 6 | US-006, US-009, US-015, US-016, US-017 | 26 | Chat IA + predicciones + extras |
| 7 | US-010, US-013, US-018 | 16 | Polish + modo aprendizaje |

---

## ✅ Definition of Done

Para todas las historias:

- [ ] Código funcional en main branch
- [ ] Tests unitarios (>70% coverage)
- [ ] Tests de integración si aplica
- [ ] Revisión de código
- [ ] Documentación actualizada
- [ ] Funciona en staging
- [ ] UI responsive verificada
- [ ] Lighthouse score > 90

---

**Documentación relacionada:**
- [SPEC.md](./SPEC.md) - Especificación técnica
- [AGENTS.md](./AGENTS.md) - Especialistas IA
