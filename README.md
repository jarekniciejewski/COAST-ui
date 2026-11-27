# COAST UI

Design system components for COAST, built with [shadcn/ui](https://ui.shadcn.com), React and Tailwind CSS v4. They're coded from the Figma file **COAST**.

**Live demo:** https://jarekniciejewski.github.io/COAST-ui/

The design tokens and the code use the same names. A designer working in Figma and a developer working in code see identical values (`--primary`, `--ring`, `--success`, …).

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/jarekniciejewski/COAST-ui.git
cd COAST-ui
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). Edits to the code show up in the browser right away.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local showcase page with live reload |
| `npm run build` | Checks the types and builds the site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally |

## What's where

| Path | What it is |
|---|---|
| `src/tokens.css` | Design tokens exported from Figma: the **Primitives** collection (raw palette, spacing, radius, type) and the **Theme** collection (shadcn roles such as `primary`, `border`, `ring`) |
| `src/index.css` | Imports Tailwind and the tokens, and adds the shadcn roles that aren't in Figma yet |
| `src/components/ui/button.tsx` | The Button component |
| `src/App.tsx` | The showcase page you see at the live demo |
| `components.json` | shadcn/ui settings, so `npx shadcn@latest add …` puts new components in the right place |
| `.github/workflows/deploy.yml` | Builds the project on every push to `main` and publishes it to GitHub Pages |

## Components

### Button

```tsx
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

<Button>Add to cart</Button>
<Button variant="secondary" tone="warning" size="lg">Check stock</Button>
<Button variant="tertiary" tone="destructive" leftIcon={<Plus />}>Remove</Button>
```

| Prop | Values | Default | Figma property |
|---|---|---|---|
| `variant` | `primary` · `secondary` · `tertiary` | `primary` | `style` |
| `tone` | `default` · `success` · `warning` · `destructive` | `default` | `style` suffix (`_success`, `_warning`, `_error` / `_destructive`) |
| `size` | `sm` (32px) · `lg` (40px) | `sm` | `size` |
| `disabled` | boolean | `false` | `state=disable` |
| `leftIcon` / `rightIcon` | any 16px icon | none | `Left Icon` / `Right Icon` |

The browser handles the hover, pressed and focus states (`state=hover`, `active` and `focus` in Figma) on its own.

## Using the components in another project

1. Set up shadcn/ui there (`npx shadcn@latest init -t vite` for a new Vite project).
2. Copy `src/tokens.css` into its `src/` folder and add `@import "./tokens.css";` right below `@import "tailwindcss";` in its `index.css`. Then remove from its `:root` block the variables `tokens.css` now defines: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--accent`, `--border`, `--ring`, `--destructive`, `--radius`.
3. Run `npx shadcn@latest add button`, then replace the generated `src/components/ui/button.tsx` with the one from this repo.

## Notes

- **Theme:** only a light theme exists so far. The token names don't depend on the theme, so adding a dark mode later won't require changes to the components.
- **Opacity values:** Figma stores opacity as percentages (`50`) and CSS needs fractions (`0.5`). `tokens.css` already uses the CSS form.
- **`red-700` override:** `--color-red-700` is the brand red (`#DB0000`) and replaces Tailwind's default `red-700`.
- **Naming differs from stock shadcn:** this Button uses `variant` + `tone` instead of shadcn's `default` / `outline` / `ghost` variants. Other shadcn components that call `buttonVariants({ variant: "outline" })` or `"ghost"` (for example Alert Dialog, Calendar, Pagination) need to be changed to `secondary` / `tertiary` when you add them.
