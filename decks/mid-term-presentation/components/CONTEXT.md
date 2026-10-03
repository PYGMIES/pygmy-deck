# components/ (deck-local) — context

Bespoke diagrams, absolutely positioned on fixed canvases. Edit coordinates in the HTML (`left/top/width/height`) and the matching SVG `path d=` values together.

| Component | Canvas | What |
|-----------|--------|------|
| `c22-flow` | 1728×~500 | Five-step workflow: Discord challenge → ~500 traders → sim trades → The Judge (our focus) → real market. Slide 06. |
| `bar-ladder` | 588px tall | Four ascending bars (fade everything < coin flip < C22 current < our Judge). Heights illustrative; optional `caption`. Slide 09. |
| `equity-chart` | `takeaway`, `class?` | Inline-SVG cumulative P&L lines (fade everything, live rule, top 5%, random + 5–95% band) on white backing, plus takeaway. Data baked in by script; edit the SVG paths. Slide 10. |
| `scatter-chart` | `takeaway`, `class?` | Inline-SVG scatter: $/campaign for every top-5% variant in NB07–15 (locked 69–77), one dot each, hover shows the notebook title + variant + CI. Data baked in from `reverse-trade-judge/results/pnl_by_notebook.csv`; titles from `summarised.md` §3. Hover via `core/runtime.js` `[data-hover-scatter]`. Slide 38. |
| `arch-diagram` | 1728×800 | 4 layer lanes, nodes, accent-coloured data-flow wires. Slide 19. |
| `method-compare` | flow | Waterfall cascade lane vs Scrum 13-sprint lane (`is-done` / `is-now`), sponsor-feedback verdict per lane. Slide 49. |
| `sprint-cycle` | flow | 5 sprint steps with chevrons, SVG return arrow Retro → Plan (path x-coords assume 1656px width), leads/squads/tools row. Slide 50. |
| `retro-changes` | `kicker?`, `value`, `label`, `caption?` | Rows of noticed (pale) → changed (charcoal), plus accent outcome stat. Rows edited in the HTML. Slide 52. |
| `funnel` | ◻ block, rows in HTML | Stacked charcoal bars narrowing top to bottom (`.c-funnel__row` with `--w` width, bar number + label, right-hand "what we did"); `is-final` row gets the accent outline. Widths illustrative. `class="is-in-card"`: compact version inside a `panel-card` (`.c-funnel__label` version label + centred bar, optional `.c-funnel__caption` under a bar). Slide 47. |
| `shap-bars` | `caption?` | Two 100% stacked bars (full 26 vs final 18) of mean \|SHAP\| share by bucket, step arrow between, legend. Numbers from NB12 §4, edited in the HTML. Slide 49 (compacted there via `.is-outcome-shap`). |
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 51. |
| `flow-kit` | ◻ block, `width?`, `height?` | Canvas + shared diagram primitives (lanes, nodes incl. `fk-node--api` / `--work` role colours, wires, `fk-card` / `fk-card--dark` takeaway cards, `fk-callout--bad` / `--good`) for the design-decision diagrams below. Slides 37, 39. |
| `redis-why` / `local-stack` | — | Diagrams placed inside `flow-kit`. `redis-why` (slide 37): separate broker = 2 systems on every trade's path vs 1 in-memory Redis, plus two dark motivation cards (fewer distributed systems, less network latency). `local-stack` (slide 39): three reasons as dark cards on the left, Docker containers on Catch22's machine on the right. |
| `nfr-overview` | ◻ block | 2×2 grid of the four NFR cards opening each design-decision group (slides 25, 30, 36, 38). Holds the shared `.c-nfr-card` styles. Inactive cards get `class="is-dim"` (50%). |
| `nfr-concurrency` / `nfr-sequencing` / `nfr-latency` / `nfr-deployment` | `class?` | One NFR card (text + icon from slide 18; Deployment is new). `is-dim` = 50%, `is-corner` = 0.84× for the `dd-heading` corner. `data-morph="nfr-<name>"`, so it glides between grid and corner. |
| `dd-heading` | ◻ block, `kicker title`, `sub?`, `tag?`, `tone?` (good\|bad) | Design-decision heading: kicker, 86px title, sub-line, coloured tag; child = the group's NFR card with `class="is-corner"`, pinned top-right. Pieces keyed with `data-morph`, so identical headings stay put. |
| `flow-stage` | ◻ block | Full-stage (1920×1080) container for absolutely positioned flow pieces + shared arrowhead markers; `data-morph-scope`, so identical pieces on adjacent slides stay put. Slides 26–35. |
| `flow-heading` | `title`, `sub?`, `tag?`, `tone?` (good\|bad) | Non-animated title + sub-line + coloured tag. Currently unused (section 05 uses `dd-heading`). |
| `flow-node` | `x y w h label`, `sub?`, `tone?`, `size?` (30) | Rounded labelled box at stage coordinates; `class="is-round"` for a circle. Tones by role: dark (client, Judge) · api (FastAPI, amber) · work (workers, light + outline) · ext (external service, pale amber) · mid · good · bad. |
| `flow-queue` | `x y label`, `label-pos?` (above\|below), `a b c`, `ma mb mc` | 3-cell queue; tokens `a/b/c` are trade ids, coloured by id (12 blue, 11 amber, 10 grey). `ma/mb/mc` = morph keys (e.g. `close-11`) so a trade glides between cells and a `flow-token`. |
| `flow-token` | `n x y`, `morph?` | Loose trade token centred on (x, y); `morph` shares a key with a queue token. |
| `flow-arrow` | `x1 y1 x2 y2`, `tone?` (ink\|danger) | Straight arrow in stage px. |
| `flow-note` | `x y w text`, `tone?` (ink\|danger\|good), `size?` | Centred caption. |
| `flow-db` / `flow-x` | `x y` | Database cylinder (top-left) / red cross (centred). |

In the build slides give `class="reveal"` only to the piece(s) new on that step, so the flip looks like the piece popping in.

Layout components (flow, not fixed canvas):

| Component | Params | What |
|-----------|--------|------|
| `title-cover` | `title`, `image`, `presented`, `lead?`, `client?`, `alt?`, `course?`, `team?` | Cover: stacked title + "for <client>" left, illustration right (PNG multiplied onto the light canvas), course line bottom-left, "Presented by" + names bottom-right. Slide 01. |
| ◻ `team-roster` | — | Row of `team-group`s, vertically centred. Slide 02. |
| ◻ `team-group` | `label`, `size?` | Labelled cluster; `size` = member count so every card gets equal width. |
| `team-member` | `initial`, `role`, `name` | Card: initial in a ring, role + name at bottom. `class="is-light"` for pale. |
| ◻ `feature-group` | `count`, `title`, `note?`, `cols?` (1) | Charcoal card: big count, title, note, then `<li><strong>Plain name</strong><code>code_name</code></li>` children. `cols` = list columns; in a `card-grid` the card spans that many grid columns. Optional `<em>verdict</em>` in an li renders as a pill on the right; `foot?` adds a closing line under the list. Slides 49–51. |
| `ab-result` | `title`, `a-label`, `a-value`, `b-label`, `b-value`, `caption?`, `body?`, `foot?`, `span?` (1) | Pale panel: title, two result tiles (A value in `--danger`, B tile accent-tinted), caption, body, foot. `span` = card-grid columns. Slide 50. |
| ◻ `panel-card` | `title`, `count?`, `note?`, `span?` (1) | Charcoal card: optional big count, title, note, then free content. Styles plain `<table>` and `<p>` children; `class="is-ruled"` on a child adds a hairline above it. Slide 48. |
| ◻ `column-chart` | `max`, `label?` | CSS bar chart filling its container: children `<li style="--v: 21"><b>21</b><span>30 Jul</span></li>`, `class="is-focus"` highlights a bar. Bars grow in (reduced-motion safe). Slide 48. |
