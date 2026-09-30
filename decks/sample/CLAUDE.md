# Deck — Claude instructions

Read `CONTEXT.md` first: it holds the purpose, audience, density mode and outline for this deck.

- `deck.json` — `title`, `theme` (`light`|`dark`), optional `lang`, `fonts_url`.
- `slides/` — one file per slide, `NN-kebab-name.html`, ordered by NN.
- `assets/` — images/logos referenced as `assets/<file>`; inlined at build time.
- `components/` — deck-only components or overrides of shared ones (same name wins).
- `deck.css` (optional) — deck-level CSS overrides, appended last.

Build: `python3 build.py <deck>` → `dist/<deck>.html`. After every change, rebuild and check the slides you touched for overflow.
Density: follow the mode in `CONTEXT.md`. Speaker-led = one idea per slide, ≤3 bullets. Reading-first = up to 6 items, but split before it gets cramped.
