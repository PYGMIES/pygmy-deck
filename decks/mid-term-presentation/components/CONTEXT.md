# components/ (deck-local) — context

Bespoke diagrams, absolutely positioned on fixed canvases. Edit coordinates in the HTML (`left/top/width/height`) and the matching SVG `path d=` values together.

| Component | Canvas | What |
|-----------|--------|------|
| `c22-flow` | 1728×~500 | Five-step workflow: Discord challenge → ~500 traders → sim trades → The Judge (our focus) → real market. Slide 06. |
| `bar-ladder` | 588px tall | Four ascending bars (fade everything < coin flip < C22 current < our Judge). Heights illustrative; optional `caption`. Slide 09. |
| `equity-chart` | `takeaway`, `class?` | Inline-SVG cumulative P&L lines (fade everything, live rule, top 5%, random + 5–95% band) on white backing, plus takeaway. Data baked in by script; edit the SVG paths. Slide 10. |
| `scatter-chart` | `takeaway`, `class?` | Inline-SVG scatter: $/campaign for every top-5% variant in NB07–15 (locked 69–77), one dot each, hover shows the notebook title + variant + CI. Data baked in from `reverse-trade-judge/results/pnl_by_notebook.csv`; titles from `summarised.md` §3. Hover via `core/runtime.js` `[data-hover-scatter]`. Slide 38. |
| `arch-diagram` | 1728×800 | 4 layer lanes, nodes, accent-coloured data-flow wires. Slide 19. |
<<<<<<< Updated upstream
| `method-compare` | flow | Waterfall cascade lane vs Scrum 13-sprint lane (`is-done` / `is-now`), sponsor-feedback verdict per lane. Slide 49. |
| `sprint-cycle` | flow | 5 sprint steps with chevrons, SVG return arrow Retro → Plan (path x-coords assume 1656px width), leads/squads/tools row. Slide 50. |
| `retro-changes` | `kicker?`, `value`, `label`, `caption?` | Rows of noticed (pale) → changed (charcoal), plus accent outcome stat. Rows edited in the HTML. Slide 52. |
| `funnel` | ◻ block, rows in HTML | Stacked charcoal bars narrowing top to bottom (`.c-funnel__row` with `--w` width, bar number + label, right-hand "what we did"); `is-final` row gets the accent outline. Widths illustrative. Slide 40. |
| `shap-bars` | `caption?` | Two 100% stacked bars (full 26 vs final 18) of mean \|SHAP\| share by bucket, step arrow between, legend. Numbers from NB12 §4, edited in the HTML. Slide 45. |
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 51. |
| `flow-kit` | ◻ block, `width?` | Canvas + shared diagram primitives (lanes, nodes, wires) for the design-decision diagrams below. Slides 37–40. |
| `redis-roles` / `cache-check` / `sse-flow` / `local-stack` | — | Diagrams placed inside `flow-kit`: One Redis (streams/hashes/pub-sub); cache-vs-Postgres check; SSE vs WebSocket; Docker stack + 3 reasons. Copied from branch `claude/final-year-presentation-i03j97`. |
| `flow-stage` | ◻ block | Full-stage (1920×1080) container for absolutely positioned flow pieces + shared arrowhead markers. Wrap the pieces below in it. Slides 24–36. |
| `flow-heading` | `title`, `sub?`, `tag?`, `tone?` (good\|bad) | Non-animated title + sub-line + coloured tag ("Asynchronous", "Problem", "Solution"). |
| `flow-node` | `x y w h label`, `sub?`, `tone?` (dark\|mid\|good\|bad), `size?` | Rounded labelled box at stage coordinates. |
| `flow-queue` | `x y label`, `label-pos?` (above\|below), `a b c` | 3-cell queue; tokens `a/b/c` are trade ids, coloured by id (12 blue, 11 amber, 10 grey). |
| `flow-token` | `n x y` | Loose trade token centred on (x, y). |
| `flow-arrow` | `x1 y1 x2 y2`, `tone?` (ink\|danger) | Straight arrow in stage px. |
| `flow-note` | `x y w text`, `tone?` (ink\|danger\|good), `size?` | Centred caption. |
| `flow-db` / `flow-x` | `x y` | Database cylinder (top-left) / red cross (centred). |

In the build slides give `class="reveal"` only to the piece(s) new on that step, so the flip looks like the piece popping in.
=======
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 36. |
>>>>>>> Stashed changes

Layout components (flow, not fixed canvas):

| Component | Params | What |
|-----------|--------|------|
| `title-cover` | `title`, `image`, `presented`, `lead?`, `client?`, `alt?`, `course?`, `team?` | Cover: stacked title + "for <client>" left, illustration right (PNG multiplied onto the light canvas), course line bottom-left, "Presented by" + names bottom-right. Slide 01. |
| ◻ `team-roster` | — | Row of `team-group`s, vertically centred. Slide 02. |
| ◻ `team-group` | `label`, `size?` | Labelled cluster; `size` = member count so every card gets equal width. |
| `team-member` | `initial`, `role`, `name` | Card: initial in a ring, role + name at bottom. `class="is-light"` for pale. |
| ◻ `feature-group` | `count`, `title`, `note?`, `cols?` (1) | Charcoal card: big count, title, note, then `<li><strong>Plain name</strong><code>code_name</code></li>` children. `cols` = list columns; in a `card-grid` the card spans that many grid columns. Optional `<em>verdict</em>` in an li renders as a pill on the right; `foot?` adds a closing line under the list. Slides 28–30. |
| `ab-result` | `title`, `a-label`, `a-value`, `b-label`, `b-value`, `caption?`, `body?`, `foot?`, `span?` (1) | Pale panel: title, two result tiles (A value in `--danger`, B tile accent-tinted), caption, body, foot. `span` = card-grid columns. Slide 29. |
| ◻ `panel-card` | `title`, `count?`, `note?`, `span?` (1) | Charcoal card: optional big count, title, note, then free content. Styles plain `<table>` and `<p>` children; `class="is-ruled"` on a child adds a hairline above it. Slide 27. |
| ◻ `column-chart` | `max`, `label?` | CSS bar chart filling its container: children `<li style="--v: 21"><b>21</b><span>30 Jul</span></li>`, `class="is-focus"` highlights a bar. Bars grow in (reduced-motion safe). Slide 27. |
