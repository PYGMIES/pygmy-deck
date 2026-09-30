# pygmy-deck — context

## Purpose
A repo for building presentation decks as code: numbered slide files + reusable components → one portable HTML file per deck (no server, no npm). Follows the frontend-slides conventions (fixed 1920×1080 stage, keyboard/touch nav, inline edit mode).

## Decisions (2026-10-01)
- **Fonts:** League Spartan for display; Garet was requested for body but isn't on Google Fonts, so **Montserrat** substitutes. To switch to real Garet: add files to a deck's `assets/fonts/`, add an `@font-face` in that deck's `deck.css`, and set `--font-body: "Garet", …`.
- **Components:** HTML-comment include tags expanded at build time (`<!-- @name k="v" -->`, blocks closed with `<!-- @/name -->`). Stdlib only, no Jinja.
- **Themes:** light (default, from the reference slide) + dark.
- **Decks:** many decks under `decks/`; shared `components/` and `themes/` at root; decks can override a component by adding one with the same name in their own `components/`.
- Assets referenced as `assets/...` are inlined as base64 at build time; fonts load from Google Fonts (needs internet).

## Deck inventory
| Deck | Status | Notes |
|------|--------|-------|
| `decks/_template` | scaffold | copied by `build.py new` |
| `decks/sample` | demo | exercises all 16 components; slide 02 recreates the reference "Our Success Metrics" slide; figures are placeholders |

| `decks/mid-term-presentation` | skeleton | Project Cassandra midterm, 5 Oct 2026; owners + TODOs in its CONTEXT.md |

## Open items
- Real Garet font files (optional).
- PDF export: browser print works (print CSS emits one slide per page); a scripted export can be added later.
