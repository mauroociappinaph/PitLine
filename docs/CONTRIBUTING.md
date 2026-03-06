# 🤝 Contributing to PitLine

¡Gracias por tu interés en contribuir a PitLine! Este documento te guiará en el proceso de contribución.

---

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/pitline.git
cd pitline
```

### 2. Setup del Entorno

```bash
# Instala dependencias
pnpm install

# Configura variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# Inicia la base de datos
pnpm db:push

# Corre el proyecto
pnpm dev
```

### 3. Crea una Rama

```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull origin main

# Crea tu rama de feature
git checkout -b feature/nombre-descriptivo
```

### 4. Desarrolla

- Sigue las guías de estilo del proyecto
- Escribe tests para tu código
- Asegúrate de que `pnpm lint` y `pnpm type-check` pasen

### 5. Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formatos válidos:
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato (espacios, puntos y comas)
refactor: refactorización de código
test: agregar o corregir tests
chore: tareas de mantenimiento
```

Ejemplos:
```bash
git commit -m "feat: add tire degradation analysis chart"
git commit -m "fix: resolve lap time calculation for pit out laps"
git commit -m "docs: update API endpoints documentation"
```

### 6. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Crea un Pull Request en GitHub
# Asegúrate de describir bien los cambios
```

---

## 📋 Checklist de Pull Request

Antes de enviar tu PR, asegúrate de:

- [ ] Tu código pasa todos los tests (`pnpm test`)
- [ ] Tu código pasa el lint (`pnpm lint`)
- [ ] El type check pasa (`pnpm type-check`)
- [ ] Has actualizado la documentación si es necesario
- [ ] Has agregado tests para tu código
- [ ] Tu PR tiene una descripción clara

---

## 🏗️ Estructura del Proyecto

```
pitline/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # NestJS backend
├── packages/
│   ├── shared-types/     # Tipos TypeScript
│   ├── f1-client/        # Cliente OpenF1
│   └── ui/               # Componentes compartidos
├── supabase/
│   └── migrations/       # Schema de DB
└── docs/                 # Documentación
```

---

## 🎨 Guías de Estilo

### TypeScript

- Usa `type` para tipos y `interface` para objetos que se extienden
- Prefiere `readonly` arrays cuando no se modificarán
- Usa `as const` para arrays/objetos constantes

```typescript
// ✅ Bien
type Driver = {
  readonly id: string;
  name: string;
};

const COMPOUNDS = ['SOFT', 'MEDIUM', 'HARD'] as const;
type Compound = typeof COMPOUNDS[number];
```

### React

- Usa function components
- Prefiere Server Components en Next.js App Router
- Usa hooks personalizados para lógica reutilizable

```typescript
// ✅ Bien
function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="card">
      <h3>{driver.name}</h3>
    </div>
  );
}
```

### CSS/Tailwind

- Usa clases de Tailwind cuando sea posible
- Para estilos complejos, usa CSS Modules
- Sigue el orden: layout → sizing → spacing → colors → effects

```tsx
// ✅ Bien
<div className="flex flex-col gap-4 p-6 bg-gray-900 rounded-lg shadow-lg">
```

---

## 🧪 Testing

### Unit Tests

```bash
# Corre tests
pnpm test

# Corre tests en modo watch
pnpm test:watch

# Corre tests con coverage
pnpm test:cov
```

### E2E Tests

```bash
# Corre tests e2e
pnpm test:e2e

# Corre tests e2e en modo UI
pnpm test:e2e:ui
```

---

## 📚 Recursos

- [SPEC.md](./SPEC.md) - Especificación técnica
- [AGENTS.md](./AGENTS.md) - Documentación de agentes IA
- [USER_STORIES.md](./USER_STORIES.md) - Historias de usuario

---

## ❓ Preguntas?

Si tienes preguntas, puedes:

1. Abrir un [Issue](https://github.com/mauroociappina/pitline/issues)
2. Contactarme en Twitter: [@mauroociappina](https://twitter.com/mauroociappina)

---

¡Gracias por contribuir a PitLine! 🏎️

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
