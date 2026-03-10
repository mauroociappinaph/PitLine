# 🏎️ PitLine

##WORK in PROGRESS##

[![CI/CD](https://github.com/mauroociappina/pitline/actions/workflows/ci.yml/badge.svg)](https://github.com/mauroociappina/pitline/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red.svg)](https://nestjs.com/)

> Plataforma de análisis de Fórmula 1 con inteligencia artificial. Visualiza datos, compara pilotos y aprende conceptos técnicos de F1 de forma interactiva.

![PitLine Preview](./docs/preview.png)

---

## ✨ Features

- 📊 **Datos de F1 2026**: Toda la temporada con datos de OpenF1
- 🎨 **Visualizaciones**: Gráficos interactivos de tiempos, sectores y telemetría
- ⚔️ **Comparador de Pilotos**: Análisis lado a lado con explicaciones IA
- 🤖 **Agentes Especialistas**: 7 expertos de F1 (neumáticos, estrategia, rendimiento, etc.)
- 💬 **Chat IA**: Pregunta sobre los datos y recibe explicaciones detalladas
- 🎓 **Modo Aprendizaje**: Conceptos técnicos explicados con ejemplos reales

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Cuenta en [Supabase](https://supabase.com)
- API Key de [NVIDIA](https://www.nvidia.com/en-us/ai/)

### Installation

```bash
# Clone el repositorio
git clone https://github.com/mauroociappina/pitline.git
cd pitline

# Instala dependencias
pnpm install

# Configura variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# Inicia la base de datos
pnpm db:push

# Inicia el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- API: http://localhost:3001

---

## 🏗️ Architecture

```
pitline/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── app/               # App Router
│   │   ├── components/        # React components
│   │   └── lib/               # Utils y hooks
│   └── api/                   # NestJS backend
│       ├── src/
│       │   ├── ai/            # Servicios de IA
│       │   ├── f1/            # Sync OpenF1
│       │   └── sessions/      # Gestión de sesiones
│       └── test/
├── packages/
│   ├── shared-types/          # Tipos TypeScript
│   ├── f1-client/            # Cliente OpenF1
│   └── ui/                   # Componentes compartidos
├── supabase/
│   ├── migrations/           # Schema de DB
│   └── seed/                 # Datos iniciales
└── docs/                     # Documentación
```

### Tech Stack

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| **Backend** | NestJS 11, TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **Cache** | Redis (Upstash) |
| **AI** | NVIDIA API (z-ai/glm5) |
| **Charts** | Recharts, D3.js |
| **State** | Zustand, React Query |

---

## 📖 Documentation

- [SPEC.md](./docs/SPEC.md) - Especificación técnica completa
- [AGENTS.md](./docs/AGENTS.md) - Especialistas IA y sus prompts
- [USER_STORIES.md](./docs/USER_STORIES.md) - Historias de usuario

---

## 🧪 Testing

```bash
# Tests unitarios
pnpm test

# Tests e2e
pnpm test:e2e

# Coverage
pnpm test:cov

# Lint
pnpm lint

# Type check
pnpm type-check
```

---

## 🚀 Deployment

### Vercel (Frontend)

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway/Render (Backend)

El backend se despliega automáticamente via GitHub Actions cuando se hace push a `main`.

### Supabase

La base de datos se migra automáticamente en el pipeline de CI/CD.

---

## 🤖 AI Agents

PitLine utiliza 7 especialistas de F1 implementados como agentes IA:

| Agente | Especialidad |
|--------|-------------|
| 🔴 **Tire Engineer** | Compuestos, degradación, gestión térmica |
| 🎧 **Race Engineer** | Estrategia global, toma de decisiones |
| ⚡ **Performance Engineer** | Setup, balance, análisis de rendimiento |
| 📡 **Telemetry Engineer** | Datos de sensores, telemetría |
| 🎯 **Strategy Analyst** | Modelado de escenarios, probabilidades |
| 💨 **Aerodynamicist** | Downforce, drag, eficiencia aerodinámica |
| 🌡️ **Trackside Engineer** | Condiciones de pista, evolución del asfalto |

Ver [AGENTS.md](./AGENTS.md) para documentación completa.

---

## 🤝 Contributing

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Conventional Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new comparison chart
fix: resolve lap time calculation bug
docs: update API documentation
refactor: improve data sync performance
test: add unit tests for AI service
```

### Pre-commit Hooks

Husky ejecuta automáticamente:
- ESLint
- Prettier
- Type checking
- Tests relacionados

---

## 📄 License

Este proyecto está licenciado bajo MIT License - ver [LICENSE](./LICENSE) para más detalles.

---

## 🙏 Acknowledgments

- [OpenF1](https://openf1.org/) - API de datos de Fórmula 1
- [NVIDIA](https://www.nvidia.com/) - API de IA
- [FIA](https://www.fia.com/) - Reglamento técnico F1

---

## 📞 Contact

Mauro Ociappina - [@mauroociappina](https://twitter.com/mauroociappina)

Project Link: [https://github.com/mauroociappina/pitline](https://github.com/mauroociappina/pitline)

---

<p align="center">
  Made with ❤️ and ☕ for F1 fans
</p>
