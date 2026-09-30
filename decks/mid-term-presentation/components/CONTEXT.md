# components/ (deck-local) — context

Bespoke diagrams, absolutely positioned on fixed canvases. Edit coordinates in the HTML (`left/top/width/height`) and the matching SVG `path d=` values together.

| Component | Canvas | What |
|-----------|--------|------|
| `c22-flow` | 1728×760 | Clients (-4% limit) → C22 platform (Markov judge / rules) → FADE / PASS, plus "why fading pays off" note. Slide 04. |
| `arch-diagram` | 1728×800 | 4 layer lanes, nodes, accent-coloured data-flow wires. Slide 14. |
| `project-timeline` | fills slide | Deliverables track, phases, go/no-go gates. Positions by day offset `--d` (days since 1 Jun, span 183). `is-now` marks today; `is-done` / `is-next` on phases. Slide 26. |
