# slides/ — context

96 slides, outline + owners in `../CONTEXT.md`. Each slide starts with `<!-- notes: owner. talking points -->`.
Unfinished content is marked with `<!-- @placeholder label="…" owner="…" -->` (renders as an amber "To do" box) or `TODO:` text. Replace them in place and rebuild.
Section dividers (04, 11, 16, 20, 39, 55, 67, 76) carry the presenter chip; keep them in sync with the agenda (03).

Section 05 (39–54): NFR overviews at 40, 45, 51, 53; builds for async processing (41–44) and race conditions (46–50); Why Redis (52); Docker (54). Each build slide holds the full diagram so far; only the newly added piece has `class="reveal"`. Edit the same coordinates on every later step (match-and-move relies on identical markup).

Slides 22–26 are the architecture: 22–25 show the components with only the traders → FastAPI and Dashboard → C22 arrows, one numbered pillar in focus per slide (1 Input/Output, 2 Data & Messaging, 3 Pipeline, 4 Services); 26 adds every connection. Slides 27–38 are the open (27–32) and close (33–38) trade flow walkthroughs. Each uses the `arch-flow` component with `flow` and `step` params: the same canvas on every slide, nodes and arrows appear at the step they first matter, the current step's arrows are fully opaque and earlier ones sit at 50%. Edit node/arrow timing in `components/arch-flow/arch-flow.css`, not per slide.

Slide 79 is the latency and throughput evidence slide (two charts + key points); slides 80–82 continue it: latency budget vs measured, the architecture annotated with ms per hop, and the slow 10%. Slides 83–86 are the four workflow slides (campaign start, open trade, close trade, campaign end). All sit at the start of the appendix, right after the Appendix divider (78).
