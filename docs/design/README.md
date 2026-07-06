# Portfolio — Design System (v0.1)

A vanilla HTML/CSS/JS exploration of the visual language **before** committing to a
framework. No build step — open the files directly in a browser.

## Pages
- **`index.html`** — the portfolio itself, applying the system end-to-end.
- **`design-system.html`** — the living reference: principles, tokens, type, color, spacing, borders, components.

## Structure
```
docs/design/
├─ index.html            # portfolio mockup
├─ design-system.html    # design-system reference
├─ css/
│  ├─ tokens.css         # ← single source of truth (color, type, space, radius, motion)
│  ├─ base.css           # reset + element defaults + layout primitives
│  ├─ portfolio.css      # portfolio page styles
│  └─ docs.css           # design-system page styles
└─ js/
   └─ main.js            # theme toggle, sticky-header hairline, scroll reveal
```

## Design commitments
1. **Space groups** related elements — not boxes.
2. **Borders are intentional** — prefer a side line over a full enclosure; never a lazy emphasis box.
3. **One identity color** (indigo `--identity`), used sparingly.
4. **One typeface** (Inter) — hierarchy from size/weight/space.
5. **The projects section is the flair**; everything else stays composed so it never competes.

## Theming
Light is the default (white background). Dark mode:
- respects OS preference automatically,
- is overridable via the toggle (persisted in `localStorage`),
- driven entirely by re-declaring tokens under `:root[data-theme="dark"]`.

## Iterating
Tune the look by editing **`css/tokens.css`** — both pages consume the same tokens,
so a change ripples everywhere. Try swapping `--identity`, adjusting the type scale,
or changing `--section-gap` to feel the spacing rhythm shift.

## To run
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server -d docs/design 8000   # → http://localhost:8000
```

## Placeholder content
Copy, project names (GetHired, Lakad), experience, and social links are placeholders —
swap them for real content. The email is already set to `joseph.dev.ph@gmail.com`.
