# Design System: Personal Portfolio

Design tokens and visual rules for the portfolio. The site is a single narrow
reading column on a hatched page rail — one continuous scroll, no full-bleed
sections.

## 🎨 Visual Identity
- **Vibe**: Quiet, dense, document-like. Reads as a profile page, not a landing page.
- **Theme**: Dark by default (`defaultTheme="dark"`, system preference off), light available via the toggle in the top bar.
- **Aesthetic**: Hairline borders, small type, tight rows. No drifting blobs, no full-viewport hero. The one lighting effect is the cover spotlight, and it only appears under the cursor.

## 🌈 Color Tokens

Defined in [globals.css](src/app/globals.css), exposed to Tailwind in [tailwind.config.ts](tailwind.config.ts).

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--page` | `#f4f4f3` | `#09090b` | Outer rail behind the column |
| `--background` | `#ffffff` | `#0f0f11` | The reading column itself |
| `--surface` | `#fafafa` | `#161618` | Tag pills, logo tiles, inset fills |
| `--primary` | `#18181b` | `rgba(255,255,255,.93)` | Titles and emphasis |
| `--secondary` | `#71717a` | `rgba(255,255,255,.48)` | Body copy |
| `--muted` | `#a1a1aa` | `rgba(255,255,255,.32)` | Section labels, dates, meta |
| `--link` | `#2563eb` | `#7ea6ff` | Inline links in prose only |
| `--border` | `rgba(0,0,0,.09)` | `rgba(255,255,255,.09)` | Every divider and outline |
| `--rail` | `rgba(0,0,0,.035)` | `rgba(255,255,255,.028)` | Diagonal hatch on the rails |
| `--gh-0`…`--gh-4` | `#ebedf0`…`#216e39` | `#161b22`…`#39d353` | GitHub's contribution ramp, used only by the heatmap |

Three text weights carry the whole hierarchy: `primary` → `secondary` → `muted`.
There is no chromatic accent; `--link` is the only color in the page and it is
reserved for inline links inside prose.

## 🔠 Typography
- **Families**: `Fraunces` (display — name, tagline, logo tiles), `Outfit` (sans — everything else), `DM Mono` (labels).
- **Scale** — small on purpose, matched to the 660px column:
  - **Name**: `text-[26px]`, font-semibold, display
  - **Section label**: `text-[13px]`, `text-muted`
  - **Card / row title**: `text-[13px]`–`text-[13.5px]`, font-medium
  - **Body**: `text-[12px]`–`text-[13.5px]`, `leading-relaxed`
  - **Meta, dates, tags**: `text-[10px]`–`text-[11.5px]`, `text-muted`

## 📐 Layout & Spacing
- **Column**: `max-w-[660px]`, `border-x`, centered on the `rail-hatch` page.
- **Gutter**: `px-5` inside the column.
- **Section rhythm**: `pt-12` between sections, `mb-4` from label to content.
- **Radius**: `rounded-xl` (12px) on containers, `rounded-lg` (8px) on rows and buttons, `rounded-md` (6px) on tags.
- **Grids**: `sm:grid-cols-2` with `gap-3`. Never more than two columns.

## ✨ Motion & Interaction
- **No scroll-reveal.** Content is present on load; the page is meant to be scanned.
- **Hover system** — one idea applied consistently: *light follows the cursor, and the focused thing steps forward*. Composed from four classes:
  - `.peek-card` — cursor-tracked sheen (`--cx`/`--cy` written by [SheenGroup.tsx](src/components/profile/SheenGroup.tsx), rendered by an `::after` radial gradient using the `--sheen` token), plus a `-3px` lift and a deeper shadow. Used on Proof of Work and Currently Building.
  - `.peek-rows .peek-item` — a 2px accent bar scales in from the row's left edge, with a surface fill. Used on every list section.
  - `.hover-arrow` — `ArrowUpRight` affordances translate `(2px, -2px)`, leaning out of the card.
  - `.hover-lift` — pills and icon buttons rise `2px`.
- Project thumbnails still scale `1.03`. All four collapse to a 1ms transition and no transform under `prefers-reduced-motion`.
- **Peek hover** (the signature interaction): hovering anywhere in a collection dims every sibling so the focused item stands out. Put `.peek` on the container and `.peek-item` on each child; add `.peek-rows` for the harder dim. Cards fade to `0.55` over 300ms, list rows to `0.40` over 250ms. Built on `:has()` — no JS — and collapses to a 1ms transition under `prefers-reduced-motion`.
- **Accordion**: height + opacity over 220ms, `[0.16, 1, 0.3, 1]`.
- **Theme switch**: a circular `clipPath` wipe expands from the toggle button via the View Transitions API (480ms), while `.theme-switching` on `<html>` cross-fades colors for the same duration. Falls back to the cross-fade alone when the API is unavailable or `prefers-reduced-motion` is set. `disableTransitionOnChange` must stay **off** on `ThemeProvider` or it suppresses the fade.

## 📦 Component Library

Sections live in [src/components/profile/](src/components/profile/). Shared
primitives are in [Section.tsx](src/components/profile/Section.tsx):

- **`Section`** — labelled block with optional `intro` and right-aligned `action`.
- **`Tag`** — bordered pill for tech tags and `+N` overflow counters.
- **`PillLink`** — the site's one button shape; used for contact links.
- **Row list** — `rounded-xl border` container, children divided by `border-b … last:border-b-0`. Used by Experience, Hackathons, Certifications, Education, and Stack.
- **Card grid** — thumbnail, title with `ArrowUpRight`, one-line description, tag row. Used by Proof of Work and Currently Building.

## 🖼 Assets
- The hero cover is [CoverBanner.tsx](src/components/profile/CoverBanner.tsx): a charcoal gradient, a dot matrix, and a spotlight that follows the cursor. Pointer position is written to `--mx` / `--my` custom properties on the element rather than React state, so mousemove never triggers a re-render; the `.cover-grid` / `.cover-glow` rules in [globals.css](src/app/globals.css) do the rest. Dial the intensity with the dot alpha in `.cover-grid` and the white alpha in `.cover-glow`. Devices without hover get a soft resting light instead of a dead panel.
- Avatar is `public/portrait.png`, `objectPosition: center 22%`, and needs `relative z-10` to sit above the positioned cover.
