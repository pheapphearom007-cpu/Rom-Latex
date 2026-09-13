# Learn LaTeX

> Interactive LaTeX course, real-time playground, syntax reference, and drill exercises for scholars, students, and researchers.

![Learn LaTeX Screenshot](./public/favicon.svg)

## Overview

**Learn LaTeX** is a modern, web-first platform designed to teach LaTeX from initial document setup to advanced academic theses and mathematical typesetting. It replaces dense static manuals with interactive, hands-on learning:

- **40 Curated Lessons** across 4 difficulty tiers:
  1. **LaTeX Fundamentals** (Level 1, Beginner): Document structure, sectioning, lists, tables, figures, basic citations.
  2. **Mathematics in LaTeX** (Level 2, Intermediate): Inline and display math, fractions, Greek letters, matrices, calculus, alignments.
  3. **Academic Writing** (Level 3, Intermediate): BibTeX bibliographies, cross-references, theorems, theses, Beamer presentations.
  4. **Advanced LaTeX** (Level 4, Advanced): Macros, custom environments, TikZ graphics, styling, project workflows.
- **Interactive Playground**: Monaco editor with syntax highlighting, live KaTeX preview, document structure mapping, copy snippet, and `.tex` file download.
- **Practice Drills & Exercises**: Multiple choice, fill-in-the-blank, repair broken code, and predict-the-output drills with real-time feedback.
- **LaTeX Reference & Cheat Sheet**: Categorized command library with live typeset outputs and one-click "Try in Playground".
- **Instant Search**: Search lessons, commands, and exercises across the entire curriculum.
- **Progress Tracking & Achievements**: Daily study streak, time invested, achievement badges, and bookmarking.
- **Flexible Storage**: Works 100% offline in Guest Mode (persistent local storage) with optional Supabase cloud authentication.

---

## Tech Stack

- **Framework**: React 19 + TypeScript 6 + Vite 8
- **Styling**: Tailwind CSS v4 + Radix UI primitives
- **Math Rendering**: KaTeX 0.18
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **State Management**: Zustand (with local persistence)
- **Routing**: React Router DOM v7
- **Charts & Visuals**: Recharts & Lucide Icons
- **Linting**: Oxlint

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The production build generates optimized, code-split chunks in `dist/`.

### Linting

```bash
npm run lint
```

---

## Supabase Setup (Optional)

The application functions completely without Supabase via browser LocalStorage. To enable cross-device cloud sync:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your Supabase project URL and anon key in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Run the schema migrations located in `supabase/schema.sql` in your Supabase SQL Editor.

---

## License

MIT
