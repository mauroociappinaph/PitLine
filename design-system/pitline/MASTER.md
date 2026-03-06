# 🎨 PitLine - Design System

> Sistema de diseño para plataforma de análisis F1
> **Generado**: 2025-06-03
> **Stack**: Next.js + Tailwind CSS + shadcn/ui

---

## 📋 Resumen del Design System

| Aspecto | Valor |
|---------|-------|
| **Patrón** | Webinar Registration (adaptado para live data) |
| **Estilo** | Dark Mode (OLED) |
| **Mood** | Dashboard, data, analytics, technical, precise |
| **Performance** | ⚡ Excellent |
| **Accessibility** | ✓ WCAG AAA |

---

## 🎨 Paleta de Colores

### Colores Base (Design System)

| Rol | Color | Hex | Uso |
|-----|-------|-----|-----|
| **Primary** | Azul profundo | `#1E40AF` | Elementos principales, navegación |
| **Secondary** | Azul brillante | `#3B82F6` | Acents, hover states, links |
| **CTA** | Ámbar/Dorado | `#F59E0B` | Botones de acción, highlights |
| **Background** | Gris muy claro | `#F8FAFC` | Fondo claro (fallback) |
| **Text** | Azul oscuro | `#1E3A8A` | Texto principal en modo claro |

### Colores F1 - Escuderías 2026

| Escudería | Color | Hex | Uso |
|-----------|-------|-----|-----|
| **Red Bull Racing** | Azul RB | `#3671C6` | Datos de Verstappen, Tsunoda |
| **Mercedes** | Turquesa | `#6CD3BF` | Datos de Hamilton, Russell |
| **Ferrari** | Rosso Corsa | `#E80020` | Datos de Leclerc, Hamilton |
| **McLaren** | Naranja Papaya | `#FF8000` | Datos de Norris, Piastri |
| **Aston Martin** | Verde Racing | `#229971` | Datos de Alonso, Stroll |
| **Alpine** | Azul Alpine | `#0093CC` | Datos de Gasly, Doohan |
| **Williams** | Azul claro | `#64C4FF` | Datos de Albon, Colapinto |
| **Racing Bulls** | Azul Navy | `#6692FF` | Datos de Lawson, Hadjar |
| **Stake F1** | Negro/Verde | `#000000` | Datos de Hülkenberg, Bortoleto |
| **Haas** | Gris/Blanco | `#B6BABD` | Datos de Bearman, Ocon |
| **Cadillac Racing** | Dorado | `#FFD700` | Datos de Piloto 1, Piloto 2 |

### Modo Oscuro (Default)

| Rol | Color | Hex | Uso |
|-----|-------|-----|-----|
| **Background** | Negro profundo | `#0A0A0F` | Fondo principal |
| **Surface** | Gris oscuro | `#1A1A24` | Tarjetas, paneles |
| **Surface Elevated** | Gris medio | `#252532` | Hover states, modales |
| **Border** | Gris borde | `#333344` | Bordes sutiles |
| **Text Primary** | Blanco | `#FFFFFF` | Títulos, datos importantes |
| **Text Secondary** | Gris claro | `#A0A0B0` | Descripciones, labels |
| **Text Muted** | Gris | `#6B6B7B` | Timestamps, metadatos |

---

## 🔤 Tipografía

### Fuentes Principales

| Uso | Fuente | Fallback |
|-----|--------|----------|
| **Headings** | Fira Sans | system-ui, sans-serif |
| **Body** | Fira Sans | system-ui, sans-serif |
| **Data/Numbers** | Fira Code | monospace |
| **Code** | Fira Code | monospace |

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap');
```

### Tailwind Config

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Fira Sans', 'system-ui', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
}
```

### Jerarquía Tipográfica

| Elemento | Tamaño | Peso | Line Height |
|----------|--------|------|-------------|
| **H1** | 2.5rem (40px) | 700 | 1.2 |
| **H2** | 2rem (32px) | 600 | 1.3 |
| **H3** | 1.5rem (24px) | 600 | 1.4 |
| **H4** | 1.25rem (20px) | 500 | 1.4 |
| **Body** | 1rem (16px) | 400 | 1.6 |
| **Small** | 0.875rem (14px) | 400 | 1.5 |
| **Data Large** | 2rem (32px) | 700 | 1.1 |
| **Data Medium** | 1.5rem (24px) | 600 | 1.1 |
| **Data Small** | 1rem (16px) | 500 | 1.1 |

---

## ✨ Efectos Visuales

### Glow/Bloom (Colores de Equipos)

```css
/* Glow azul (Red Bull) */
.glow-rb {
  box-shadow: 0 0 20px rgba(54, 113, 198, 0.3);
}

/* Glow naranja (McLaren) */
.glow-mclaren {
  box-shadow: 0 0 20px rgba(255, 128, 0, 0.3);
}

/* Glow rojo (Ferrari) */
.glow-ferrari {
  box-shadow: 0 0 20px rgba(232, 0, 32, 0.3);
}

/* Glow para textos */
.text-glow {
  text-shadow: 0 0 10px currentColor;
}
```

### Gradientes

```css
/* Gradiente F1 (para hero/headers) */
.gradient-f1 {
  background: linear-gradient(135deg, #E80020 0%, #FF8000 25%, #3671C6 50%, #6CD3BF 75%, #229971 100%);
}

/* Gradiente oscuro (para overlays) */
.gradient-dark {
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.8) 100%);
}

/* Gradiente sutil para tarjetas */
.gradient-card {
  background: linear-gradient(145deg, #1A1A24 0%, #252532 100%);
}
```

### Transiciones

```css
/* Micro-interacciones (150-300ms) */
.transition-fast {
  transition: all 150ms ease;
}

.transition-normal {
  transition: all 200ms ease;
}

.transition-slow {
  transition: all 300ms ease;
}

/* Transformaciones suaves */
.hover-lift:hover {
  transform: translateY(-2px);
}
```

---

## 🧩 Componentes Base

### Tarjetas (Cards)

```css
/* Card base */
.card {
  background: #1A1A24;
  border: 1px solid #333344;
  border-radius: 12px;
  padding: 1.5rem;
}

/* Card con glow de equipo */
.card-team-rb {
  background: #1A1A24;
  border: 1px solid #3671C6;
  box-shadow: 0 0 20px rgba(54, 113, 198, 0.15);
}
```

### Botones

```css
/* Primary CTA */
.btn-primary {
  background: #F59E0B;
  color: #0A0A0F;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: #FBBF24;
  transform: translateY(-1px);
}

/* Secondary */
.btn-secondary {
  background: #1E40AF;
  color: white;
  border: 1px solid #3B82F6;
}

/* Ghost (para modo oscuro) */
.btn-ghost {
  background: transparent;
  color: #A0A0B0;
  border: 1px solid #333344;
}

.btn-ghost:hover {
  background: #252532;
  color: white;
}
```

### Indicadores "Live"

```css
/* Pulsing dot */
.live-indicator {
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Badge */
.live-badge {
  background: rgba(34, 197, 94, 0.2);
  color: #22C55E;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}
```

---

## 📊 Visualización de Datos

### Gráficos

- Usar **Recharts** para gráficos de líneas/barras
- Colores de equipos para series comparativas
- Fondo transparente o `#1A1A24`
- Grid lines sutiles (`#333344`)
- Tooltips con fondo `#252532` y borde `#333344`

### Tablas (Estilo F1)

```css
.table-f1 {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table-f1 th {
  background: #1A1A24;
  color: #6B6B7B;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #333344;
}

.table-f1 td {
  padding: 1rem;
  border-bottom: 1px solid #252532;
}

.table-f1 tr:hover {
  background: #252532;
}
```

### Timeline de Vueltas

```css
.lap-timeline {
  display: flex;
  gap: 2px;
}

.lap-dot {
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: currentColor;
}

.lap-dot-fastest {
  background: #F59E0B;
  box-shadow: 0 0 8px #F59E0B;
}

.lap-dot-personal-best {
  background: #22C55E;
}
```

---

## 🎭 Modo Colapinto (Especial)

### Layout

- **Sidebar izquierda**: Navegación principal
- **Área central grande**: Datos en vivo de Colapinto
- **Panel derecho**: Chat con IA contextual
- **Bottom bar**: Timeline de la sesión

### Colores Específicos

```css
/* Accent Williams */
.colapinto-accent {
  color: #64C4FF;
}

.colapinto-glow {
  box-shadow: 0 0 30px rgba(100, 196, 255, 0.2);
}

/* Comparación con Albon */
.colapinto-vs-albon {
  background: linear-gradient(90deg, #64C4FF 0%, #64C4FF 50%, #FF8000 50%, #FF8000 100%);
}
```

### Componentes

1. **Live Position Card**: Posición actual con cambios (↑↓)
2. **Last Lap Widget**: Última vuelta + delta
3. **Tire Indicator**: Compuesto + degradación visual
4. **Gap to Leader**: Gap en tiempo real
5. **Sector Times**: S1, S2, S3 con colores (verde/púrpura)
6. **AI Chat Panel**: Preguntas contextuales

---

## 📱 Responsive Breakpoints

| Breakpoint | Tamaño | Uso |
|------------|--------|-----|
| **Mobile** | < 640px | Layout single column, datos apilados |
| **Tablet** | 640px - 1024px | Layout 2 columnas, sidebar colapsable |
| **Desktop** | 1024px - 1440px | Layout completo, 3 columnas |
| **Wide** | > 1440px | Layout expandido, más datos visibles |

---

## ✅ Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis usados como icons (usar SVG: Heroicons/Lucide)
- [ ] Todos los íconos de set consistente
- [ ] Hover states sin layout shift
- [ ] Colores de equipos correctos (verificar con 2026)
- [ ] Logo de F1/FIA correctos

### Interaction
- [ ] `cursor-pointer` en elementos clickeables
- [ ] Feedback visual en hover (color/shadow)
- [ ] Transiciones suaves (150-300ms)
- [ ] Estados de loading (skeletons/spinners)

### Modo Oscuro (Default)
- [ ] Contraste de texto >= 4.5:1
- [ ] Elementos glass visibles
- [ ] Bordes visibles en tarjetas
- [ ] Testeado en OLED

### Accessibility
- [ ] Alt text en imágenes
- [ ] Labels en formularios
- [ ] Focus states visibles
- [ ] `prefers-reduced-motion` respetado

### Responsive
- [ ] 375px (mobile)
- [ ] 768px (tablet)
- [ ] 1024px (desktop)
- [ ] 1440px (wide)
- [ ] Sin scroll horizontal en mobile

---

## 🚫 Anti-patterns a Evitar

1. **Light mode default** - El modo oscuro es el default
2. **Slow rendering** - Optimizar para 60fps
3. **Emojis como icons** - Usar SVG siempre
4. **Colores de equipos incorrectos** - Verificar 2026
5. **Texto sin contraste** - Siempre >= 4.5:1
6. **Animaciones excesivas** - Mantener profesional
7. **Datos desactualizados** - Timestamps claros

---

## 📚 Referencias

- [F1 Brand Guidelines](https://www.formula1.com/)
- [2026 Team Colors](https://www.formula1.com/en/teams.html)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Documentación relacionada:**
- [SPEC.md](../../docs/SPEC.md) - Especificación técnica
- [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) - Arquitectura del proyecto

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
