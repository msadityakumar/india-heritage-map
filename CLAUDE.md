# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Full-stack development (recommended):**
```bash
npm run dev:all        # Run frontend (port 5173) and backend (port 3000) concurrently
```

**Frontend only:**
```bash
npm run dev            # Vite dev server on port 5173
npm run build          # TypeScript check + Vite build to /dist
npm run lint           # oxlint
npm run preview        # Preview production build
```

**Backend only:**
```bash
cd server && npm run dev       # Fastify with --watch and --experimental-strip-types
cd server && npm run db:push   # Push Prisma schema to PostgreSQL
cd server && npm run seed      # Seed database with monument data (idempotent upserts)
```

**Database:** Requires a local PostgreSQL instance. Connection string is in `server/.env` (`postgresql://adi@localhost:5432/heritage_map`).

## Architecture

Interactive map of Indian historical monuments — React frontend + Fastify backend + PostgreSQL via Prisma.

**Data flow:**
```
React (Vite) → /api proxy → Fastify (port 3000) → Prisma → PostgreSQL
```

**Frontend (`/src`):**
- `App.tsx` — root state owner: monument list, loading state, selected monument
- `MapView.tsx` — Leaflet map rendering custom CSS pin markers per monument
- `SidePanel.tsx` — detail panel for the selected monument (name, dynasty, era, description)
- `monuments.ts` — shared `Monument` TypeScript interface

**Backend (`/server/src`):**
- `index.ts` — Fastify setup, CORS (allows `localhost:5173`), registers routes
- `routes/monuments.ts` — `GET /monuments` (supports `?dynasty=` and `?era=` query filters, case-insensitive) and `GET /monuments/:id`
- `prisma/schema.prisma` — `Monument` model: `id`, `name`, `state`, `dynasty`, `era`, `description`, `lat`, `lng`
- `prisma/seed.ts` — 10 hardcoded monuments seeded via upsert

**Vite proxy:** All `/api/*` requests from the frontend are proxied to `localhost:3000` (configured in `vite.config.ts`), so frontend fetches use `/api/monuments` paths.

**Linting:** oxlint with React and TypeScript plugins. Rules enforce hooks rules (`react/rules-of-hooks: error`) and component export patterns (`react/only-export-components: warn`).
