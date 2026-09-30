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

| `numbered-card` | `num`, `title`, `body?` | Circled number + title + body. `class="is-light"` for a pale card. |
| `icon-card` | `icon`, `title`, `body` | Title row, then mask-tinted icon (`assets/…svg`, drawn black) + body. |
| `chevron-callout` | `lead`, `quote` | Arrow-shaped lead feeding a big quoted question. |
| ◻ `quadrant` | `col-a`, `col-b`, `row-a`, `row-b`, `x-axis?`, `y-axis?` | 2×2 matrix; children are 4 `quadrant-cell`. |
| `quadrant-cell` | `title`, `body?` | Cell; `class="is-focus"` highlights in accent. |
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
