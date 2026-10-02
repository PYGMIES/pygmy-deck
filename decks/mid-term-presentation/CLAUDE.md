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

## Keep slide 18 and the NFR cards in section 05 in sync
Slide 18 (`slides/18-nfrs.html`, `req-card`) is the source of truth for the non-functional requirements. Section 05 (Key Design Decisions, slides 24–39) repeats three of them as `nfr-*` cards: in the NFR overview slides (25, 30, 36, 38) and top-right on every content slide (`dd-heading`). **Whenever you change anything about slide 18's cards, make the same change to these in the same task:**

| Slide 18 (`req-card`) | Section 05 counterpart |
|---|---|
| "Concurrency & throughput": title, sentence, icon | `components/nfr-concurrency/nfr-concurrency.html` |
| "Sequencing": title, sentence, icon | `components/nfr-sequencing/nfr-sequencing.html` |
| "Processing latency": title, sentence, icon | `components/nfr-latency/nfr-latency.html` |
| Card design: colours, radius, padding, font sizes, icon size/stroke (`components/req-card/req-card.css`) | `.c-nfr-card` in `components/nfr-overview/nfr-overview.css` |

- The `nfr-deployment` card is not on slide 18 but must keep the same design as the other three.
- If an NFR is renamed, removed or added, also update the overview slides (25, 30, 36, 38), the speaker notes that name it, and the section-05 outline in `CONTEXT.md`. Don't change the `data-morph="nfr-<name>"` keys: match-and-move between the overview and the corner card depends on them.
- The reverse holds too: if you change an `nfr-*` card's wording, ask whether slide 18 should change as well.
- Rebuild and check slides 18 and 24–39.
