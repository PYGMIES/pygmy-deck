# themes/ — context

## Fonts
- `--font-display`: League Spartan (700 default, 800 for big numbers). Tight tracking `--display-tracking: -0.035em`, leading `--display-leading: 0.88`.
- `--font-body`: Montserrat 500 as a Garet substitute; `--body-tracking: 0.02em` gives Garet's airy feel.
- `--font-mono`: JetBrains Mono for code names, falling back to system monospace. Not in the default fonts URL; decks that use it add it via `fonts_url` (see `mid-term-presentation`).
- Loaded via the Google Fonts URL in `build.py` (`DEFAULT_FONTS_URL`); a deck can override with `"fonts_url"` in `deck.json`.

## Type scale (px @1920)
hero 180 · mega 260 · title 104 · h2 64 · card 76 · h3 44 · lead 38 · body 32 · small 24

## Colour tokens
| Token | Light | Dark | Used for |
|-------|-------|------|----------|
| `--bg` | #f2f2f2 | #1d1e20 | slide canvas |
| `--bg-deep` | #e7e7e5 | #26272a | image placeholders, subtle panels |
| `--ink` | #1b1b1b | #f2f2f2 | headings, body |
| `--ink-accent` | #2b1d14 | #e9ddd2 | sub-headings |
| `--ink-muted` | #5c5c5c | #a3a3a3 | captions, meta |
| `--rule` | #cfcfcf | #3d3e42 | hairlines |
| `--card` | #2a2b2d | #ececea | card surface |
| `--on-card` / `--on-card-muted` | #f4f4f4 / #c9c9c9 | #1b1b1b / #4a4a4a | text on cards |
| `--chrome` | #9a9a9a | #6a6a6a | progress + counter |
| `--letterbox` | #dcdcdc | #0e0e0f | area outside the stage |
| `--accent` / `--accent-soft` | #d9922e / #f1dfc4 | #e8a948 / #4a3a22 | "now" markers, highlighted flows — use sparingly |
| `--danger` / `--danger-bg` | #b3302b / #f8e1df | #e2675f / #3c2322 | limits, losses |

Source: the reference "Our Success Metrics" slide (light theme).
