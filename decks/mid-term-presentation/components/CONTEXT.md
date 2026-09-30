# components/ (deck-local) — context

Bespoke diagrams, absolutely positioned on fixed canvases. Edit coordinates in the HTML (`left/top/width/height`) and the matching SVG `path d=` values together.

| Component | Canvas | What |
|-----------|--------|------|
| `c22-flow` | 1728×760 | Clients (-4% limit) → C22 platform (Markov judge / rules) → FADE / PASS, plus "why fading pays off" note. Slide 05. |
| `arch-diagram` | 1728×800 | 4 layer lanes, nodes, accent-coloured data-flow wires. Slide 15. |
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 27. |

Layout components (flow, not fixed canvas):

| Component | Params | What |
|-----------|--------|------|
| `title-cover` | `title`, `image`, `presented`, `lead?`, `client?`, `alt?`, `course?`, `team?` | Cover: stacked title + "for <client>" left, illustration right (PNG multiplied onto the light canvas), course line bottom-left, "Presented by" + names bottom-right. Slide 01. |
| ◻ `team-roster` | — | Row of `team-group`s, vertically centred. Slide 02. |
| ◻ `team-group` | `label`, `size?` | Labelled cluster; `size` = member count so every card gets equal width. |
| `team-member` | `initial`, `role`, `name` | Card: initial in a ring, role + name at bottom. `class="is-light"` for pale. |
