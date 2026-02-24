# ShelfSight Frontend

AI-Assisted Library Management System — built with Next.js, ShadCN/UI, and TailwindCSS.

## Getting Started

**Prerequisites:** Node.js v20.x LTS or higher

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** TailwindCSS v4
- **Component Library:** ShadCN/UI
- **Icons:** lucide-react
- **Charts:** recharts
- **Animations:** motion (framer-motion)
- **Deployment:** Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | Login |
| `/dashboard` | Admin dashboard with stats and AI recommendations |
| `/ingest` | AI-assisted book ingestion via image upload |
| `/map` | Interactive 2D library map with shelf zoom |
| `/catalog` | Book catalog with search, filter, and CRUD |
| `/circulation` | Check-in / check-out management |
| `/members` | Member management |
| `/reports` | Analytics and reporting with charts |

## Project Links

- [Jira Board](https://t10-shelfsight.atlassian.net/jira/software/projects/KAN/boards/1)
- [Figma Designs](https://www.figma.com/design/eSVYSDo7JNH0Rv1Rxuhbng/UI-UX-Design)
- [Backend Repository](https://github.com/Chimezie03/shelfsight-backend)
