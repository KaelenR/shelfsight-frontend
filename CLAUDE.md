# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShelfSight is an AI-assisted library management system. This is the **frontend** repository. The backend lives in a separate repo ([shelfsight-backend](https://github.com/Chimezie03/shelfsight-backend)).

## Development Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** TailwindCSS v4 (CSS-first config in `globals.css`)
- **Component Library:** ShadCN/UI (46 components in `src/components/ui/`)
- **Icons:** lucide-react
- **Charts:** recharts
- **Animations:** motion (framer-motion)
- **Toasts:** sonner
- **Theme:** next-themes (light/dark support)
- **Deployment:** Vercel
- **Runtime:** Node.js v20.x LTS or higher

## Architecture

Three-tier system: Next.js frontend (Vercel) → Express REST API (backend repo) → PostgreSQL (AWS RDS or Supabase).

### App Router Structure

```
src/app/
├── layout.tsx                    # Root layout (fonts, providers, toaster)
├── page.tsx                      # Login page (root "/")
├── globals.css                   # TailwindCSS v4 theme + base styles
└── (dashboard)/                  # Route group with sidebar layout
    ├── layout.tsx                # Collapsible sidebar navigation
    ├── dashboard/page.tsx
    ├── ingest/page.tsx           # AI book ingestion
    ├── map/page.tsx              # Interactive 2D library map
    ├── catalog/page.tsx
    ├── circulation/page.tsx      # Check-in/check-out
    ├── members/page.tsx
    └── reports/page.tsx          # Analytics with recharts
```

### Key Directories

- `src/components/ui/` — ShadCN UI primitives (button, card, table, dialog, etc.)
- `src/components/providers.tsx` — Client-side ThemeProvider wrapper
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `Figma Mockups/` — Original Vite prototype from Figma Make (design reference only, excluded from TS compilation)

### Design Patterns

- Primary brand color: `indigo-600`
- All page components are client components (`"use client"`)
- Pages currently use mock data — backend API integration is pending
- Sidebar navigation uses Next.js `<Link>` with `usePathname()` for active state
- ShadCN components import `cn` from `@/lib/utils`

### Key Feature Areas

- **Catalog management** — book CRUD, search/filter by title, author, subject, Dewey category
- **AI book ingestion** — image upload (cover/spine) → OCR → ISBN detection → metadata enrichment → Dewey Decimal classification suggestions
- **Circulation** — check-in/check-out, due dates, overdue tracking, fine calculation
- **2D library map** — SVG-based interactive map with clickable shelf sections, first-person shelf view with framer-motion animations
- **Member portal** — user profiles, active loans, fines

### Backend API Contract

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Authenticate; returns JWT + role |
| `GET` | `/users/me` | Current user profile, loans, fines |
| `GET` | `/books` | Search/filter books |
| `POST` | `/books` | Create book record (Staff/Admin) |
| `POST` | `/ingest/analyze` | Image upload → AI-generated metadata for review |
| `POST` | `/loans/checkout` | Create loan, set CHECKED_OUT |
| `POST` | `/loans/checkin` | Return book, calculate fines |
| `GET` | `/map/sections` | 2D map coordinates + labels |
| `GET` | `/map/shelves/:id` | Shelf contents for first-person view |

## Project Links

- **Jira:** https://t10-shelfsight.atlassian.net/jira/software/projects/KAN/boards/1
- **Figma:** https://www.figma.com/design/eSVYSDo7JNH0Rv1Rxuhbng/UI-UX-Design
- **Backend repo:** https://github.com/Chimezie03/shelfsight-backend
