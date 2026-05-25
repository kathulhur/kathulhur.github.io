# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

No build step. Open either HTML file directly in a browser, or serve the `design reference/` directory with any static server:

```sh
cd "design reference"
python3 -m http.server 8080
# then open http://localhost:8080/Portfolio.html
```

There are two entry points:
- **`Portfolio.html`** — the actual portfolio prototype (terminal hero + editorial body)
- **`Portfolio Directions.html`** — a Figma-style canvas displaying five portfolio direction mockups side-by-side

## Architecture

React 18 and Babel are loaded via CDN (unpkg). JSX files are loaded as `<script type="text/babel" src="...">` — there is no bundler, no npm, no local dependencies. All components are exported as globals on `window`.

### File roles

| File | Purpose | Exports (on `window`) |
|---|---|---|
| `design-canvas.jsx` | Figma-style pan/zoom canvas with artboards, drag-reorder, inline rename, fullscreen focus overlay, PNG/HTML export | `DesignCanvas`, `DCSection`, `DCArtboard`, `DCPostIt` |
| `tweaks-panel.jsx` | Floating live-edit panel with form controls and `useTweaks` hook | `useTweaks`, `TweaksPanel`, `TweakSection`, `TweakRow`, `TweakSlider`, `TweakToggle`, `TweakRadio`, `TweakSelect`, `TweakText`, `TweakNumber`, `TweakColor`, `TweakButton` |
| `terminal-hero.jsx` | Full-viewport dark terminal section with an auto-typed intro sequence | `TerminalHero` |
| `editorial.jsx` | Magazine-style portfolio body (Header, SelectedWork, Writing, CV, Contact, Footer) | consumed by `app.jsx` |
| `mockups.jsx` | Five static mockup components used by `Portfolio Directions.html` | `TerminalMock`, `EditorialMock`, `DashMock`, `SpatialMock`, `NotebookMock` |
| `app.jsx` | Root component for `Portfolio.html`; wires palette/type-pair tweaks and scroll-driven terminal fade | renders to `#root` |

### Theming (app.jsx)

`PALETTES` — four named themes: `cream`, `mono`, `warm`, `forest`.  
`TYPE_PAIRS` — two type pairings: `garamond` (EB Garamond × Inter) and `fraunces` (Fraunces × IBM Plex Sans).

The active palette and type pair are threaded as props through `EditorialBody` → all editorial sub-components. All editorial styles are built inline via `makeEditorialStyles(palette, typePair)`.

### EDITMODE block

In `app.jsx`, `TWEAK_DEFAULTS` is wrapped in `/*EDITMODE-BEGIN*/` … `/*EDITMODE-END*/`. When running inside the "omelette" host, the host rewrites this block on disk when tweaks change (via `window.parent.postMessage({ type: '__edit_mode_set_keys', ... })`). Do not alter the comment markers.

### Design canvas state

`design-canvas.jsx` persists artboard order, titles, labels, and hidden state to a `.design-canvas.state.json` sidecar via `window.omelette?.writeFile()`. Viewport pan/zoom is persisted to `localStorage` keyed by `dc-viewport:<pathname>`. Focus state is ephemeral.

### Host bridge (`omelette`)

The canvas communicates with a host iframe via `window.parent.postMessage`:
- `__dc_present` / `__dc_zoom` — canvas announces itself and its zoom level to the host toolbar
- `__dc_set_zoom` / `__dc_probe` — host drives zoom and probes for canvas presence
- `__edit_mode_available` / `__activate_edit_mode` / `__deactivate_edit_mode` / `__edit_mode_dismissed` / `__edit_mode_set_keys` — TweaksPanel protocol

These messages are no-ops when the page is opened standalone (not in the omelette host).

### Scroll-driven terminal fade

In `app.jsx`, a scroll listener sets `--term-opacity` on `documentElement`. `TerminalHero` reads this via `opacity: var(--term-opacity, 1)`. The fade maps `scrollY / (viewportH × 0.9)` → opacity range 1 → 0.08.
