# pygmy-deck — Claude instructions

HTML slide decks built from folders of numbered slide files and reusable components.
`build.py` (Python stdlib only) compiles each deck into **one self-contained HTML file** in its own folder: `decks/<deck>/<deck>.html` (committed).

## Commands
```bash
python3 build.py                  # build every deck
python3 build.py <deck>           # build decks/<deck> → decks/<deck>/<deck>.html
python3 build.py <deck> --watch   # rebuild on save
python3 build.py new <deck>       # scaffold from decks/_template
open decks/<deck>/<deck>.html
```
Always rebuild and look at the result after changing slides, components or themes.

## Layout
| Path | What | Read its CLAUDE.md before editing |
|------|------|------|
| `core/` | 1920×1080 stage CSS + navigation/edit runtime | yes |
| `themes/` | tokens (fonts, type scale, spacing) + light/dark colours | yes |
| `components/` | shared reusable components (`name/name.html` + `name.css`) | yes |
| `decks/<deck>/` | one deck: `deck.json`, `slides/`, `assets/`, `components/` | yes |
| `decks/<deck>/<deck>.html` | build output — never edit by hand; committed so the deck ships with its source | — |

## Non-negotiable rules
1. **Fixed 16:9 stage.** Every slide is authored at 1920×1080 and scaled as a whole. No responsive breakpoints, no reflow for phones, no `vw/vh` inside slides. Use px at design size.
2. **Slide switching uses `.active` + visibility/opacity** (in `core/stage.css`). Never `display: none` to hide slides.
3. **Nothing overflows.** No scrolling, no clipped text, no overlapping panels. Too much content → split into another slide.
4. **Never hard-code colours or fonts** in slides/components — use theme variables (`--bg`, `--ink`, `--card`, `--font-display`, …). New colour needed? Add a token to *both* themes.
5. **Reuse components before writing raw HTML.** If a pattern appears twice, promote it to a component.
6. **Include `prefers-reduced-motion`** behaviour for any new animation.
7. Keep `CONTEXT.md` files current when you add/rename slides or components.

## Design language
- Display: **League Spartan** 700, tight tracking (-0.035em), leading ~0.88, stacked multi-line titles via `<br>`.
- Body: **Montserrat** 500 standing in for Garet (`--font-body` in `themes/tokens.css`).
- Light theme (default): soft grey `#F2F2F2` canvas, near-black ink, warm near-black sub-headings, charcoal `#2A2B2D` rounded cards with light text.
- Dark theme: inverted. Set per deck (`deck.json` → `"theme"`), per slide (`<section class="slide" data-theme="dark">`) or per block (`data-theme` on any element).
- Rounded 22px radius, hairline rules, generous negative space; content indents under the slide title (`class="inset"`).

## Workflow for a new deck
1. `python3 build.py new <deck>` → fill `decks/<deck>/CONTEXT.md` (purpose, audience, density, outline).
2. Write slides `slides/NN-name.html` using component tags (see `components/CONTEXT.md`).
3. Build, open, screenshot at 1280×720 and a phone viewport; fix overflow before moving on.
