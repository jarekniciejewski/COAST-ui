# COAST UI

Design system components for COAST, built with [shadcn/ui](https://ui.shadcn.com) and Tailwind CSS v4. They're coded from the Figma file **COAST**.

The design tokens and the code use the same names. A designer working in Figma and a developer working in code see identical values (`--primary`, `--ring`, `--success`, …).

## Contents

| File | What it is |
|---|---|
| `src/tokens.css` | Design tokens exported from Figma: the **Primitives** collection (raw palette, spacing, radius, type) and the **Theme** collection (shadcn roles such as `primary`, `border`, `ring`) |
| `src/components/ui/button.tsx` | The Button component |
| `docs/index.html` | Interactive preview of the Button: every variant, live states, and a Figma-to-code map. Open it in a browser. |

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

## Using it in a project

1. **Create a shadcn project** (skip this if you already have one):
   ```bash
   npx shadcn@latest init -t vite
   ```
2. **Add the tokens.** Copy `src/tokens.css` into your project's `src/` folder. In `src/index.css`, add this line right below `@import "tailwindcss";`:
   ```css
   @import "./tokens.css";
   ```
   Then remove these variables from the `:root` block in `index.css`, because `tokens.css` defines them now: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--accent`, `--border`, `--ring`, `--destructive`, `--radius`.
3. **Add the Button.** Install shadcn's button (this also installs `class-variance-authority`), then replace the generated file with the one from this repo:
   ```bash
   npx shadcn@latest add button
   ```
   Copy `src/components/ui/button.tsx` over `src/components/ui/button.tsx`.

## Notes

- **Theme:** only a light theme exists so far. The token names don't depend on the theme, so adding a dark mode later won't require changes to the components.
- **Opacity values:** Figma stores opacity as percentages (`50`) and CSS needs fractions (`0.5`). `tokens.css` already uses the CSS form.
- **`red-700` override:** `--color-red-700` is the brand red (`#DB0000`) and replaces Tailwind's default `red-700`.
- **Naming differs from stock shadcn:** this Button uses `variant` + `tone` instead of shadcn's `default` / `outline` / `ghost` variants. Other shadcn components that call `buttonVariants({ variant: "outline" })` or `"ghost"` (for example Alert Dialog, Calendar, Pagination) need to be changed to `secondary` / `tertiary` when you add them.
