# slides/ — context

100 slides, outline + owners in `../CONTEXT.md`. Each slide starts with `<!-- notes: owner. talking points -->`.
Unfinished content is marked with `<!-- @placeholder label="…" owner="…" -->` (renders as an amber "To do" box) or `TODO:` text. Replace them in place and rebuild.
Section dividers (04, 16, 20, 22, 41, 57, 69, 79) carry the presenter chip; keep them in sync with the agenda (03).

Section 05 (41–56): NFR overviews at 42, 47, 53, 55; builds for async processing (43–46) and race conditions (48–52); Why Redis (54); Docker (56). Each build slide holds the full diagram so far; only the newly added piece has `class="reveal"`. Edit the same coordinates on every later step (match-and-move relies on identical markup).

Slides 24–28 are the architecture: 24–27 show the components with only the traders → FastAPI and Dashboard → C22 arrows, one numbered pillar in focus per slide (1 Input/Output, 2 Data & Messaging, 3 Pipeline, 4 Services); 28 adds every connection. Slides 29–40 are the open (29–34) and close (35–40) trade flow walkthroughs. Each uses the `arch-flow` component with `flow` and `step` params: the same canvas on every slide, nodes and arrows appear at the step they first matter, the current step's arrows are fully opaque and earlier ones sit at 50%. Edit node/arrow timing in `components/arch-flow/arch-flow.css`, not per slide.

Slide 80 is the latency and throughput evidence slide (two charts + key points); slides 81–83 continue it: latency budget vs measured, the architecture annotated with ms per hop, and the slow 10%. Slides 84–87 are the four workflow slides (campaign start, open trade, close trade, campaign end). All sit at the start of the appendix, right after the Appendix divider (79).
