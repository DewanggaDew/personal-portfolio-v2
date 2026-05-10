# Personal Portfolio v2

A poker / hand-of-cards themed personal portfolio originally exported from
**Figma Make** and refactored into a standalone Vite + React 18 + Tailwind v4
project.

## Stack

- **Vite 6** + **React 18** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **`motion`** (the new package, formerly Framer Motion) for animation
- **Lenis** for smooth wheel/touch scrolling
- **lucide-react** for icons
- **ESLint 9** flat config

## Scripts

```bash
pnpm install
pnpm dev          # Vite dev server on :5173
pnpm typecheck    # tsc -b --noEmit
pnpm lint         # eslint . --max-warnings 0
pnpm build        # tsc -b && vite build
pnpm preview      # serve the production build
```

## Project layout

```text
src/
├── main.tsx                    # Vite entry — mounts <App />
├── styles/                     # CSS entry + fonts + Tailwind + surface tokens
├── imports/                    # Card-face images (4 JPEGs)
└── app/
    ├── App.tsx                 # Root component, surface-token injection
    ├── content.ts              # All copy / links / projects / chip URLs
    └── components/
        ├── Hero.tsx
        ├── CardDeck.tsx        # stack → fan → dock state machine
        ├── Card.tsx            # Single, draggable card primitive
        ├── BackgroundSwitcher.tsx
        ├── Sections.tsx        # About / Experience / Projects / Contact
        ├── SmoothScroll.tsx    # Lenis instance on window.__lenis
        └── figma/ImageWithFallback.tsx
```

## Editing content

All copy, links, projects, experience rows, the hero name, the footer text,
and the inline rebus chip URLs live in **`src/app/content.ts`** — that's the
only file you need to touch to update the portfolio. JSX in
`src/app/components/` is purely presentational.

## Theming

The portfolio's color palette is **surface-driven**. `<App />` picks one of
five surfaces (`charcoal | felt | leather | ink | bone`, defined in
`BackgroundSwitcher.tsx`) and writes the active values onto three CSS custom
properties:

| Var               | Used for                              |
| ----------------- | ------------------------------------- |
| `--surface-text`  | Primary foreground (headings, copy)   |
| `--surface-muted` | Eyebrow text, icons, dock helper text |
| `--surface-rule`  | 1px hairline borders / dividers       |

Defaults are set in `src/styles/theme.css` so first paint isn't flashy.

## Adding a new section

1. Add an entry to `cards` in `src/app/content.ts` with a new `SectionId`.
2. Add the corresponding data shape (e.g. another `Project[]`).
3. Render a new section in `Sections.tsx` and a `<section id="...">` slot in
   `App.tsx`.
