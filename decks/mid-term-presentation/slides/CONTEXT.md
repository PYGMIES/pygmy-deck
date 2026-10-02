# slides/ — context

72 slides, outline + owners in `../CONTEXT.md`. Each slide starts with `<!-- notes: owner. talking points -->`.
Unfinished content is marked with `<!-- @placeholder label="…" owner="…" -->` (renders as an amber "To do" box) or `TODO:` text. Replace them in place and rebuild.
Section dividers (04, 08, 13, 17, 28, 43, 52, 62) carry the presenter chip; keep them in sync with the agenda (03).

Slides 24–38 are three step-by-step builds (sync 24–27, async processing 30–33, race conditions 34–38); 39–42 are the Redis, cache-check, SSE and Docker design-decision slides. Each slide holds the full diagram so far; only the newly added piece has `class="reveal"`. Edit the same coordinates on every later step.
