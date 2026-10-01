# slides/ — context

78 slides, outline + owners in `../CONTEXT.md`. Each slide starts with `<!-- notes: owner. talking points -->`.
Unfinished content is marked with `<!-- @placeholder label="…" owner="…" -->` (renders as an amber "To do" box) or `TODO:` text. Replace them in place and rebuild.
Section dividers (04, 08, 13, 18, 29, 44, 58, 68) carry the presenter chip; keep them in sync with the agenda (03).

Slides 25–39 are three step-by-step builds (sync 25–28, async processing 31–34, race conditions 35–39); 40–43 are the Redis, cache-check, SSE and Docker design-decision slides. Each slide holds the full diagram so far; only the newly added piece has `class="reveal"`. Edit the same coordinates on every later step.
