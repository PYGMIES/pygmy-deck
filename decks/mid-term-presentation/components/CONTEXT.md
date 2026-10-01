# components/ (deck-local) — context

Bespoke diagrams, absolutely positioned on fixed canvases. Edit coordinates in the HTML (`left/top/width/height`) and the matching SVG `path d=` values together.

| Component | Canvas | What |
|-----------|--------|------|
| `c22-flow` | 1728×760 | Clients (-4% limit) → C22 platform (Markov judge / rules) → FADE / PASS, plus "why fading pays off" note. Slide 06. |
| `bar-ladder` | 588px tall | Four ascending bars (fade everything < coin flip < C22 current < our Judge). Heights illustrative; optional `caption`. Slide 09. |
| `equity-chart` | `takeaway`, `class?` | Inline-SVG cumulative P&L lines (fade everything, live rule, top 5%, random + 5–95% band) on white backing, plus takeaway. Data baked in by script; edit the SVG paths. Slide 10. |
| `arch-diagram` | 1728×800 | 4 layer lanes, nodes, accent-coloured data-flow wires. Slide 19. |
| `flow-kit` ◻ | `width?` (1728px), `height?` (720px) | Fixed canvas + shared diagram primitives (`fk-lane`, `fk-group`, `fk-node` + `--dark/--pill/--outline/--accent/--bad/--dim/--struck`, `fk-bar`, `fk-band`, `fk-wires`, `fk-label`, `fk-callout`, `fk-card`, `fk-note`). Wrap each diagram below in it. Slides 38–45. |
| `async-compare` | 1728×720 | Serial "one at a time" staircase vs API → Redis queue → parallel workers. Slide 38. |
| `race-timeline` | 1728×720 | Worker 1 (open) vs Worker 2 (close) vs Postgres row on a time axis, race window band, old FAILED outcome. Slide 39. |
| `close-flow` | 1728×720 | Close flowchart: open processed? → P&L / waited > 5 min? → requeue or FAILED, plus two takeaway cards. Slide 40. |
| `redis-roles` | 520×720 | One Redis box: trade queues (highlighted), feature cache, live events. Slide 41, beside a `compare-table`. |
| `cache-check` | 1728×720 | Trade opens → Redis vs Postgres trade count → match? → ask the Judge / rebuild the hash from Postgres. Slide 42. |
| `sse-flow` | 1728×720 | Workers → Redis pub/sub → FastAPI → dashboard, then WebSocket (dimmed) vs SSE rows. Slide 43. |
| `judge-service` | 1728×720 | Worker ⇄ Judge container (model baked in, stateless, host-only port) and the struck-out things it doesn't need. Slide 44. |
| `local-stack` | 1728×720 | Containers inside "Catch22's own machine" + three reason cards. Slide 45. |
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 31. |

Layout components (flow, not fixed canvas):

| Component | Params | What |
|-----------|--------|------|
| `title-cover` | `title`, `image`, `presented`, `lead?`, `client?`, `alt?`, `course?`, `team?` | Cover: stacked title + "for <client>" left, illustration right (PNG multiplied onto the light canvas), course line bottom-left, "Presented by" + names bottom-right. Slide 01. |
| ◻ `team-roster` | — | Row of `team-group`s, vertically centred. Slide 02. |
| ◻ `team-group` | `label`, `size?` | Labelled cluster; `size` = member count so every card gets equal width. |
| `team-member` | `initial`, `role`, `name` | Card: initial in a ring, role + name at bottom. `class="is-light"` for pale. |
