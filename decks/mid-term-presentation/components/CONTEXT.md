# components/ (deck-local) — context

Bespoke diagrams, absolutely positioned on fixed canvases. Edit coordinates in the HTML (`left/top/width/height`) and the matching SVG `path d=` values together.

| Component | Canvas | What |
|-----------|--------|------|
| `c22-flow` | 1728×~500 | Five-step workflow: Discord challenge → ~500 traders → sim trades → The Judge (our focus) → real market. Slide 06. |
| `bar-ladder` | 588px tall | Four ascending bars (fade everything < coin flip < C22 current < our Judge). Heights illustrative; optional `caption`. Slide 09. |
| `equity-chart` | `takeaway`, `class?` | Inline-SVG cumulative P&L lines (fade everything, live rule, top 5%, random + 5–95% band) on white backing, plus takeaway. Data baked in by script; edit the SVG paths. Slide 10. |
| `arch-diagram` | 1728×800 | 4 layer lanes, nodes, accent-coloured data-flow wires. Slide 19. |
| `method-compare` | flow | Waterfall cascade lane vs Scrum 13-sprint lane (`is-done` / `is-now`), sponsor-feedback verdict per lane. Slide 32. |
| `sprint-cycle` | flow | 5 sprint steps with chevrons, SVG return arrow Retro → Plan (path x-coords assume 1656px width), leads/squads/tools row. Slide 33. |
| `retro-changes` | `kicker`, `value`, `label`, `caption?` | Rows of noticed (pale) → changed (charcoal), plus accent outcome stat. Rows edited in the HTML. Slide 35. |
| `funnel` | ◻ block, rows in HTML | Stacked charcoal bars narrowing top to bottom (`.c-funnel__row` with `--w` width, bar number + label, right-hand "what we did"); `is-final` row gets the accent outline. Widths illustrative. Slide 27. |
| `shap-bars` | `caption?` | Two 100% stacked bars (full 26 vs final 18) of mean \|SHAP\| share by bucket, step arrow between, legend. Numbers from NB12 §4, edited in the HTML. Slide 32. |
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 34. |

Layout components (flow, not fixed canvas):

| Component | Params | What |
|-----------|--------|------|
| `title-cover` | `title`, `image`, `presented`, `lead?`, `client?`, `alt?`, `course?`, `team?` | Cover: stacked title + "for <client>" left, illustration right (PNG multiplied onto the light canvas), course line bottom-left, "Presented by" + names bottom-right. Slide 01. |
| ◻ `team-roster` | — | Row of `team-group`s, vertically centred. Slide 02. |
| ◻ `team-group` | `label`, `size?` | Labelled cluster; `size` = member count so every card gets equal width. |
| `team-member` | `initial`, `role`, `name` | Card: initial in a ring, role + name at bottom. `class="is-light"` for pale. |
