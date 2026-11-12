# Deck — Claude instructions

Read `CONTEXT.md` first: it holds the purpose, audience, density mode and outline for this deck.

- `deck.json` — `title`, `theme` (`light`|`dark`), optional `lang`, `fonts_url`.
- `slides/` — one file per slide, `NN-kebab-name.html`, ordered by NN.
- `assets/` — images/logos referenced as `assets/<file>`; inlined at build time.
- `components/` — deck-only components or overrides of shared ones (same name wins).
- `<deck>.html` — build output, committed. Never edit by hand; rebuild instead.
- `deck.css` (optional) — deck-level CSS overrides, appended last.

Build: `python3 build.py <deck>` → `decks/<deck>/<deck>.html` (committed; never edit by hand). After every change, rebuild and check the slides you touched for overflow.
Density: follow the mode in `CONTEXT.md`. Speaker-led = one idea per slide, ≤3 bullets. Reading-first = up to 6 items, but split before it gets cramped.

## Minimum text size
Nothing in this deck renders below **26px** (13pt at the 1920×1080 stage). `deck.css` sets `--fs-min: 26px` and `--fs-small: 26px`.
- A hard-coded small size in a component is written `font-size: max(22px, var(--fs-min, 0px))`: the deck floor wins, and a deck that doesn't set `--fs-min` keeps the old size.
- Shared components used here get their floor from the "Minimum text size" block at the end of `deck.css`.
- Text inside an SVG (e.g. `equity-chart`) is scaled with the drawing, so divide the floor by that scale.
- Exception: slide 57 (the latency diagram, `arch-diagram` with `is-timed`) keeps its original small text: the class sets `--fs-min: 0px`.
- After adding text, check nothing is under the floor and that it still fits: the 26px floor already forced re-spacing of slides 13 (was 12), 17, 41, 44, 53.
