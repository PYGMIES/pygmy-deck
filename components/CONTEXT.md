# components/ — catalogue

Every component accepts an optional `class` param (added to its root). ◻ = block (takes children, needs `<!-- @/name -->`).

## Layout
| Component | Params | Notes |
|-----------|--------|-------|
| `slide-title` | `text`, `kicker?` | Big top-left page title (104px); kicker = small section label above. |
| `section-heading` | `title`, `subtitle?` | Sub-heading + hairline + line of text ("Model Benchmarks"). |
| ◻ `column` | `width?` (auto), `gap?` | Vertical group; `width="792px"` + `class="inset"` reproduces the reference layout. |
| ◻ `split` | `cols?` ("1fr 1fr"), `align?` (start) | Grid; each child is a column. Fills remaining slide height. |
| ◻ `card-stack` | `gap?` (28px) | Vertical stack of cards. |
| ◻ `card-grid` | `cols?` (3) | Equal-width grid, usually of `grid-card`. |

## Content
| Component | Params | Notes |
|-----------|--------|-------|
| `label-card` | `title`, `body` | Charcoal card: heading left (breaks only at `<br>`), note right-aligned. Max ~3 per slide. |
| `grid-card` | `title`, `kicker?`, `body?` | Tall card for grids: kicker, heading, body pinned to bottom. |
| `big-stat` | `value`, `label`, `caption?` | 260px number over rule + label. Use 2–3 in a `split`. |
| ◻ `bullet-list` | — | Children are `<li>`; `<strong>` lead-in; add `class="reveal"` to stagger. ≤5 items. |
| `quote` | `text`, `by?` | Pull quote with heavy opening mark. Pair with a dark slide. |
| ◻ `compare-table` | — | Children are `<thead>`/`<tbody>`. Cell classes: `is-focus` (highlight column), `is-good` (↑), `is-bad` (muted). |
| `image-frame` | `src`, `alt?`, `caption?`, `fit?` (cover) | Rounded image filling its column; `src="assets/…"` is inlined. |

| ◻ `step-list` | — | Numbered vertical flow joined by a line; children are `<li>`, optional `<small>` = detail line. ≤6 steps. `class="is-compact"` = detail line per step, rows spaced to fill the column (use `split align="stretch"`); `<li class="is-group">` with a `c-step-list__band` + nested `<ol class="c-step-list__inner">` = framed group. Arrows: `<i class="c-step-list__arrow">` with `--arrow-from/-y/-len/-ang`. |
| `note-card` | `kicker?`, `title`, `body` | Pale side note (e.g. kicker "Step 1"). Block: children are optional `<li>` tags; `foot` = line under tags. `is-compact` = 98px one-liner, `is-tall` = 190px with a 2–3 line body, `is-dark is-bullets` = charcoal bullet card. Stack in a `column` beside a `step-list`. |
| `req-card` | `title`, `body`, `icon` | Charcoal card: left-aligned 44px title on top, then a 104px flat icon (inline `<svg viewBox='3 3 42 42'>`, stroke only, same size on every card) beside one 28px sentence. `flex: 1`, so put 3 in a `column` to share its height equally. |
| `numbered-card` | `num`, `title`, `body?` | Circled number + title + body. `class="is-light"` for a pale card. |
| `icon-card` | `icon`, `title`, `body` | `class="is-dim"` fades it. Title row, then mask-tinted icon (`assets/…svg`, drawn black) + body. |
| `chevron-callout` | `lead`, `quote` | Arrow-shaped lead feeding a big quoted question. |
| ◻ `quadrant` | `col-a`, `col-b`, `row-a`, `row-b`, `x-axis?`, `y-axis?` | 2×2 matrix; children are 4 `quadrant-cell`. |
| `quadrant-cell` | `title`, `body?`, `tag?` | Cell; `class="is-focus"` highlights in accent, `is-dim` fades it, `tag` adds a pill (e.g. DEMO SLOT). |
| `chart-card` | `title`, `src`, `takeaway`, `kicker?`, `alt?` | Kicker + title, chart PNG on `--chart-bg`, takeaway under an accent bar. Fixed 720px tall. |
| ◻ `screen-frame` | `label` | Browser-window chrome around children (img / placeholder). |
| ◻ `agenda` | — | Children are `agenda-item`. |
| `agenda-item` | `num`, `title`, `owner?`, `mins?` | Agenda row. |
| `placeholder` | `label`, `owner?`, `height?` | Amber "To do" dashed box for unfinished content. Grep `@placeholder`. |

## Full-slide
| Component | Params | Notes |
|-----------|--------|-------|
| `cover` | `title`, `kicker?`, `meta?`, `subtitle?` | Title slide: kicker/meta bar, huge stacked title, subtitle + charcoal block. |
| `section-divider` | `number`, `title`, `subtitle?`, `presenter?` | Full-bleed card-colour chapter break with outlined number + presenter chip. |
| `closing` | `title`, `subtitle?`, `contact?` | Big title + charcoal CTA bar. |
