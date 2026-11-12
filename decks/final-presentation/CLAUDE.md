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
Nothing in this deck renders below **30px** (15pt at the 1920×1080 stage) so it reads from the back of a large room. `deck.css` sets `--fs-min: 30px`, `--fs-small: 30px`, `--fs-body: 36px` and `--fs-lead: 40px`.
- A hard-coded small size in a component is written `font-size: max(22px, var(--fs-min, 0px))`: the deck floor wins, and a deck that doesn't set `--fs-min` keeps the old size. This includes the `size` param of `flow-note` / `flow-node`.
- Shared components used here get their floor from the "Minimum text size" block in `deck.css`. Fixed px `line-height`s in those components were set for smaller text; override them (e.g. `line-height: 1.22`) or wrapped lines overlap.
- Text inside an SVG (e.g. `equity-chart`) is scaled with the drawing, so divide the floor by that scale.
- Exception: slide 92 (the latency diagram, `arch-diagram` with `is-timed`) keeps its original small text: the class sets `--fs-min: 0px`.
- After adding text, check nothing is under the floor and that it still fits. The 30px floor forced re-spacing of slides 03, 06, 12, 13, 18, 25-48 (promotion diagrams), 50, 55-56, 58-62, 64, 66, 69, 90, 94-97, 108 (see "30px TEXT FLOOR RE-SPACING", "Bottom-margin fixes" and the blocks after them in `deck.css`).
- Slides 95-97 use hand-measured step-list `--line-end` and arrow `--arrow-len`/`--arrow-ang` values: re-measure them if the text or spacing there changes.
